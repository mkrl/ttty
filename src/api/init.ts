// @TODO: think of removing this but keep in a published package
import '../ttty.css'
import { Terminal, TerminalSettings } from '../types'
import buildTree from '../helpers/tree'
import print from './print'
import { attachKeyboardListener } from '../helpers/keyboard'
import { dispatchEvent, TerminalEvent } from '../helpers/events'

const initTerminal = ({
  host,
  welcomeMessage = 'ttty v.1.0.0',
  prompt = '$: ',
  historyLength = 50,
  commands
}: TerminalSettings) => {
  const settings = {
    host,
    welcomeMessage,
    prompt,
    historyLength,
    commands
  }
  const { commandContainer, input } = buildTree(host, prompt)

  const terminal: Terminal = {
    print: (content: string, isCommand = false) =>
      print(content, isCommand, commandContainer, input, prompt),
    settings,
    history: [],
    lastHistoryIndex: 0,
    commandContainer,
    input
  }

  attachKeyboardListener(host, terminal)
  dispatchEvent(TerminalEvent.ON_INIT, host)
  return terminal
}

export default initTerminal
