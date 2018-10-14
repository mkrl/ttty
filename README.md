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
            description: "a test command with one echo arg", //Help text to be displayed when `help` command is called
            parameters: ["a string to be echoed in console"], //An optional array of successive parameter descriptions, used when the command that needs args is being called without any args
            func: function(params){plainterm.print(params[0])} //Function to be called when the command is executed. Accepts an array of parameters, ordered in the same way as in the previous property
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

## Working with the terminal:

`help` - Display a list of all commands with descriptions

`command` - Execute a command. Will display "Usage: command [parameter 1 description] [parameter 2 description], etc.", when needs args but called without them.

## API:

| Method  | Description | Parameters |
| ------------- | ------------- | ------------- |
| `init(settings)`  | Initialize a terminal in a DOM with given ID | Object. See the example above |
| `print(text, c)`  | Prints a given text in the terminal  | `text` - String, `c` - Boolean, optional, defaults to false. Count given string as a command (displays prompt, syntax highlight and appears in history) |
| `run(text)`  | Emulates a command execution in a terminal (acts the same way as a use would have typed and pressed Enter)  | `text` - String |
| `hist(up)`  | Search in command history. Returns string.  | `up` - Boolean, optional. Defaults to true. Upward/downward search. |