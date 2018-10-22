
# plainterm.js

A dead simple lightweight pure Javascript terminal "emulator" that mimics terminal behaviour in browser.

Features:

 - Tiny, pure JS, works in ES6+
 - Easy-to-add custom commands
 - Events
 - Command history
 - Command arguments existence validation
 - API


## Usage

Include the js in your page:

```html
<script src="./plainterm.js"></script>
```

Initialize with parameters:

```javascript
var settings = {
    id: "terminal", 
    welcome: "Welcome to plainterm.js terminal emulator", 
    prompt: "user@mkrl.xyz:~$",
    commands: {
        echo: {
            name: "echo", 
            description: "a test command with one echo arg", 
            parameters: ["a string to be echoed in console"],
            func: function(params){plainterm.print(params[0])} 
        },
        test: {
            name: "test", 
            description: "a test command with no args", 
            func: function(){plainterm.print("testing things")} 
        },
        multiply: {
            name: "multiply",
            description: "Multiply two numbers",
            parameters: ["number one", "number two"],
            func: function(params){plainterm.print(params[0]*params[1])}
        }
    }
};

plainterm.init(settings);
```

## Working with the terminal

`help` - Display a list of all commands with descriptions

`command` - Execute a command. Will display "Usage: command [parameter 1 description] [parameter 2 description], etc.", when it requires arguments but is called without them.

## API

### plainterm object

| Method  | Description | Parameters |
| ------------- | ------------- | ------------- |
| `init(settings)`  | Initialize a terminal in a DOM with given ID | `settings` object. |
| `print(text, c)`  | Prints a given text in the terminal (accepts raw HTML)  | `text` - String, `c` - Boolean, optional, defaults to false. Count given string as a command (displays prompt, syntax highlight and appears in history) |
| `run(text)`  | Emulates a command execution in a terminal (acts the same way as a user would have typed and pressed Enter)  | `text` - String |
| `hist(up)`  | Search in command history. Returns string.  | `up` - Boolean, optional. Defaults to true. Upward/downward search. |
| `start()`  | Starts a "foreground process": user input is blocked and command prompt never appears. |  |
| `stop()`  | Stops "foreground process". |  |
| `type(text, speed, command)`  | Prints a text with "typing" effect. Hides and blocks user input while typing. | `text` - String, text to be printed. `speed` - integer, miliseconds. The higher the number, the slower. `command` - boolean, prepend/hide command line prompt. |

### settings object

| Parameter  | Description | Default |
| ------------- | ------------- | ------------- |
| `id`: string | A DOM id to initialize terminal in. | 'terminal' |
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