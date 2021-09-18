import { Terminal } from '../types'

export const populateHistory = (instance: Terminal) => {
  const { input: { value }, history, settings: { historyLength } } = instance
  if (value === history[0]) {
    return
  }
  if (history.length >= (historyLength as number)) {
    instance.history = [value, ...history.slice(0, -1)]
    return
  }
  instance.history = [value, ...history]
  instance.lastHistoryIndex = 0
}

export const searchHistory = (instance: Terminal, isDown?: boolean) => {
  const { history, lastHistoryIndex } = instance
  const endOfHistory = history.length - 1
  let newIndex: number
  if (isDown && lastHistoryIndex === 0) return
  // @TODO: still not consistent, index is duplicated once when searching down
  if (isDown) {
    newIndex = lastHistoryIndex - 1
  } else {
    newIndex = lastHistoryIndex === endOfHistory ? 0 : lastHistoryIndex + 1
  }
  instance.input.value = history[isDown ? newIndex : lastHistoryIndex]
  instance.lastHistoryIndex = newIndex
}
