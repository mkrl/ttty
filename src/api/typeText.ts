import { TerminalInstance } from '../types'
import { startProcess, stopProcess } from './process'
import { create } from '../helpers/dom'

const typeText = (text: string, speed: number, terminal: TerminalInstance, callback?: () => void) => {
  startProcess(terminal)
  const line = create('p')
  terminal.commandContainer.append(line)
  let i = 0
  const type = () => {
    if (i < text.length && terminal.isProcessRunning) {
      line.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else {
      callback && callback()
      stopProcess(terminal)
    }
  }
  setTimeout(type, speed)
}

export default typeText
