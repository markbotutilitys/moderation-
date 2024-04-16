import { REST, Routes } from 'discord.js'
require('dotenv').config()
import fs  from 'node:fs'
import path from 'node:path'
const { token, clientId }: any = process.env
const chalk = require('chalk')

const commands: any[] = []
const SlashCommandsPath = path.join(__dirname, 'SlashCommands')
const SlashCommandsFolder = fs.readdirSync(SlashCommandsPath)

for (const folder of SlashCommandsFolder) {
  const commandFiles = fs.readdirSync(`${SlashCommandsPath}/${folder}`).filter(file => file.endsWith('.ts'))
  for (const file of commandFiles) {
    const filePath = path.join(SlashCommandsPath, folder, file)
    const command = require(filePath)
        
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON())
    } else {
      if (!('data' in command)) console.log(chalk.redBright(`[ERROR] ${file} does not have a data property`))
        if (!('execute' in command)) console.log(chalk.redBright(`[ERROR] ${file} does not have a execute property`))
          console.log(chalk.redBright(`[ERROR] ${file} does not have a data or execute property`))
    }
  }
}
const rest = new REST().setToken(token)

try {
  console.log(chalk.blue(`Started refreshing ${commands.length} application (/) commands.`))

  const data: any = rest.put(
    Routes.applicationCommands(clientId),
    { body: commands }
  )

  console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands.`))
} catch (error) {
  console.error(error)
}