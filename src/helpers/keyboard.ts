import { Terminal } from '../types'
import evalCommand from '../api/evalCommand'

export const attachEnterListener = (host: HTMLElement, instance: Terminal) => {
  const { input, print } = instance
  host.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
      input.value.length > 0 ? evalCommand(input.value, instance) : print(' ', true)
      input.value = ''
    }
  })
}
