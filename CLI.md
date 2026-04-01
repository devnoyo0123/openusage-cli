# OpenUsage CLI Guide

Simple command-line interface for OpenUsage via HTTP API.

## Prerequisites

The OpenUsage app must be **running** for CLI to work:
```bash
bun run tauri dev    # Development mode
# Or use the production app
```

## Installation

The CLI is included in the project. No additional installation needed!

## Usage

### Check API Status
```bash
bun run cli status
```

### List All Providers
```bash
bun run cli
# or
bun run cli list
```

Output example:
```
📊 OpenUsage - All Providers

📦 Claude
   Plan: Pro
   Session: [████████████████████] 100.0% (100/100)
   Today: $21.14 · 97M tokens
   Updated: 4/1/2026, 7:58:22 PM
```

### Get Specific Provider
```bash
bun run cli get claude
bun run cli get codex
bun run cli get cursor
```

### Help
```bash
bun run cli help
```

## Available Commands

| Command | Description |
|---------|-------------|
| `bun run cli` | List all providers (default) |
| `bun run cli list` | List all providers |
| `bun run cli get <id>` | Get specific provider usage |
| `bun run cli status` | Check if API is running |
| `bun run cli help` | Show help message |

## Supported Providers

`amp`, `antigravity`, `claude`, `codex`, `copilot`, `cursor`, `factory`,
`gemini`, `jetbrains-ai-assistant`, `kimi`, `minimax`, `opencode-go`,
`perplexity`, `windsurf`, `zai`

## Error Handling

- **App not running**: CLI will show "❌ OpenUsage app is not running"
- **Provider not found**: CLI will list available providers
- **No cached data**: CLI will show "⚠️ Provider has no cached data yet"

## Advanced Usage

### Create Global Alias (Optional)

Add to your `~/.zshrc` or `~/.bashrc`:
```bash
alias openusage='cd /Users/colosseum_nohys/Documents/my/playground/openusage-cli && bun run cli'
```

Then use from anywhere:
```bash
openusage              # List all
openusage get claude   # Get Claude
openusage status       # Check status
```

### HTTP API Direct Access

You can also access the API directly:
```bash
# List all providers
curl http://127.0.0.1:6736/v1/usage

# Get specific provider
curl http://127.0.0.1:6736/v1/usage/claude
```

## Technical Details

- **API Endpoint**: `http://127.0.0.1:6736`
- **Protocol**: HTTP (localhost only)
- **Response Format**: JSON
- **CORS**: Enabled for local development

## Troubleshooting

### CLI shows "app not running"
1. Start the OpenUsage app: `bun run tauri dev`
2. Wait a few seconds for the API server to start
3. Try again: `bun run cli status`

### No data shown
- Make sure providers are configured in the app
- Click "Refresh" in the app to fetch latest data
- Check that providers are not disabled in settings

### Port 6736 already in use
The API will be silently disabled. Close other apps using this port.

## API Documentation

See [docs/local-http-api.md](docs/local-http-api.md) for full API reference.
