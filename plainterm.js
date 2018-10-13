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
    println(settings.welcome);
    for (o of Object.keys(settings.commands)) {
        var cmd = settings.commands[o];
        bash.commands[cmd.name] = new Command(cmd.name, cmd.description, cmd.parameters, cmd.func);
    }
    var container = document.createElement("div");
    var input_container = document.createElement("input");
    container.className = "terminal-container";
    input_container.className = "terminal-type";
    input_container.setAttribute("type", "text");
    document.getElementById(settings.id).appendChild(container);
    document.getElementById(settings.id).appendChild(input_container);
}

//Prints a newline in console
function println(content) {
    console.log(content)
}