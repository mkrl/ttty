/* plainterm.js
https://github.com/mkrl/plainterm.js */


var plainterm = (function() {

    //Master object
    var bash = {commands: {}, history: [], last: 0,
        version: "0.4"
    }

    //Master command constructor
    function Command(name, description, parameters = [], func) {
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
                if ((params == false)||(params.length < parameters.length)) {
                println("usage: " + name + pnames);
                } else {
                    func(params);
                }
            }
        } else {
            this.func = func;
        }
    }

    //Utility functions

    //Initialize terminal from parameters
    function term_init(settings) {
        settings.id = settings.id || "terminal";
        settings.welcome = settings.welcome || "plainterm.js v. " + bash.version;
        settings.prompt = settings.prompt || "$ ";
        for (o of Object.keys(settings.commands)) {
            var cmd = settings.commands[o];
            addcommand(cmd);
        }
        build_tree(document.getElementById(settings.id));
        println(settings.welcome);
    }


    //Build terminal DOM tree
    function build_tree(dom) {
        dom.className = "terminal";
        var container = document.createElement("div");
        var input_container = document.createElement("div");
        var prompt_span = document.createElement("span");
        prompt_span.innerHTML = settings.prompt;
        var input = document.createElement("input");
        container.className = "terminal-container";
        input_container.className = "terminal-type";
        input.setAttribute("type", "text");
        input.setAttribute("onkeypress", "plainterm.run(this)");
        dom.appendChild(container);
        dom.appendChild(input_container);
        for (e of document.getElementsByClassName("terminal-type")) {
            e.appendChild(prompt_span);
            e.appendChild(input);
        }
        bash.container = dom.firstElementChild;
        bash.container.input = input;
        dom.onclick = function() {input.focus()}
    }

    function addcommand(cmd) {
        bash.commands[cmd.name] = new Command(cmd.name, cmd.description, cmd.parameters, cmd.func);
    }
    
    
    //Prints a newline in console
    function println(content, c = false) {
        var line = document.createElement("p");
        if (c === true) {
            var cmd = document.createElement("span");
            cmd.innerHTML = content;
            cmd.className = "command";
            line.innerHTML = settings.prompt;
            bash.container.appendChild(line);
            line.appendChild(cmd);
        } else {
            line.innerHTML = content;
            bash.container.appendChild(line);
        }
    }

    //Eval as command
    function evaluate(cmd) {
        comms = cmd.split(/\s+/);
        comm = comms[0];
        comms.shift();
        if (Object.getOwnPropertyNames(bash.commands).indexOf(comm) > -1) {
            bash.commands[comm].func(comms);
            bash.history.unshift(cmd);
        } else {
            println(comm + " - command not found")
        }
    }

    //Reads text on Enter press
    function run(cmd) {
        if(event.keyCode == 13) {
            println(cmd.value, true);
            if (cmd.value.length > 0) {
                evaluate(cmd.value)
            }
            cmd.value = "";
            bash.last = 0;
            bash.container.input.scrollIntoView();
        }
    }

    //History

    function get_from_history(up = true) {
        if (bash.history.length > 0) {
            if (up === true && bash.last < bash.history.length-1) {
                bash.container.input.value = bash.history[bash.last];
                bash.last++;
            } else if (up === false && bash.last > 0){
                bash.container.input.value = bash.history[bash.last];
                bash.last--;
            }
        }
    }

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        switch (event.key) {
            case "ArrowUp":
                get_from_history();
                break;
            case "ArrowDown":
                get_from_history(false);
                break;
        }
    });

    //Constructing default help command
    bash.commands.help = new Command("help","shows a help message", [],
        function(){
            Object.getOwnPropertyNames(bash.commands).map(function(cmd){
               println(bash.commands[cmd].name + " - " + bash.commands[cmd].description);
            });
        });

    //API
    return {
        init: term_init,
        run: run,
        print: println,
        hist: get_from_history
    }

})();










