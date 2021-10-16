import { Terminal } from './terminal'

export type TerminalCommand = {
  name: string
  description: string
  argDescriptions?: string[]
  func: (terminal: Terminal, ...args: string[]) => void
}
