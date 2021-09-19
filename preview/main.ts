import initTerminal from '../src/api/init'

const term = initTerminal({
  host: document.querySelector('#terminal') as HTMLElement,
  prompt: 'ttty:~$ ',
  commands: {
    test: {
      name: 'test',
      description: 'test string',
      func: ({ print }) => {
        print('YEEHAW')
        print('HAWYEE')
      }
    },
    echo: {
      name: 'echo',
      description: 'echo a thing',
      argDescriptions: ['thing to echo'],
      func: ({ print }, echoString) => {
        print('Thing you wanted:')
        print(echoString)
      }
    }
  }
})

// For the ease of debugging, the terminal instance is exposed on `window`
// @ts-ignore
window.terminal = term
