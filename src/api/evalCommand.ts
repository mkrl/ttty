import { Terminal } from '../types'
import { dispatchEvent, TerminalEvent } from '../helpers/events'

const evalCommand = (cmd: string, instance: Terminal) => {
  const { print } = instance
  print(cmd, true)
  const splitCommand = cmd.split(' ')
  const command = splitCommand[0]
  const commandArguments = splitCommand.slice(1)

  const commandInstance = instance.settings.commands[command]

  if (commandInstance) {
    if (commandInstance.argDescriptions &&
      commandInstance.argDescriptions.length > 0 &&
      commandArguments.length === 0
    ) {
      print(`Usage: ${command} ${commandInstance
        .argDescriptions.map(arg => `[${arg}]`).join(' ')}`)
    } else {
      commandInstance.func(instance, ...commandArguments)
      dispatchEvent(TerminalEvent.ON_COMMAND, instance.settings.host)
    }
  } else {
    print(`<span class="terminal-error">command not found: ${command}</span>`)
    dispatchEvent(TerminalEvent.ON_COMMAND_NOT_FOUND, instance.settings.host)
  }
}

export default evalCommand
