/*
 * Konami-JS ~
 * :: Now with support for touch events and multiple instances for
 * :: those situations that call for multiple easter eggs!
 * Code: https://github.com/snaptortoise/konami-js
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.6 (3/2/2016)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var Konami = function (callback) {
	var konami = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				}
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		pattern: "38384040373937396665",
		load: function (link) {
			this.addEvent(document, "keydown", function (e, ref_obj) {
				if (ref_obj) konami = ref_obj; // IE
				konami.input += e ? e.keyCode : event.keyCode;
				if (konami.input.length > konami.pattern.length)
					konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
				if (konami.input == konami.pattern) {
					konami.code(link);
					konami.input = "";
					e.preventDefault();
					return false;
				}
			}, this);
			this.iphone.load(link);
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: "",
			keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
			code: function (link) {
				konami.code(link);
			},
			load: function (link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, "touchmove", function (e) {
					if (e.touches.length == 1 && konami.iphone.capture == true) {
						var touch = e.touches[0];
						konami.iphone.stop_x = touch.pageX;
						konami.iphone.stop_y = touch.pageY;
						konami.iphone.tap = false;
						konami.iphone.capture = false;
						konami.iphone.check_direction();
					}
				});
				konami.addEvent(document, "touchend", function (evt) {
					if (konami.iphone.tap == true) konami.iphone.check_direction(link);
				}, false);
				konami.addEvent(document, "touchstart", function (evt) {
					konami.iphone.start_x = evt.changedTouches[0].pageX;
					konami.iphone.start_y = evt.changedTouches[0].pageY;
					konami.iphone.tap = true;
					konami.iphone.capture = true;
				});
			},
			check_direction: function (link) {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
				y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap == true) ? "TAP" : result;

				if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
				if (this.keys.length == 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}

	typeof callback === "string" && konami.load(callback);
	if (typeof callback === "function") {
		konami.code = callback;
		konami.load();
	}

	return konami;
};


/*!
 * SSSL: smallest, simpelst script loader
 * version: 1.0.1
 *
 * API:
 * Normal usage
 * sssl(source [,complete]);
 *
 * Example:
 * sssl('jquery.js', function(){
 * 	$(function(){
 * 		$('div').addClass('ready');
 * 	});
 * });
 *
 * -------------------------------
 *
 * Queued script loading (not so fast as yepnope/labJS, but ordered execution):
 * sssl([source1, source2, source3], complete);
 *
 * Example:
 * sssl(['jquery.js', 'jquery.ui.js'], function(){
 * 	$(function(){
 * 		$('div.accordion').accordion();
 * 	});
 * });
 */
(function(){
	var firstScript = document.getElementsByTagName('script')[0];
	var scriptHead = firstScript.parentNode;
	var re = /ded|co/;
	var onload = 'onload';
	var onreadystatechange = 'onreadystatechange';
	var readyState = 'readyState';

	var load = function(src, fn){
		var script = document.createElement('script');
		script[onload] = script[onreadystatechange] = function(){
			if(!this[readyState] || re.test(this[readyState])){
				script[onload] = script[onreadystatechange] = null;
				fn && fn(script);
				script = null;
			}
		};
		script.async = true;
		script.src = src;
		scriptHead.insertBefore(script, firstScript);
	};
	window.sssl = function(srces, fn){
		if(typeof srces == 'string'){
			load(srces, fn);
			return;
		}
		var src = srces.shift();
		load(src, function(){
			if(srces.length){
				window.sssl(srces, fn);
			} else {
				fn && fn();
			}
		});
	};
})();


var stars = [],
		LOADED = false,
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    FPS = 10, // Frames per second
    NUM_STARS = WIDTH; // Number of stars

function setup() {
  createCanvas(WIDTH, HEIGHT);

  // Push stars to array
  for (var i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: 0,
      y: 0,
      offset: Math.random() * 360,
      // Weight orbit a little to be outside origin
      orbit: (Math.random()+0.01) * max(WIDTH, HEIGHT),
      radius: Math.random() * 2,
      vx: Math.floor(Math.random() * 10) - 5,
      vy: Math.floor(Math.random() * 10) - 5
    });
  }

	document.body.className += ' egg';

  frameRate(FPS);
  loop();
}

function draw() {
  background(24, 24, 24);
  push();
  noFill();
  colorMode(RGB, 255, 255, 255, 1);
  stroke(240,240,240, 1);
  strokeCap(ROUND);
  strokeWeight(2);
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
    ellipse(s.x, s.y, s.radius, 0);
  }
  pop();
  update();
}

function update() {
  var originX = WIDTH / 2;
  var originY = HEIGHT / 2;

  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];


    var rad = (frameCount * (1/(s.orbit*2 + s.offset)) + s.offset) % TAU;
    s.x = (originX + cos(rad)*(s.orbit*2));
    s.y = (originY + sin(rad)*(s.orbit));
  }
}

function windowResized() {
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    resizeCanvas(WIDTH, HEIGHT);
}


new Konami(function() {
	if (!LOADED) {
		LOADED = true;
		sssl(["https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.2/p5.min.js"])
	}
});
