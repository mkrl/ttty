/* plainterm.js
https://github.com/mkrl/plainterm.js */


var plainterm = (function() {

    //Master object
    var bash = {commands: {}, history: [], last: 0, process: false,
        version: "0.4.3"
    };

    //Master command constructor
    function Command(name, description, func, parameters = []) {
        this.name = name;
        this.description = description;
        this.parameters = parameters;
        if (parameters.length > 0) {
            var pnames = "";
            for (var p of parameters) {
                pnames = pnames + " [" + p + "]";
            }
            this.func = function(params) {
                params = params || false;
                if ((params === false)||(params.length < parameters.length)) {
                println("usage: " + name + pnames);
                } else {
                    func(params);
                }
            };
        } else {
            this.func = func;
        }
    }

    //Utility functions

    //Initialize terminal from parameters
    function term_init(settings) {
        settings.id = settings.id || "terminal"; /* do not use "||" for default values and use custom function instead */
        settings.welcome = settings.welcome || "plainterm.js v. " + bash.version;
        bash.prompt = settings.prompt || "$ ";
        if (settings.help === undefined) {
            settings.help = true;
        }
        for (var o of Object.keys(settings.commands)) {
            var cmd = settings.commands[o];
            addcommand(cmd);
        }
        bash.container = document.getElementById(settings.id);
        build_tree(bash.container);
        println(settings.welcome);
        var event = new CustomEvent('onInit');
        bind_help(settings.help);
        bash.container.dispatchEvent(event);
    }


    //Build terminal DOM tree
    function build_tree(dom) {
        dom.className = "terminal";
        var container = document.createElement("div");
        var input_container = document.createElement("div");
        var prompt_span = document.createElement("span");
        prompt_span.innerHTML = bash.prompt;
        var input = document.createElement("input");
        container.className = "terminal-container";
        input_container.className = "terminal-type";
        input.setAttribute("type", "text");
        input.setAttribute("onkeypress", "plainterm.eval(this)");
        dom.appendChild(container);
        dom.appendChild(input_container);
        for (var e of document.getElementsByClassName("terminal-type")) {
            e.appendChild(prompt_span);
            e.appendChild(input);
        }
        bash.container.display = dom.firstElementChild;
        bash.container.input = input;
        bash.container.area = input_container;
        dom.onclick = function() {input.focus();};
    }

    function addcommand(cmd) {
        bash.commands[cmd.name] = new Command(cmd.name, cmd.description, cmd.func, cmd.parameters);
    }
    
    
    //Prints a newline in console
    function println(content, c = false) {
        var line = document.createElement("p");
        if (c === true) {
            var cmd = document.createElement("span");
            cmd.innerHTML = content;
            cmd.className = "command";
            line.innerHTML = bash.prompt;
            bash.container.display.appendChild(line);
            line.appendChild(cmd);

        } else {
            line.innerHTML = content;
            bash.container.display.appendChild(line);
        }
    }

    //Eval as command
    function evaluate(cmd) {
        var comms = cmd.split(/\s+/);
        var comm = comms[0];
        comms.shift();
        var valid_event = new CustomEvent('onCommand');
        var invalid_event = new CustomEvent('onCommand404');
        if (Object.getOwnPropertyNames(bash.commands).indexOf(comm) > -1) {
            bash.commands[comm].func(comms);
            bash.history.unshift(cmd);
            bash.container.dispatchEvent(valid_event);
        } else {
            println(comm + " - command not found");
            bash.container.dispatchEvent(invalid_event);
        }
    }

    //Reads text on Enter press
    function run(cmd) {
        if(event.keyCode == 13) {
            println(cmd.value, true);
            if (cmd.value.length > 0) {
                evaluate(cmd.value);
            }
            cmd.value = "";
            bash.last = 0;
            bash.container.input.scrollIntoView();
        }
    }

    //Running a process
    function process_run() {
        bash.container.area.style.display = "none";
        bash.process = true;
        bash.prompt = "";
        var event = new CustomEvent('onProcessStart');
        bash.container.dispatchEvent(event);
    }
    function process_stop() {
        bash.container.area.style.display = "flex";
        bash.process = false;
        bash.prompt = settings.prompt;
        var event = new CustomEvent('onProcessStop');
        bash.container.dispatchEvent(event);
    }
    //Typing
    function type(text, speed, command = false) {
        bash.container.area.style.display = "none";
        var line = document.createElement("p");
        bash.container.display.appendChild(line);
        if (command === true) {
            line.innerHTML = bash.prompt;
        }
        var i = 0;
        function typing() {
            if (i < text.length) {
                line.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (bash.process === false) {
                bash.container.area.style.display = "flex";
            }
        }
        setTimeout(typing, speed);
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
    function bind_help(help_active) {
        if (help_active === true) {
        bash.commands.help = new Command("help","shows a help message", 
            function(){
                Object.getOwnPropertyNames(bash.commands).map(function(cmd){
                    println(bash.commands[cmd].name + " - " + bash.commands[cmd].description);
                });
            });
        }
    }

    //API
    return {
        init: term_init,
        run: evaluate,
        eval: run,
        print: println,
        hist: get_from_history,
        type: type,
        start: process_run,
        stop: process_stop
    };
})();
