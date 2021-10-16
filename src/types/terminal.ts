import { TerminalSettings } from './terminalSettings'
import { TerminalInstance } from './terminalInstance'

export type Terminal = {
  settings: TerminalSettings
  commandContainer: HTMLElement
  inputContainer: HTMLElement
  input: HTMLInputElement
  history: string[]
  lastHistoryIndex: number
} & TerminalInstance
