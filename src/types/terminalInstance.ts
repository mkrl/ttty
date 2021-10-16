export type TerminalInstance = {
  print: (text: string, isCommand?: boolean) => void
  run: (cmd: string) => void
  start: () => void
  stop: () => void
  type: (text: string, speed?: number, callback?: () => void) => void
  isProcessRunning: boolean
}
