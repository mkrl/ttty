import { TerminalSettings } from './terminalSettings'

export type TerminalInstance = {
  settings: TerminalSettings
  commandContainer: HTMLElement
  inputContainer: HTMLElement
  input: HTMLInputElement
  history: string[]
  lastHistoryIndex: number
  print: (text: string, isCommand?: boolean, scrollIntoView?: boolean) => void
  run: (cmd: string) => void
  start: () => void
  stop: () => void
  type: (text: string, speed?: number, isCommand?: boolean) => Promise<boolean>
  setPrompt: (newPrompt: string) => void
  isProcessRunning: boolean
}
