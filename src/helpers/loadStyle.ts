import { create } from './dom'
import TERMINAL_STYLE from './style.generated'

const loadStyle = () => {
  if (document.head.querySelectorAll('link[data-type="terminal"]').length === 0) {
    const element = create('style', undefined, TERMINAL_STYLE)
    element.setAttribute('data-type', 'terminal')
    element.setAttribute('type', 'text/css')
    document.head.append(element)
  }
}

export default loadStyle
