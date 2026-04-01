# OpenUsage CLI

> **Based on [OpenUsage](https://github.com/robinebers/openusage)** by Robin Ebers (MIT License)
> This project adds a CLI wrapper on top of the OpenUsage HTTP API.

Command-line tool to check your AI coding subscription usage directly from the terminal.

## Install

### Homebrew (Recommended)

```bash
brew tap devnoyo0123/tap
brew install openusage-cli
```

### Manual

```bash
git clone https://github.com/devnoyo0123/openusage-cli.git
cd openusage-cli
bun install
```

## Usage

> **Prerequisite:** The [OpenUsage](https://github.com/robinebers/openusage) app must be running.

```bash
openusage-cli              # List all providers
openusage-cli list         # List all providers
openusage-cli get claude   # Get Claude usage details
openusage-cli get cursor   # Get Cursor usage details
openusage-cli status       # Check API connection
openusage-cli help         # Show help
```

### Example Output

```
📊 OpenUsage - All Providers

📦 Claude
   Plan: Pro
   Session: [████████████████████] 100.0% (100/100)
   └─ Resets in: 54m (4/1/2026, 9:00:00 PM)
   Today: $21.14 · 97M tokens

📦 Cursor
   Plan: Pro
   Total usage: [░░░░░░░░░░░░░░░░░░░░] 0.0% (0/100)
   └─ Resets in: 638h 58m (4/28/2026)
```

## Supported Providers

Claude, Codex, Copilot, Cursor, Factory, Gemini, JetBrains AI, Kimi, MiniMax, OpenCode Go, Perplexity, Windsurf, Z.ai, Amp

## Requirements

- [OpenUsage desktop app](https://github.com/robinebers/openusage/releases/latest) must be running
- [Bun](https://bun.sh/) runtime

## License

[MIT](LICENSE) - Original work by [Robin Ebers](https://github.com/robinebers)
