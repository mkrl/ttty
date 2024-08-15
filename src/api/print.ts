import { create } from '../helpers/dom'
import { TerminalSettings } from '../types'

// Prints a new line in the terminal
const print = (
  content: string,
  isCommand: boolean,
  scrollIntoView: boolean,
  commandContainer: HTMLElement,
  input: HTMLElement,
  settings: TerminalSettings
) => {
  const line = create('p', undefined, isCommand ? settings.prompt : content)
  if (isCommand) {
    const cmd = create('span', 'terminal-command', content)
    line.append(cmd)
  }
  commandContainer.append(line)
  if (scrollIntoView) {
    input.scrollIntoView()
  }
}

export default print
