import { TerminalInstance } from '../types'
import evalCommand from '../api/evalCommand'
import { populateHistory, searchHistory } from './history'
import { stopProcess } from '../api/process'
import { dispatchEvent, TerminalEvent } from './events'

export const attachKeyboardListener = (host: HTMLElement, instance: TerminalInstance) => {
  const { input, print } = instance
  host.addEventListener('keyup', ({ key, ctrlKey }) => {
    if (ctrlKey && key === 'c' && instance.isProcessRunning) {
      print('^C')
      stopProcess(instance)
      dispatchEvent(TerminalEvent.ON_PROCESS_INTERRUPT, host)
    } else {
      if (instance.isProcessRunning) return
      if (key === 'Enter') {
        instance.lastHistoryIndex = 0
        if (input.value.length > 0) {
          print(input.value, true)
          populateHistory(instance)
          evalCommand(input.value, instance)
        } else {
          print(' ', true)
        }
        input.value = ''
        return
      }
      if (key === 'ArrowUp') {
        searchHistory(instance)
        return
      }
      if (key === 'ArrowDown') {
        searchHistory(instance, true)
      }
    }
  })
}
