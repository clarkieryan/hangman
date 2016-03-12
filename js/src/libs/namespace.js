(function(global){

	var pixi = require('pixi');
	var events = require('events');
	//Set up any namespacing we need to
	global.libs = {
		pixi: pixi,
		globalEventBus: new events.EventEmitter(),
		InputController: {}, 
		KeyboardInput: {}, 
		ClickInput: {}, 
		FileSystem: {},  
		Fireworks: {}, 
		Partical: {}
	};

	global.game = {
		hangman: {},  //Controls the main flow of the game && Intial Render Loop
		character: {} //Controls the drawing of the character animiation - Remove parts to be drawn based of a config file??
	};

})(window); 