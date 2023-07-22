import { TerminalInstance } from '../types'
import { startProcess, stopProcess } from './process'
import { create } from '../helpers/dom'

const typeText = (text: string, speed: number, terminal: TerminalInstance, isCommand?: boolean) => new Promise<boolean>(resolve => {
  startProcess(terminal)
  const line = create('p', undefined, isCommand ? terminal.settings.prompt : '')
  const cmd = create('span', 'terminal-command', '')
  if (isCommand) {
    line.append(cmd)
  }
  terminal.commandContainer.append(line)
  let i = 0
  const typeTarget = isCommand ? cmd : line
  const type = () => {
    if (i < text.length && terminal.isProcessRunning) {
      typeTarget.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else {
      stopProcess(terminal)
      resolve(i === text.length)
    }
  }
  setTimeout(type, speed)
})

export default typeText
