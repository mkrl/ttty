# plainterm.js

A dead simple lightweight pure Javascript terminal "emulator" that is intended to be used for entertainment purposes.


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
        echo: {
            name: "echo", //Command name
            description: "A test command with one echo arg", //Help text to be displayed when `help` command is called
            parameters: ["a string to be echoed in console"], //An optional array of successive parameter descriptions, used when the command that needs args is being called without any args
            func: function(params){println(params[0])} //Function to be called when the command is executed. Accepts an array of parameters, ordered in the same way as in the previous property
        },
        test: {
            name: "test", 
            description: "A test command with no args", 
            func: function(){println("testing things")} 
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
`bash.commands` - an object containing all available commands available

`bash.commands.command`: 

`bash.commands.command.name` - command name
`bash.commands.command.description` - command description
`bash.commands.command.parameters` - command parameters
`bash.commands.command.func` - retrieve a function. call with `bash.commands.command.func()`