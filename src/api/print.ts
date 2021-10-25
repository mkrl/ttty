import { create } from '../helpers/dom'

// Prints a new line in the terminal
const print = (content: string, isCommand: boolean, commandContainer: HTMLElement, input: HTMLElement, prompt: string) => {
  const line = create('p', undefined, isCommand ? prompt : content)
  if (isCommand) {
    const cmd = create('span', 'terminal-command', content)
    line.append(cmd)
  }
  commandContainer.append(line)
  input.scrollIntoView()
}

export default print
