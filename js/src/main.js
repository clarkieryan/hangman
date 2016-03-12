//Require all of the modules we need
require('./libs/namespace');
require('./libs/utils');
require('./hangman/entryScreen');
require('./hangman/hangmanMain');
// require('./character');


(function(){


	var Main = function(){

		//Instantiate what classes we need to - 
		//Create any local variables score etc. 

		//Any class variables
		this.state = {};

		this._renderer = null;
		this._baseStage = null;

		this._initDrawing();

		this._addBackground();

		requestAnimationFrame(this._animLoop.bind(this));


		this._entryScreen = new game.EntryScreen();
		this._hangmanMain = new game.HangmanMain();


		//Let the other classes know we have finished loading the canvas and can start drawing.
		libs.globalEventBus.addListener('libs.updateStage', this._updateStage.bind(this));

		libs.globalEventBus.emit('game.loaded');
	};


	Main.prototype._initDrawing = function() {
		this._renderer = new libs.pixi.WebGLRenderer(310, 450);
		document.body.appendChild(this._renderer.view);

		this._baseStage = new libs.pixi.Stage();
	};


	Main.prototype._addBackground = function() {
		var background = new libs.utils.createSprite("img/hangman/bg.jpg");
		this._baseStage.addChild(background);

		this._updateStage();
	};

	Main.prototype._updateStage = function(stage){
		if(stage){
			this._currentStage = stage;
		} else {
			this._currentStage = this._baseStage;
		}
	}

	Main.prototype._animLoop = function() {
		this._renderer.render(this._currentStage);
		requestAnimationFrame(this._animLoop.bind(this));
	};


	game.hangman.Main = Main;

})();

//When the document is ready kick off the game
document.addEventListener("DOMContentLoaded", function(event) { 
	var  hangman = new game.hangman.Main();
});