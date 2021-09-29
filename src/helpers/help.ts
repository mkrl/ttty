import { Terminal, TerminalCommand } from '../types'

const createHelp = (terminal: Terminal): TerminalCommand => ({
  name: 'help',
  description: 'shows a full list of all available commands',
  func: ({ print }) => {
    for (const cmd in terminal.settings.commands) {
      if (Object.hasOwnProperty.call(terminal.settings.commands, cmd)) {
        print(terminal.settings.commands[cmd].name + ' - ' + terminal.settings.commands[cmd].description)
      }
    }
  }
})

export default createHelp
