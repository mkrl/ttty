export type TerminalCommand = {
  name: string
  description: string
  argDescriptions: string[]
  function: (...args: string[]) => void
}

export type TerminalSettings = {
  host: HTMLElement,
  welcomeMessage?: string,
  prompt?: string
  historyLength?: number
  commands: Record<string, TerminalCommand>
}

export type Terminal = {
  settings: TerminalSettings
  init: (settings: TerminalSettings) => Terminal
  print: (text: string) => void
  // Previously 'run' in public interface
  eval: (cmd: string) => void
  history: (isUp?: boolean) => string
  start: () => void
  stop: () => void
  type: (text: string, speed: number, showPrompt?: boolean) => void
}
