export type TerminalInstance = {
  print: (text: string, isCommand?: boolean) => void
  run: (cmd: string) => void
  start: () => void
  stop: () => void
  type: (text: string, speed?: number, callback?: () => void) => void
  isProcessRunning: boolean
}
export type TerminalCommand = {
  name: string
  description: string
  argDescriptions?: string[]
  func: (terminal: TerminalInstance, ...args: string[]) => void
}

export type TerminalSettings = {
  host: HTMLElement,
  commands: Record<string, TerminalCommand>
  welcomeMessage?: string,
  prompt?: string
  historyLength?: number
  enableHelp?: boolean
}

export type Terminal = {
  settings: TerminalSettings
  commandContainer: HTMLElement
  inputContainer: HTMLElement
  input: HTMLInputElement
  history: string[]
  lastHistoryIndex: number
} & TerminalInstance
