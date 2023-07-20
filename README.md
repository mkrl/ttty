
# ttty

A dead simple lightweight TypeScript terminal "emulator" that mimics terminal behaviour in browser.

Features:

 - Tiny, dependency-free and built with modern JS
 - Easy-to-add custom commands
 - Events
 - Command history
 - Command arguments with validation
 - "Foreground processes" imitation


## Usage

### With module bundler

Add the latest release with:

`npm install ttty`
or
`yarn add ttty`

Initialize the terminal in a particular DOM element with:

```js
import { initTerminal } from 'ttty'

// ...

const terminal = initTerminal({ /* settings */ })
```

### In a browser directly

```html
<!-- As a global JS file -->
<script src="https://unpkg.com/ttty/dist/ttty.iife.js"></script>
```
```js
ttty.initTerminal({ /* settings */ })
```

Initialize with parameters:

```js
const settings = {
    host: document.querySelector("#terminal"),
    prompt: "user@ttty:~$ ",
    commands: {
        echo: {
            name: "echo", 
            description: "a test command with one echo arg", 
            argDescriptions: ["a string to be echoed in console"],
            func: ({ print }, argument) => { print(argument) } 
        },
        test: {
            name: "test", 
            description: "a test command with no args", 
            func: ({ print }) => { print("foo") } 
        },
        multiply: {
            name: "multiply",
            description: "Multiply two numbers",
            argDescriptions: ["number one", "number two"],
            func: ({ print }, one, two) => { print(Number(one) * Number(two)) }
        }
    }
}

initTerminal(settings)
```

## Working with the terminal

`help` - Display a list of all commands with descriptions

`command` - Execute a command. Will display "Usage: command [parameter 1 description] [parameter 2 description], etc.", when it requires arguments but is called without them.

## API

### initTerminal

| Method  | Description | Parameters |
| ------------- | ------------- | ------------- |
| `init(settings)`  | Initialize a terminal in a given DOM element | `settings` object. |

### terminal

An object that's being passed to every command function & returned by `initTerminal`

| Method  | Description | Parameters |
| ------------- | ------------- | ------------- |
| `print(text, isCommand)`  | Prints a given text in the terminal (accepts raw HTML)  | `text` - String, `isCommand` - Boolean, optional, defaults to false. Count given string as a command (displays prompt & syntax highlight) |
| `run(text)`  | Emulates a command execution in a terminal (acts the same way as a user would have typed and pressed Enter)  | `text` - String |
| `start()`  | Starts a "foreground process": user input is blocked and command prompt never appears. |  |
| `stop()`  | Stops "foreground process". |  |
| `type(text, speed, callback)`  | Prints a text with "typing" effect. Hides and blocks user input while typing. | `text` - String, text to be printed. `speed` - integer, miliseconds. The higher the number, the slower. `callback` - function, gets executed when the process is finished. |
| `setPrompt()`  | Set terminal prompt | `newPrompt` - String   |

### settings object

| Parameter  | Description | Default |
| ------------- | ------------- | ------------- |
| `host`: DOM element | A DOM element to initialize terminal in. |  |
| `welcomeMessage`: string | A welcome message that is being printed on initialization |  |
| `enableHelp`: boolean | Toggle default `help` command that lists all the available commands and their descriptions. | true |
| `prompt`: string | Terminal prompt | '$: ' |
| `historyLength`: number | A maximum amount of commands that can be stored in the terminal history | 50 |
| `history`: string[] | A default value for terminal history (can be used to preserve history across sessions) | [] |
| `commands`: object | `commands` object |  |

### commands object

| Parameter  | Description | 
| ------------- | ------------- | 
| `name`: string | Command name. | 
| `description`: string | Command description, used for the default `help` command (when enabled). | 
| `argDescriptions`: string array | Array of strings that describe command line arguments in order of appearance. | 
| `func`: function(terminal, ...arguments) | Function. Accepts an array of parameters in order of appearance (i.e. `function(terminal, one, two)` will correspond to two arguments passed as `command one two`) | 



## Events

| Event  | Description 
| ------------- | ------------- |
| `onInit`  | Terminal initialization |
| `onCommand`  | Existing command executed |
| `onCommand404`  | Non-existing command executed |
| `onProcessStart`  | Process started |
| `onProcessStop`  | Process stopped |
| `onProcessInterrupt`  | Process interrupted with a keyboard |

Events are being dispatched by the DOM element passed on init, for example:

```
const term = document.getElementById('terminal');
term.addEventListener('onCommand', e => console.log("known command executed!"));
```

## Custom styling

You can customize the look defining custom CSS variables. If you have multiple instances, you can even have each instance in its' own style!

| Variable  | Description
| ------------- | ------------- |
| `--terminal-bg-color`  | Background color |
| `--terminal-fg-color`  | Text color |
| `--terminal-font`  | Terminal font-family |
| `--terminal-accent-color`  | Accent color |
| `--terminal-error-color`  | Error color |

## Browser compatibility

ttty is built and distributed with ES6 in mind (including the minified package). You can always transpile & bundle it targeting your browser set of choice.

Browsers that do not support CSS variables (IE < 11) might not be able to make use of custom themes. In order to use ttty with older browsers please rebuild this with custom properties removed.
