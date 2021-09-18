import { create } from './dom'

// Builds a terminal DOM tree and returns a container that contains past commands & input reference
const buildTree = (node: HTMLElement, prompt: string) => {
  node.className = 'terminal'
  const commandContainer = create('div')
  const inputContainer = create('div')
  const promptContainer = create('span')
  promptContainer.innerHTML = prompt
  const input = create('input')
  commandContainer.className = 'terminal-container'
  inputContainer.className = 'terminal-type'
  input.setAttribute('type', 'text')
  inputContainer.appendChild(promptContainer)
  inputContainer.appendChild(input)
  node.appendChild(commandContainer)
  node.appendChild(inputContainer)
  node.addEventListener('click', () => input.focus())

  return { commandContainer, input: input as HTMLInputElement }
}

export default buildTree
