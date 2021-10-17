import { TerminalCommand } from './terminalCommand'

export type TerminalSettings = {
  host: HTMLElement,
  commands: Record<string, TerminalCommand>
  welcomeMessage?: string,
  prompt?: string
  historyLength?: number
  enableHelp?: boolean
}
