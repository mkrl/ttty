import { Terminal } from '../types'

const evalCommand = (cmd: string, instance: Terminal) => {
  const splitCommand = cmd.split(' ')
  const command = splitCommand[0]
  if (instance.settings.commands[command]) {
    instance.settings.commands[command].func(instance)
  } else {
    instance.print(`<span class="terminal-error">command not found: ${command}</span>`)
  }
}

export default evalCommand
