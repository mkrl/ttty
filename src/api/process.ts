import { TerminalInstance } from '../types'
import { dispatchEvent, TerminalEvent } from '../helpers/events'
import { toggleInput } from '../helpers/dom'

export const startProcess = (terminal: TerminalInstance) => {
  const { settings: { host } } = terminal
  toggleInput(terminal)
  terminal.isProcessRunning = true
  dispatchEvent(TerminalEvent.ON_PROCESS_START, host)
}

export const stopProcess = (terminal: TerminalInstance) => {
  const { input, settings: { host } } = terminal
  toggleInput(terminal, true)
  terminal.isProcessRunning = false
  input.focus()
  dispatchEvent(TerminalEvent.ON_PROCESS_END, host)
}
