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
openusage              # List all providers
openusage list         # List all providers
openusage get claude   # Get Claude usage details
openusage get cursor   # Get Cursor usage details
openusage status       # Check API connection
openusage help         # Show help
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

## Download Desktop App

[**Download OpenUsage app**](https://github.com/robinebers/openusage/releases/latest) (macOS, Apple Silicon & Intel)

## What It Does

OpenUsage lives in your menu bar and shows you how much of your AI coding subscriptions you've used. Progress bars, badges, and clear labels. No mental math required.

- **One glance.** All your AI tools, one panel.
- **Always up-to-date.** Refreshes automatically on a schedule you pick.
- **Global shortcut.** Toggle the panel from anywhere with a customizable keyboard shortcut.
- **Lightweight.** Opens instantly, stays out of your way.
- **Plugin-based.** New providers get added without updating the whole app.
- **[Local HTTP API](docs/local-http-api.md).** Other apps can read your usage data from `127.0.0.1:6736`.

## Supported Providers

- [**Amp**](docs/providers/amp.md) / free tier, bonus, credits
- [**Antigravity**](docs/providers/antigravity.md) / all models
- [**Claude**](docs/providers/claude.md) / session, weekly, extra usage, local token usage (ccusage)
- [**Codex**](docs/providers/codex.md) / session, weekly, reviews, credits
- [**Copilot**](docs/providers/copilot.md) / premium, chat, completions
- [**Cursor**](docs/providers/cursor.md) / credits, total usage, auto usage, API usage, on-demand, CLI auth
- [**Factory / Droid**](docs/providers/factory.md) / standard, premium tokens
- [**Gemini**](docs/providers/gemini.md) / pro, flash, workspace/free/paid tier
- [**JetBrains AI Assistant**](docs/providers/jetbrains-ai-assistant.md) / quota, remaining
- [**Kimi Code**](docs/providers/kimi.md) / session, weekly
- [**MiniMax**](docs/providers/minimax.md) / coding plan session
- [**OpenCode Go**](docs/providers/opencode-go.md) / 5h, weekly, monthly spend limits
- [**Windsurf**](docs/providers/windsurf.md) / prompt credits, flex credits
- [**Z.ai**](docs/providers/zai.md) / session, weekly, web searches

### Maybe Soon

- [Vercel AI Gateway](https://github.com/robinebers/openusage/issues/18)

Community contributions welcome.
Want a provider that's not listed? [Open an issue.](https://github.com/robinebers/openusage/issues/new)

## Open Source, Community Driven

OpenUsage is built by its users. Hundreds of people use it daily, and the project grows through community contributions: new providers, bug fixes, and ideas.

I maintain the project as a guide and quality gatekeeper, but this is your app as much as mine. If something is missing or broken, the best way to get it fixed is to contribute by opening an issue, or submitting a PR.

Plugins are currently bundled as we build our the API, but soon will be made flexible so you can build and load their own.

### How to Contribute

- **Add a provider.** Each one is just a plugin. See the [Plugin API](docs/plugins/api.md).
- **Fix a bug.** PRs welcome. Provide before/after screenshots.
- **Request a feature.** [Open an issue](https://github.com/robinebers/openusage/issues/new) and make your case.

Keep it simple. No feature creep, no AI-generated commit messages, test your changes.

## Built Entirely with AI

Not a single line of code in this project was read or written by hand. 100% AI-generated, AI-reviewed, AI-shipped — using [Cursor](https://cursor.com), [Claude Code](https://docs.anthropic.com/en/docs/claude-code), and [Codex CLI](https://github.com/openai/codex).

OpenUsage is a real-world example of what I teach in the [AI Builder's Blueprint](https://itsbyrob.in/EBDqgJ6) — a proven process for building and shipping software with AI, no coding background required.

## Sponsors

OpenUsage is supported by our sponsors. Become a sponsor to get your logo here and on [openusage.ai](https://openusage.ai).

[Become a Sponsor](https://github.com/sponsors/robinebers)

<!-- Add sponsor logos here -->

## Credits

Inspired by [CodexBar](https://github.com/steipete/CodexBar) by [@steipete](https://github.com/steipete). Same idea, very different approach.

## License

[MIT](LICENSE)

---

<details>
<summary><strong>Build from source</strong></summary>

> **Warning**: The `main` branch may not be stable. It is merged directly without staging, so users are advised to use tagged versions for stable builds. Tagged versions are fully tested while `main` may contain unreleased features.

### Stack

...
