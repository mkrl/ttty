import { TerminalInstance } from '../types'
import { dispatchEvent, TerminalEvent } from '../helpers/events'

const evalCommand = (cmd: string, instance: TerminalInstance) => {
  const { print } = instance
  const [command, ...args] = cmd.split(' ')
  const argMatches = args.join(' ').match(/('[^']+'|"[^"]+"|[^\s'"]+)/g)
  const commandArguments = argMatches === null
    ? []
    : argMatches
      .map(element => element.replace(/(^['"]|['"]$)/g, ''))
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
      dispatchEvent(TerminalEvent.ON_COMMAND, instance.settings.host, cmd)
    }
  } else {
    print(`<span class="terminal-error">command not found: ${command}</span>`)
    dispatchEvent(TerminalEvent.ON_COMMAND_NOT_FOUND, instance.settings.host, cmd)
  }
}

export default evalCommand
