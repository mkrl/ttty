import { TerminalSettings } from '../types'

// Set a new terminal prompt
const setPrompt = (prompt: string, inputContainer: HTMLElement, settings: TerminalSettings) => {
  settings.prompt = prompt
  const promptContainer = inputContainer.querySelector('span') as HTMLElement
  promptContainer.textContent = prompt
}

export default setPrompt
