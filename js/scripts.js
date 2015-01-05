$.urlParam = function(name, default_){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return default_;
    }
    else{
       return results[1] || 0;
    }
}

function reverse_and_split(s){
    return s.split("").reverse();
}

function type(element, string) {
    var interval = parseInt($.urlParam('speed')) || 150;
    var strarr = reverse_and_split(string);
    var deferred = $.Deferred();
    var delay = 0;
    var id = setInterval(function(){
        if (strarr.length > 0) {
            var text = element.html();
            element.html(text+=strarr.pop());
        } else if (delay < 5) {
            delay++;
        } else {
            clearInterval(id);
            deferred.resolve();
        }
    }, interval);
    return deferred.promise();
}

function put(element, string) {
    var text = element.html();
    element.html(text+=string);
    return $.Deferred().resolve();
}

var code_input = [];

function wait() {
    var deferred = $.Deferred();
    var id = setInterval(function(){
        if (code_input.length > 0) {
            clearInterval(id);
            deferred.resolve();
            var currentFunc = code_input.shift();
            currentFunc().done(start_code.bind(this));
        }
    }, 100);
    return deferred.promise();
}

function start_code() {
    if (code_input.length > 0) {
        var currentFunc = code_input.shift();
        currentFunc().done(start_code.bind(this));
    } else {
        code_input.push(put.bind(this, $('.source'), ""));
        var currentFunc = code_input.shift();
        currentFunc().done(wait.bind(this));
    }
}

function show_jpv() {
    var element = $('.source');
    location.hash = "#jpv"
    code_input.push(type.bind(this, element, "cat JMUSIC_SITE"));
    code_input.push(put.bind(this, element, "<br /><br /><pre>      _|  _|      _|  _|    _|    _|_|_|  _|_|_|    _|_|_|  \n      _|  _|_|  _|_|  _|    _|  _|          _|    _|        \n      _|  _|  _|  _|  _|    _|    _|_|      _|    _|        \n_|    _|  _|      _|  _|    _|        _|    _|    _|        \n  _|_|    _|      _|    _|_|    _|_|_|    _|_|_|    _|_|_|\n\n</pre>"));
    code_input.push(put.bind(this, element, "<br />max@maxpowa.me:/portfolio# "));
}

function show_mc() {
    var element = $('.source');
    location.hash = "#mc-mods"
    code_input.push(type.bind(this, element, "cat MINECRAFT_MODS"));
    code_input.push(put.bind(this, element, "<br /><br /><pre>_|      _|  _|_|_|  _|      _|  _|_|_|_|    _|_|_|  _|_|_|      _|_|    _|_|_|_|  _|_|_|_|_|  \n_|_|  _|_|    _|    _|_|    _|  _|        _|        _|    _|  _|    _|  _|            _|      \n_|  _|  _|    _|    _|  _|  _|  _|_|_|    _|        _|_|_|    _|_|_|_|  _|_|_|        _|      \n_|      _|    _|    _|    _|_|  _|        _|        _|    _|  _|    _|  _|            _|      \n_|      _|  _|_|_|  _|      _|  _|_|_|_|    _|_|_|  _|    _|  _|    _|  _|            _|      \n\n</pre>"));
    code_input.push(put.bind(this, element, "<br />max@maxpowa.me:/portfolio# "));
}

function show_resume() {
    var element = $('.source');
    location.hash = "#resume"
    code_input.push(type.bind(this, element, "cat RESUME"));
    code_input.push(put.bind(this, element, "<br />max@maxpowa.me:/portfolio# "));
}

function show_contact() {
    var element = $('.source');
    location.hash = "#contact"
    code_input.push(type.bind(this, element, "cat CONTACT"));
    code_input.push(put.bind(this, element, "<br /><br /><pre>  _|_|_|    _|_|    _|      _|  _|_|_|_|_|    _|_|      _|_|_|  _|_|_|_|_|  \n_|        _|    _|  _|_|    _|      _|      _|    _|  _|            _|      \n_|        _|    _|  _|  _|  _|      _|      _|_|_|_|  _|            _|      \n_|        _|    _|  _|    _|_|      _|      _|    _|  _|            _|      \n  _|_|_|    _|_|    _|      _|      _|      _|    _|    _|_|_|      _|      \n\n</pre>"));
    code_input.push(put.bind(this, element, "<br />max@maxpowa.me:/portfolio# "));
}

$( document ).ready(function() {
    var element = $('.source');
    element.html('');
    code_input.push(put.bind(this, element, "max@maxpowa.me:/portfolio# "));
    
    if (window.location.hash === "#jpv") {
        show_jpv();
    } else if (window.location.hash === "#mc-mods") {
        show_mc();
    } else if (window.location.hash === '#resume') {
        show_resume();
    } else if (window.location.hash === '#contact') {
        show_contact();
    } else {
        code_input.push(type.bind(this, element, "ls -l ."));
        code_input.push(put.bind(this, element, "<br /><pre>-rw-r--r-x  1 max        max        1814989494 Dec 10 19:47 do_not_run_me.jar\ndrwxr-xr-x  8 max        max              4096 Nov 15 22:20 projects</pre><br />max@maxpowa.me:/portfolio# "));
        code_input.push(type.bind(this, element, "cd projects"));
        code_input.push(put.bind(this, element, "<br />max@maxpowa.me:/portfolio/projects# "));
        code_input.push(type.bind(this, element, "cat README"));
        code_input.push(put.bind(this, element, "<br /><br /><pre>_|_|_|    _|_|_|_|    _|_|    _|_|_|    _|      _|  _|_|_|_|  \n_|    _|  _|        _|    _|  _|    _|  _|_|  _|_|  _|        \n_|_|_|    _|_|_|    _|_|_|_|  _|    _|  _|  _|  _|  _|_|_|    \n_|    _|  _|        _|    _|  _|    _|  _|      _|  _|        \n_|    _|  _|_|_|_|  _|    _|  _|_|_|    _|      _|  _|_|_|_| \n\n</pre>"));
        code_input.push(put.bind(this, element, "<i class=\"fa fa-newspaper-o\"></i><pre id=\"resume\"> Click here to view my r&#x000E9;sum&#x000E9;.\n</pre><i class=\"fa fa-gamepad\"></i><pre id=\"mc-mods\"> Click here to see my adventures in Minecraft modding.\n</pre><i class=\"fa fa-bullhorn\"></i><pre id=\"contact\"> Click here to get my contact information.\n</pre><i class=\"fa fa-headphones\"></i><pre id=\"jpv\"> Click here to check out a slick music site I collaborated on.</pre><pre>\n</pre><br /><br />max@maxpowa.me:/portfolio/projects# "));
    }
    
    $('.source').on('click', '#jpv', show_jpv);
    $('.source').on('click', '#mc-mods', show_mc);
    $('.source').on('click', '#resume', show_resume);
    $('.source').on('click', '#contact', show_contact);
    
    start_code(code_input);
    
});