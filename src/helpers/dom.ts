import { TerminalInstance } from '../types'

export const create = (tagName: string, className?: string, content?: string) => {
  const element = document.createElement(tagName)
  className && (element.className = className)
  content && (element.innerHTML = content)
  return element
}

export const toggleInput = (terminal: TerminalInstance, enable = false) => {
  // Has to be done in order to preserve the focus on terminal click when disabled
  terminal.input.readOnly = !enable
  terminal.inputContainer.style.opacity = enable ? '' : '0'
}
