export type TerminalInstance = {
  print: (text: string, isCommand?: boolean) => void
  // Previously 'run' in public interface
  // eval: (cmd: string) => void
  // history: (isUp?: boolean) => string
  // start: () => void
  // stop: () => void
  // type: (text: string, speed: number, showPrompt?: boolean) => void
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
  input: HTMLInputElement
} & TerminalInstance
