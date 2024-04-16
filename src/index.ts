import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'
import { BotClient } from './types'
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
require('dotenv').config()
const { token } = process.env


const client: BotClient = new Client({ 
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.GuildScheduledEvent
],
intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.MessageContent
],
 })

client.on('ready', () => {
})

require('./deploy-commands')

client.commands = new Collection()

const eventsPath = path.join(__dirname, 'events')
const SlashCommandsPath = path.join(__dirname, 'SlashCommands')
const SlashCommandsFolder = fs.readdirSync(SlashCommandsPath)

for (const folder of SlashCommandsFolder) {
  const SlashCommandsFiles = fs.readdirSync(`${SlashCommandsPath}/${folder}`).filter(file => file.endsWith('.ts'))

  for (const file of SlashCommandsFiles) {
    const filePath = path.join(SlashCommandsPath, folder, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(chalk.yellow(`[WARNING] The commands at ${filePath} is missing a required "data" or "execute" property.`))
    }
  }
}

const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)

  if (event.once) {
    client.once(event.name, (...args:any) => event.execute(...args))
  } else {
    client.on(event.name, (...args:any) => event.execute(...args))
  }
}

client.on('error', console.error)

process.on('unhandledRejection', error => {
  console.error(chalk.red('[Unhandled Rejection]'), error)
})

client.login(token)