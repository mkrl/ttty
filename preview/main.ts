import initTerminal from '../src/api/init'
import './index.css'
import { setColor } from './colors'

const docArea = document.querySelector('main')

const terminal = initTerminal({
  host: document.querySelector('#terminal') as HTMLElement,
  welcomeMessage: `Welcome to ttty @ ${navigator.userAgent}<br/><br/>
     * Documentation:  <a href="https://github.com/mkrl/ttty/blob/master/README.md" target="_blank">https://github.com/mkrl/ttty</a><br/><br/>`,
  prompt: 'ttty:~$ ',
  commands: {
    test: {
      name: 'test',
      description: 'a test command with no arguments that just prints some text',
      func: ({ type }) => { type('The quick brown fox jumps over the lazy dog', 20) }
    },
    echo: {
      name: 'echo',
      description: 'echo whatever you pass as an argument',
      argDescriptions: ['a string to be echoed in console'],
      func: ({ print }, argument) => { print(argument) }
    },
    multiply: {
      name: 'multiply',
      description: 'multiply two numbers',
      argDescriptions: ['number one', 'number two'],
      func: ({ print }, one, two) => { print(String(Number(one) * Number(two))) }
    },
    start: {
      name: 'start',
      description: 'starts doing something for a certain period of time',
      func: (terminal) => {
        terminal.print('Downloading more RAM...')
        terminal.print('Press Ctrl + C if you think you have enough RAM')
        terminal.type('............................................', 100)
          .then((finished) => {
            if (finished) {
              terminal.print('Successfully downloaded 42gb of RAM!')
            }
          })
      }
    },
    enqueue: {
      name: 'enqueue',
      description: 'pretend like someone else is typing in the terminal',
      func: (terminal) => {
        terminal.type('test', 70, true)
          .then((finished) => {
            if (finished) {
              terminal.run('test')
            }
          })
      }
    },
    color: {
      name: 'color',
      description: 'set a terminal color scheme',
      argDescriptions: ['color scheme'],
      func: ({ print }, color) => {
        print(setColor(color))
      }
    },
    clear: {
      name: 'clear',
      description: 'clear the history',
      func: ({ commandContainer }) => { commandContainer.innerHTML = '' }
    },
    github: {
      name: 'github',
      description: 'gets a Github user\'s name and number of public repositories',
      argDescriptions: ['Github username'],
      func: ({ print, start, stop }, username) => {
        start()
        fetch(`https://api.github.com/users/${username}`)
          .then(response => {
            if (!response.ok) { throw response }
            return response.json()
          })
          .then(data => {
            print(`${data.name ?? username} has ${data.public_repos} public repos`)
          })
          .catch((error) => {
            if (error.status === 404) {
              print(`Can't find this ${username} on Github`)
            } else {
              print('We got an error talking to Github')
            }
          }).finally(() => stop())
      }
    }
  }
})

// Quickly execute commands passed to DOM nodes as "data-exec" in the terminal
docArea?.addEventListener('click', ({ target }) => {
  if (Object.keys((target as HTMLElement)?.dataset).length > 0 && target) {
    const command = (target as HTMLElement).dataset?.exec as string
    terminal.print(command, true)
    terminal.run(command)
  }
})

// Focus terminal input as soon as terminal is initialized
terminal.input.focus()

// For the ease of debugging, the terminal instance is exposed on `window`
// @ts-ignore
window.terminal = terminal
