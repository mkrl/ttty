import { Terminal } from '../types'
import evalCommand from '../api/evalCommand'
import { populateHistory, searchHistory } from './history'

export const attachKeyboardListener = (host: HTMLElement, instance: Terminal) => {
  const { input, print } = instance
  host.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
      instance.lastHistoryIndex = 0
      if (input.value.length > 0) {
        populateHistory(instance)
        evalCommand(input.value, instance)
      } else {
        print(' ', true)
      }
      input.value = ''
      console.log(instance.history)
      return
    }
    if (key === 'ArrowUp') {
      searchHistory(instance)
      return
    }
    if (key === 'ArrowDown') {
      searchHistory(instance, true)
    }
  })
}
