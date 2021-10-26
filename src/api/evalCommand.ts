import { TerminalInstance } from '../types'
import { dispatchEvent, TerminalEvent } from '../helpers/events'

const evalCommand = (cmd: string, instance: TerminalInstance) => {
  const { print } = instance
  const splitCommand = cmd.split(' ')
  const command = splitCommand[0]
  const commandArguments = splitCommand.slice(1)

  if (commandArguments.length > 0 && commandArguments[0].includes('"')) {
    let longArg:string = ''
    let endIndex:number = 0

    commandArguments.every((element, index) => {
      if (index > 0 && element.includes('"')) {
        endIndex = index
        return false
      }
      return true
    })

    longArg = commandArguments.slice(0, endIndex + 1).join(' ')
    longArg = longArg.replaceAll('"', '')
    commandArguments.splice(0, endIndex + 1, longArg)
  }

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
