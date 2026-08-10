# ──────────────────────────────────────────────────────────────────────────────
# Pyros installer (Windows)
#   irm https://getpyros.com/install.ps1 | iex
#
# Installs pyros from PyPI into its own isolated Python venv and puts a `pyros`
# launcher on your PATH. Re-running upgrades in place. No Node.
#
# Env overrides: PYROS_HOME, PYROS_PACKAGE (default: pyros-robotics[all])
# ──────────────────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Stop"

$PYROS_HOME    = if ($env:PYROS_HOME)    { $env:PYROS_HOME }    else { "$env:USERPROFILE\.pyros" }
$PYROS_PACKAGE = if ($env:PYROS_PACKAGE) { $env:PYROS_PACKAGE } else { "pyros-robotics[all]" }
$VENV_DIR = "$PYROS_HOME\.venv"
$BIN_DIR  = "$PYROS_HOME\bin"

function Write-Info($m)    { Write-Host "  $m" -ForegroundColor Cyan }
function Write-Success($m) { Write-Host "  + $m" -ForegroundColor Green }
function Write-Warn($m)    { Write-Host "  ! $m" -ForegroundColor Yellow }
function Write-Err($m)     { Write-Host "  x $m" -ForegroundColor Red }

Write-Host ""
Write-Host "  pyros" -ForegroundColor Yellow -NoNewline
Write-Host " - AI robotics engineering CLI" -ForegroundColor DarkGray
Write-Host ""

# ── Find Python 3.10+ ─────────────────────────────────────────────────────────
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) { $python = Get-Command python3 -ErrorAction SilentlyContinue }
if (-not $python) {
    Write-Err "Python not found. Install 3.10+ from https://python.org (check 'Add to PATH')."
    exit 1
}
$pyVersion = & $python.Source -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"
$major, $minor = $pyVersion -split '\.'
if ([int]$major -lt 3 -or ([int]$major -eq 3 -and [int]$minor -lt 10)) {
    Write-Err "Python 3.10+ required, found $pyVersion"; exit 1
}
Write-Success "Python $pyVersion"

# ── Isolated venv (preserved across upgrades) ─────────────────────────────────
New-Item -ItemType Directory -Path $PYROS_HOME -Force | Out-Null
if (-not (Test-Path $VENV_DIR)) {
    Write-Info "Creating virtual environment..."
    & $python.Source -m venv $VENV_DIR
}
$pip = "$VENV_DIR\Scripts\pip.exe"
& $pip install --upgrade pip 2>&1 | Out-Null

# ── Install / upgrade from PyPI ───────────────────────────────────────────────
Write-Info "Installing $PYROS_PACKAGE ..."
$ErrorActionPreference = "Continue"
& $pip install --upgrade "$PYROS_PACKAGE" 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Warn "Full install failed, retrying core-only..."
    & $pip install --upgrade "pyros-robotics" 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Install failed. Try Python 3.12 from https://python.org."
        exit 1
    }
    Write-Warn "Installed core only (optional extras skipped)."
}
$ErrorActionPreference = "Stop"
Write-Success "pyros installed"

# ── Launcher + PATH ───────────────────────────────────────────────────────────
New-Item -ItemType Directory -Path $BIN_DIR -Force | Out-Null
Set-Content -Path "$BIN_DIR\pyros.cmd" -Value "@echo off`r`n`"$VENV_DIR\Scripts\pyros.exe`" %*"

$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($userPath -notlike "*$BIN_DIR*") {
    [Environment]::SetEnvironmentVariable("PATH", "$BIN_DIR;$userPath", "User")
    $env:PATH = "$BIN_DIR;$env:PATH"
    Write-Success "Added to PATH (restart your terminal)"
} else {
    Write-Success "Already in PATH"
}

Write-Host ""
Write-Host "  Done." -ForegroundColor Green
Write-Host ""
Write-Host "  Get started:" -ForegroundColor White
Write-Host "    pyros login" -ForegroundColor White -NoNewline; Write-Host "     sign in" -ForegroundColor DarkGray
Write-Host "    pyros --help" -ForegroundColor DarkGray -NoNewline; Write-Host "    see all commands" -ForegroundColor DarkGray
Write-Host ""
