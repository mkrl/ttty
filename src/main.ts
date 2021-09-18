import './ttty.css'
import { TerminalSettings, Terminal } from './types'
import buildTree from './helpers/tree'
import { qs } from './helpers/dom'
import print from './api/print'
import { attachEnterListener } from './helpers/keyboard'

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
    commandContainer,
    input
  }

  attachEnterListener(host, terminal)
  return terminal
}

const term = initTerminal({
  host: qs('#app') as HTMLElement,
  commands: {
    test: {
      name: 'test',
      description: 'test string',
      func: ({ print }) => {
        print('YEEHAW')
        print('HAWYEE')
      }
    }
  }
})

// @ts-ignore
window.terminal = term
