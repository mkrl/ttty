import '../ttty.css'
import { Terminal, TerminalSettings } from '../types'
import buildTree from '../helpers/tree'
import print from './print'
import evalCommand from './evalCommand'
import typeText from './typeText'
import { startProcess, stopProcess } from './process'
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
  const { commandContainer, input, inputContainer } = buildTree(host, prompt)

  const terminal: Terminal = {
    history: [],
    lastHistoryIndex: 0,
    isProcessRunning: false,
    settings,
    commandContainer,
    inputContainer,
    input,

    print: (content: string, isCommand = false) =>
      print(content, isCommand, commandContainer, input, prompt),
    run: (cmd: string) => evalCommand(cmd, terminal),
    start: () => startProcess(terminal),
    stop: () => stopProcess(terminal),
    type: (text: string, speed = 20) => typeText(text, speed, terminal)
  }

  attachKeyboardListener(host, terminal)
  dispatchEvent(TerminalEvent.ON_INIT, host)
  return terminal
}

export default initTerminal
