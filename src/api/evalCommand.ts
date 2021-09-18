import { Terminal } from '../types'
import { dispatchEvent, TerminalEvent } from '../helpers/events'

const evalCommand = (cmd: string, instance: Terminal) => {
  const splitCommand = cmd.split(' ')
  const command = splitCommand[0]
  if (instance.settings.commands[command]) {
    instance.settings.commands[command].func(instance)
    dispatchEvent(TerminalEvent.ON_COMMAND, instance.settings.host)
  } else {
    instance.print(`<span class="terminal-error">command not found: ${command}</span>`)
    dispatchEvent(TerminalEvent.ON_COMMAND_NOT_FOUND, instance.settings.host)
  }
}

export default evalCommand
