(function(){

	'use strict';

	var defaultSettings = {
		playButton: {
			x: 70, 
			y: 290
		}
	}

	var EntryScreen = function(){

		this._stage = new libs.pixi.Stage(null, true);

		this._addImages();
		this._addButtons();

		libs.globalEventBus.addListener('game.loaded', this._onGameLoaded.bind(this));
	};

	EntryScreen.prototype._addImages = function() {
		var background = libs.utils.createSprite("img/hangman/hangman-intro.png");
		this._stage.addChild(background);
	};

	EntryScreen.prototype._addButtons = function(){
		var playButton = libs.utils.createSprite("img/hangman/play-button.png");
		libs.utils.addClickHandler(playButton, this._onPlayButtonClick.bind(this));

		playButton.position.x = defaultSettings.playButton.x;
		playButton.position.y = defaultSettings.playButton.y;


		this._stage.addChild(playButton);
	};

	EntryScreen.prototype._onGameLoaded = function() {
		libs.globalEventBus.emit('libs.updateStage', this._stage);
	};

	EntryScreen.prototype._onPlayButtonClick = function() {
		libs.globalEventBus.emit('game.startGame');
	};

	game.EntryScreen = EntryScreen;


})();