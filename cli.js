#!/usr/bin/env bun
/**
 * OpenUsage CLI - Simple wrapper for OpenUsage HTTP API
 *
 * Usage:
 *   bun run cli                 - List all providers
 *   bun run cli list            - List all providers
 *   bun run cli get <provider>  - Get specific provider
 *   bun run cli status          - Check if API is running
 */

const API_BASE = 'http://127.0.0.1:6736'

async function request(path) {
  try {
    const response = await fetch(`${API_BASE}${path}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error.message.includes('ECONNREFUSED')) {
      console.error('❌ OpenUsage app is not running')
      console.error('   Start the app first: bun run tauri dev')
      process.exit(1)
    }
    throw error
  }
}

function formatUsage(data) {
  if (!data || data.length === 0) {
    console.log('📊 No usage data available')
    return
  }

  // Array of providers
  if (Array.isArray(data)) {
    console.log('\n📊 OpenUsage - All Providers\n')
    data.forEach(provider => {
      console.log(`📦 ${provider.displayName || provider.providerId}`)
      console.log(`   Plan: ${provider.plan || 'N/A'}`)

      if (provider.lines) {
        provider.lines.forEach(line => {
          if (line.type === 'progress') {
            const percent = ((line.used / line.limit) * 100).toFixed(1)
            const bar = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5))
            console.log(`   ${line.label}: [${bar}] ${percent}% (${line.used}/${line.limit})`)

            // Show reset time if available
            if (line.resetsAt) {
              const resetsAt = new Date(line.resetsAt)
              const timeLeft = Math.max(0, resetsAt - new Date())
              const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
              const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

              if (hoursLeft > 0) {
                console.log(`   └─ Resets in: ${hoursLeft}h ${minutesLeft}m (${resetsAt.toLocaleString()})`)
              } else if (minutesLeft > 0) {
                console.log(`   └─ Resets in: ${minutesLeft}m (${resetsAt.toLocaleString()})`)
              } else {
                console.log(`   └─ Resets: ${resetsAt.toLocaleString()}`)
              }
            }
          } else if (line.type === 'text') {
            console.log(`   ${line.label}: ${line.value}`)
          } else if (line.type === 'badge') {
            console.log(`   ${line.label}: ${line.value}`)
          }
        })
      }

      console.log(`   Updated: ${new Date(provider.fetchedAt).toLocaleString()}`)
      console.log()
    })
    return
  }

  // Single provider
  console.log(`\n📦 ${data.displayName || data.providerId}`)
  console.log(`   Provider ID: ${data.providerId}`)
  console.log(`   Plan: ${data.plan || 'N/A'}`)

  if (data.lines) {
    console.log('\n   Usage:')
    data.lines.forEach(line => {
      if (line.type === 'progress') {
        const percent = ((line.used / line.limit) * 100).toFixed(1)
        const bar = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5))
        console.log(`   ${line.label}: [${bar}] ${percent}% (${line.used}/${line.limit})`)
        if (line.resetsAt) {
          const resetsAt = new Date(line.resetsAt)
          const timeLeft = Math.max(0, resetsAt - new Date())
          const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
          console.log(`   └─ Resets in: ${hoursLeft}h (${resetsAt.toLocaleString()})`)
        }
      } else if (line.type === 'text') {
        console.log(`   ${line.label}: ${line.value}`)
        if (line.subtitle) {
          console.log(`   └─ ${line.subtitle}`)
        }
      } else if (line.type === 'badge') {
        console.log(`   ${line.label}: ${line.value}`)
      }
    })
  }

  console.log(`\n   Last updated: ${new Date(data.fetchedAt).toLocaleString()}`)
}

async function listProviders() {
  const data = await request('/v1/usage')
  formatUsage(data)
}

async function getProvider(providerId) {
  const data = await request(`/v1/usage/${providerId}`)

  if (data === null) {
    console.log(`\n❌ Provider '${providerId}' not found`)
    console.log('   Available providers:')
    const allData = await request('/v1/usage')
    if (allData && allData.length > 0) {
      allData.forEach(p => console.log(`   - ${p.providerId}`))
    }
    return
  }

  if (data === undefined) {
    console.log(`\n⚠️  Provider '${providerId}' has no cached data yet`)
    return
  }

  formatUsage(data)
}

async function checkStatus() {
  try {
    const response = await fetch(`${API_BASE}/v1/usage`)
    if (response.ok) {
      console.log('✅ OpenUsage API is running')
      console.log(`   URL: ${API_BASE}`)
      const data = await response.json()
      if (Array.isArray(data)) {
        console.log(`   Providers: ${data.length} cached`)
      }
    } else {
      console.log('❌ OpenUsage API returned an error')
    }
  } catch (error) {
    if (error.message.includes('ECONNREFUSED')) {
      console.log('❌ OpenUsage app is not running')
      console.log('   Start the app first: bun run tauri dev')
    } else {
      console.log('❌ Error:', error.message)
    }
  }
}

async function showHelp() {
  console.log(`
OpenUsage CLI - HTTP API Wrapper

Usage:
  bun run cli                  List all providers
  bun run cli list             List all providers
  bun run cli get <provider>   Get specific provider usage
  bun run cli status           Check if API is running
  bun run cli help             Show this help

Examples:
  bun run cli                    # List all
  bun run cli get claude        # Get Claude usage
  bun run cli get codex         # Get Codex usage
  bun run cli status            # Check API status

Available providers:
  amp, antigravity, claude, codex, copilot, cursor, factory,
  gemini, jetbrains-ai-assistant, kimi, minimax, opencode-go,
  perplexity, windsurf, zai
  `)
}

// Main CLI logic
const command = process.argv[2] || 'list'
const args = process.argv.slice(3)

switch (command) {
  case 'list':
  case 'ls':
    await listProviders()
    break
  case 'get':
    if (!args[0]) {
      console.error('❌ Error: Provider ID required')
      console.error('   Usage: bun run cli get <provider>')
      process.exit(1)
    }
    await getProvider(args[0])
    break
  case 'status':
    await checkStatus()
    break
  case 'help':
  case '-h':
  case '--help':
    await showHelp()
    break
  default:
    console.log(`Unknown command: ${command}`)
    await showHelp()
    process.exit(1)
}
