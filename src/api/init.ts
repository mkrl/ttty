import { TerminalInstance, TerminalSettings } from '../types'
import buildTree from '../helpers/tree'
import print from './print'
import evalCommand from './evalCommand'
import typeText from './typeText'
import { startProcess, stopProcess } from './process'
import { attachKeyboardListener } from '../helpers/keyboard'
import { dispatchEvent, TerminalEvent } from '../helpers/events'
import createHelp from '../helpers/help'
import loadStyle from '../helpers/loadStyle'
import setPrompt from './prompt'

const initTerminal = ({
  host,
  welcomeMessage,
  prompt = '$: ',
  historyLength = 50,
  history = [],
  enableHelp = true,
  commands
}: TerminalSettings) => {
  const settings = {
    host,
    welcomeMessage,
    prompt,
    historyLength,
    enableHelp,
    commands
  }
  loadStyle()
  const { commandContainer, input, inputContainer } = buildTree(host, prompt)

  const terminal: TerminalInstance = {
    history,
    lastHistoryIndex: 0,
    isProcessRunning: false,
    settings,
    commandContainer,
    inputContainer,
    input,

    print: (content: string, isCommand = false) =>
      print(content, isCommand, commandContainer, input, settings),
    run: (cmd: string) => evalCommand(cmd, terminal),
    start: () => startProcess(terminal),
    stop: () => stopProcess(terminal),
    type: (text: string, speed = 60, isCommand) => typeText(text, speed, terminal, isCommand),
    setPrompt: (newPrompt: string) => setPrompt(newPrompt, inputContainer, settings)
  }
  if (enableHelp) {
    terminal.settings.commands.help = createHelp(terminal)
  }

  attachKeyboardListener(host, terminal)
  dispatchEvent(TerminalEvent.ON_INIT, host)
  welcomeMessage && (terminal.print(welcomeMessage))
  return terminal
}

export default initTerminal
