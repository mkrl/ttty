
# ttty

A dead simple lightweight TypeScript terminal "emulator" that mimics terminal behaviour in browser.

Features:

 - Tiny, dependency-free and built with modern JS
 - Easy-to-add custom commands
 - Events
 - Command history
 - Command arguments with validation
 - "Foreground processes" imitation
 - Small but powerful


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
<script src="./ttty.iffe.js"></script>
<!-- As a ES6 module -->
<script type="module" src="./ttty.es.js"></script>
```

Don't forget to include / import the required css:
```html
<link rel="stylesheet" href="styles.css">
```

Initialize with parameters:

```js
const settings = {
    host: "terminal",
    prompt: "user@ttty:~$",
    commands: {
        echo: {
            name: "echo", 
            description: "a test command with one echo arg", 
            parameters: ["a string to be echoed in console"],
            func: function({ print }, argument) { print(argument) } 
        },
        test: {
            name: "test", 
            description: "a test command with no args", 
            func: function({ print }) { print("foo") } 
        },
        multiply: {
            name: "multiply",
            description: "Multiply two numbers",
            parameters: ["number one", "number two"],
            func: function({ print }, one, two){ print(Number(one) * Number(two)) }
        }
    }
}

initTerminal(settings)
```

## Working with the terminal

`help` - Display a list of all commands with descriptions (TBA)

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
| `print(text, c)`  | Prints a given text in the terminal (accepts raw HTML)  | `text` - String, `c` - Boolean, optional, defaults to false. Count given string as a command (displays prompt & syntax highlight) |
| `run(text)`  | Emulates a command execution in a terminal (acts the same way as a user would have typed and pressed Enter)  | `text` - String |
| `start()`  | Starts a "foreground process": user input is blocked and command prompt never appears. |  |
| `stop()`  | Stops "foreground process". |  |
| `type(text, speed, command)`  | Prints a text with "typing" effect. Hides and blocks user input while typing. | `text` - String, text to be printed. `speed` - integer, miliseconds. The higher the number, the slower. `command` - boolean, prepend/hide command line prompt. |

### settings object

| Parameter  | Description | Default |
| ------------- | ------------- | ------------- |
| `host`: DOM element | A DOM id to initialize terminal in. |  |
| `welcome`: string | A welcome message that is being printed on initialization | 'plainterm.js v. [version]' |
| `help`: boolean | Toggle default `help` command that lists all the available commands and their descriptions. | true |
| `prompt`: string | Terminal prompt | '$ ' |
| `commands`: object | `commands` object |  |

### commands object

| Parameter  | Description | 
| ------------- | ------------- | 
| `name`: string | Command name. | 
| `description`: string | Command description, used for the default `help` command. | 
| `parameters`: string array | Array of strings that desribe command line arguments in order of appearance. | 
| `func`: function(params) | Function. Accepts an array of parameters in order of appearance (params[0] for the first argument, etc.) | 



## Events

| Event  | Description 
| ------------- | ------------- |
| `onInit`  | Terminal initialization |
| `onCommand`  | Existing command executed |
| `onCommand404`  | Non-existing command executed |
| `onProcessStart`  | Process started |
| `onProcessStop`  | Process stopped |

Events are being dispatched by the inititial terminal container passed on init, for example:

```
const term = document.getElementById('terminal');
term.addEventListener('onCommand', e => console.log("known command executed!"));
```
