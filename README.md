# plainterm.js

A dead simple lightweight pure Javascript terminal "emulator" that is intended to be used for entertainment purposes.

Current state: operates within browser console window.

## Usage

Include the js in your page:

```html
<script src="./plainterm.js"></script>
```

Initialize with parameters:

```javascript
var settings = {
    id: "terminal", //A DOM id to initialize terminal in
    welcome: "Welcome to plainterm.js terminal emulator", //A welcome message that is being printed on initialization
    prompt: "user@mkrl.xyz:~$",
    commands: {
        test: {
            name: "test", //Command name
            description: "A test command with no args", //Help text to be displayed when `help` command is called
            parameters: [], //An array of successive parameter descriptions, used when the command that needs args is being called without any args
            func: function(){println("testing things")} //Function to be called when the command is executed. Accepts an array of parameters, ordered in the same way as in the previous property (see the next command for example)
        },
        echo: {
            name: "echo",
            description: "A test command with one echo arg",
            parameters: ["a string to be echoed in console"],
            func: function(params){println(params[0])}
        }
    }
};

term_init(settings);
```

## Working with the terminal:

`help` - Display a list of all commands with descriptions
`command` - Execute a command. Will display "Usage: command [parameter 1 description] [parameter 2 description], etc.", when needs args but called without them.

## API:

`println(text)` - Print a text in terminal starting from a new line

`bash.version` - plainterm.js version
`bash.commands` - an object containing all the available commands
`bash.commands.command`: 
    `bash.commands.command.name` - command name
    `bash.commands.command.description` - command description
    `bash.commands.command.parameters` - command parameters
    `bash.commands.command.func` - retrieve a function. call with `bash.commands.command.func()`