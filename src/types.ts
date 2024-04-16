import { Client } from 'discord.js'

export interface BotClient extends Client {
  commands?: any
}