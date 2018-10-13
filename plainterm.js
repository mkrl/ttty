//Declare master object
var bash = {commands: {},
    version: "0.1"
}

//Master command constructor
function Command(name, description, parameters, func) {
    this.name = name;
    this.description = description;
    this.parameters = parameters;
    if (parameters.length > 0) {
        var pnames = "";
        for (p of parameters) {
            pnames = pnames + " [" + p + "]";
        }
        this.func = function(params) {
            params = params || false;
            if (params == false) {
            println("Usage: " + name + pnames);
            } else {
                func(params);
            }
        }
    } else {
        this.func = func;
    }
}

//Constructing help command
bash.commands.help = new Command("help","Shows a help message", [],
    function(){
        Object.getOwnPropertyNames(bash.commands).map(function(cmd){
           println(bash.commands[cmd].name + " - " + bash.commands[cmd].description);
        });
    });



//Utility functions

//Initialize terminal from parameters
function term_init(settings) {
    settings.id = settings.id || "terminal";
    settings.welcome = settings.welcome || "plainterm.js v. " + bash.version;
    settings.prompt = settings.prompt || "$ ";
    for (o of Object.keys(settings.commands)) {
        var cmd = settings.commands[o];
        bash.commands[cmd.name] = new Command(cmd.name, cmd.description, cmd.parameters, cmd.func);
    }
    var container = document.createElement("div");
    var input_container = document.createElement("div");
    var prompt_span = document.createElement("span");
    prompt_span.innerHTML = settings.prompt;
    var input = document.createElement("input");
    container.className = "terminal-container";
    input_container.className = "terminal-type";
    input.setAttribute("type", "text");
    input.setAttribute("onkeypress", "run(this)");
    document.getElementById(settings.id).appendChild(container);
    document.getElementById(settings.id).appendChild(input_container);
    for (e of document.getElementsByClassName("terminal-type")) {
        e.appendChild(prompt_span);
        e.appendChild(input);
    }
    bash.container = document.getElementById(settings.id).firstElementChild;
}

//Prints a newline in console
function println(content) {
    var cmd = document.createElement("p");
    cmd.innerHTML = settings.prompt + content;
    bash.container.appendChild(cmd);
}

//Reads text on Enter press
function run(cmd) {
    if(event.keyCode == 13) {
        println(cmd.value)
    }
}