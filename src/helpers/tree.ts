import { create } from './dom'

// Builds a terminal DOM tree and returns a container that contains past commands & input reference
const buildTree = (node: HTMLElement, prompt: string) => {
  node.className = 'terminal'
  const commandContainer = create('div', 'terminal-container')
  const inputContainer = create('div', 'terminal-type')
  const promptContainer = create('span', undefined, prompt)
  const input = create('input')
  input.setAttribute('type', 'text')
  inputContainer.append(promptContainer)
  inputContainer.append(input)
  node.append(commandContainer)
  node.append(inputContainer)
  node.addEventListener('click', () => input.focus())

  return { commandContainer, input: input as HTMLInputElement, inputContainer }
}

export default buildTree
