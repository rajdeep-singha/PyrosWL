# Pyros

Global npm wrapper for the Pyros robotics CLI - the autonomous robotics engineer.

```bash
npm install -g pyros
pyros --help
pyros run "fix my workspace and ship a clean PR"
```

The wrapper installs the Python package `pyros-robotics` from PyPI into a private virtual environment at `~/.pyros/npm-venv`, so it never touches your system Python.

## CLIs

Two CLIs are exposed:

| Command | Use |
| --- | --- |
| `pyros` | The full CLI - `pyros run`, `pyros validate-urdf`, `pyros fix-urdf`, `pyros ci`, etc. |
| `pyros-mcp` | The MCP server, for use with Claude Desktop, Cursor, Windsurf, and Claude Code. |

## MCP Integration

Add to your client's MCP config:

```json
{
  "mcpServers": {
    "pyros": { "command": "pyros-mcp" }
  }
}
```

Then ask:

```text
Fix the URDFs in ~/work/robot_ws and ship a clean build.
```

Pyros runs the validate -> fix -> build loop autonomously and returns a structured report.

## Requirements

- Node.js 16 or newer
- Python 3.10 or newer with venv support
- pip

The post-install step creates a venv and installs roughly 100-250 MB of Python dependencies, including `numpy`, `lxml`, `mcp`, and `anthropic`. Expect 30-90 seconds on first install, then milliseconds on subsequent invocations.

## Configuration

| Environment variable | Effect |
| --- | --- |
| `PYROS_PYTHON` | Use this interpreter instead of auto-detecting one. Example: `PYROS_PYTHON=/usr/local/bin/python3.12 npm install -g pyros`. |

## Uninstalling

```bash
pyros-uninstall
npm uninstall -g pyros
```

`pyros-uninstall` wipes the private venv, which is roughly 200 MB. `npm uninstall` cannot run cleanup hooks in npm 7+ because they were disabled for security, so the two-step uninstall is the only reliable way to remove the venv.

If you forget step 1, you can always run:

```bash
rm -rf ~/.pyros
```

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Pyros venv missing - running installer ...` on every run | Your npm config has `ignore-scripts=true`. | Either remove the config or let the lazy installer run on first invocation. |
| Failed to install `pyros-robotics` from PyPI | Network or PyPI outage. | Retry. Re-running `pyros --help` triggers the installer. |
| Brand mismatch: `pyros --version` does not match the npm version | You are on an older wrapper that pinned the pip version. | Upgrade with `npm install -g pyros@latest`. |
| Want to use a system Python install of `pyros-robotics` | The wrapper defaults to the private venv. | Set `PYROS_PYTHON` to that interpreter. |
