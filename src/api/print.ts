import { create } from '../helpers/dom'

// Prints a new line in the terminal
const print = (content: string, isCommand: boolean, commandContainer: HTMLElement, input: HTMLElement, prompt: string) => {
  const line = create('p')
  if (isCommand) {
    const cmd = create('span')
    cmd.innerHTML = content
    cmd.className = 'termainal-command'
    line.innerHTML = prompt
    commandContainer.appendChild(line)
    line.appendChild(cmd)
  } else {
    line.innerHTML = content
    commandContainer.appendChild(line)
  }
  input.scrollIntoView()
}

export default print
