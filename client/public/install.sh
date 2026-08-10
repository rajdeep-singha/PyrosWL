#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# Pyros installer — macOS & Linux
#
#   curl -fsSL https://getpyros.com/install.sh | bash
#
# Installs pyros from PyPI into its own isolated Python venv (never touches your
# system/global packages) and puts a `pyros` launcher on your PATH. Re-running
# upgrades in place. No Node, no global pip pollution.
#
# Env overrides:
#   PYROS_HOME     install root        (default: ~/.pyros)
#   PYROS_PACKAGE  pip spec to install (default: pyros-robotics[all])
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

PYROS_HOME="${PYROS_HOME:-$HOME/.pyros}"
PYROS_PACKAGE="${PYROS_PACKAGE:-pyros-robotics[all]}"
VENV_DIR="$PYROS_HOME/.venv"
BIN_DIR="$PYROS_HOME/bin"

RED='\033[0;31m'; GREEN='\033[0;32m'; GOLD='\033[0;33m'; CYAN='\033[0;36m'
BOLD='\033[1m'; DIM='\033[2m'; RESET='\033[0m'
info()    { echo -e "${CYAN}  $*${RESET}"; }
success() { echo -e "${GREEN}  ✓ $*${RESET}"; }
warn()    { echo -e "${GOLD}  ! $*${RESET}"; }
error()   { echo -e "${RED}  ✗ $*${RESET}" >&2; }
dim()     { echo -e "${DIM}  $*${RESET}"; }

echo -e "\n${BOLD}${GOLD}  pyros${RESET} — AI robotics engineering CLI\n"

# ── Platform ──────────────────────────────────────────────────────────────────
case "$(uname -s)" in
    Linux*)  PLATFORM="linux" ;;
    Darwin*) PLATFORM="macos" ;;
    MINGW*|MSYS*|CYGWIN*)
        error "Windows detected — use PowerShell instead:"
        dim "irm https://getpyros.com/install.ps1 | iex"; exit 1 ;;
    *) error "Unsupported OS: $(uname -s)"; exit 1 ;;
esac
info "Platform: $PLATFORM ($(uname -m))"

# ── Find Python 3.10+ (prefer 3.12/3.11/3.10 over bleeding-edge) ──────────────
PYTHON=""
for c in python3.12 python3.11 python3.10 python3.13 python3; do
    if command -v "$c" >/dev/null 2>&1 && \
       "$c" -c 'import sys;exit(0 if sys.version_info[:2]>=(3,10) else 1)' 2>/dev/null; then
        PYTHON="$c"; break
    fi
done
if [ -z "$PYTHON" ]; then
    error "Python 3.10+ not found."
    [ "$PLATFORM" = macos ] && dim "Install: brew install python@3.12" \
                            || dim "Install: sudo apt install python3 python3-venv"
    exit 1
fi
if ! "$PYTHON" -c 'import venv' >/dev/null 2>&1; then
    error "Python venv module missing."
    dim "Install: sudo apt install python3-venv  (Debian/Ubuntu)"; exit 1
fi
success "$("$PYTHON" --version 2>&1) ($PYTHON)"

# ── Isolated venv (preserved across upgrades) ─────────────────────────────────
mkdir -p "$PYROS_HOME"
[ -d "$VENV_DIR" ] || { info "Creating virtual environment…"; "$PYTHON" -m venv "$VENV_DIR"; }
"$VENV_DIR/bin/pip" install --upgrade pip >/dev/null 2>&1 || true

# ── Install / upgrade pyros from PyPI ─────────────────────────────────────────
info "Installing $PYROS_PACKAGE …"
if ! "$VENV_DIR/bin/pip" install --upgrade "$PYROS_PACKAGE" >/tmp/pyros-install.log 2>&1; then
    warn "Full install failed (this Python may lack some binary wheels)."
    info "Retrying core-only…"
    if ! "$VENV_DIR/bin/pip" install --upgrade "pyros-robotics" >>/tmp/pyros-install.log 2>&1; then
        error "Install failed — see /tmp/pyros-install.log"
        dim "Python 3.14 is very new; try 3.12: brew install python@3.12"
        exit 1
    fi
    warn "Installed core only (optional extras like mujoco skipped)."
fi
success "pyros installed"

# ── Launcher on PATH ──────────────────────────────────────────────────────────
mkdir -p "$BIN_DIR"
cat > "$BIN_DIR/pyros" <<LAUNCHER
#!/usr/bin/env bash
exec "$VENV_DIR/bin/pyros" "\$@"
LAUNCHER
chmod +x "$BIN_DIR/pyros"

NEED_RESTART=false
add_to_path() {
    local rc="$1"
    [ -f "$rc" ] && grep -qF "$BIN_DIR" "$rc" && return 0
    { echo ""; echo "# pyros"; echo "export PATH=\"$BIN_DIR:\$PATH\""; } >> "$rc"
    NEED_RESTART=true
}
case "${SHELL:-/bin/bash}" in
    */zsh)  add_to_path "$HOME/.zshrc" ;;
    */bash) [ -f "$HOME/.bash_profile" ] && add_to_path "$HOME/.bash_profile" || add_to_path "$HOME/.bashrc" ;;
    */fish) FC="$HOME/.config/fish/config.fish"; mkdir -p "$(dirname "$FC")"
            grep -qF "$BIN_DIR" "$FC" 2>/dev/null || { echo "set -gx PATH $BIN_DIR \$PATH" >> "$FC"; NEED_RESTART=true; } ;;
    *) add_to_path "$HOME/.profile" ;;
esac
success "Launcher: $BIN_DIR/pyros"

echo ""
success "Done — pyros $("$BIN_DIR/pyros" --version 2>/dev/null | tail -1 || echo installed)"
[ "$NEED_RESTART" = true ] && echo -e "\n  ${BOLD}Restart your terminal${RESET} (or 'source' your shell rc), then:"
echo -e "\n    ${BOLD}pyros login${RESET}     sign in\n    ${BOLD}pyros --help${RESET}    see everything\n"
