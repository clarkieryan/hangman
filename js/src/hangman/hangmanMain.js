require('./gameEnd');

(function(){

	var Character = require('./character');

	var letterString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var defaultSettings = {
		letters: letterString.split(''), 
		defaultLevel: 0,
		textPosition: {
			x: 20, 
			y: 270
		}, 
		outputTextPosition: {
			x: 20, 
			y: 220
		},
		totalFailedAttempts: 7
	};

	var words = require('../data/words.json'); 

	var HangmanMain = function(){

		this._stage = new libs.pixi.Stage();

		this._letterButtons = []
		this._usedLetters = [];

		this._background = libs.utils.createSprite("img/hangman/bg.jpg");
		this._stage.addChild(this._background);

		this._state = {
			level: 0, 
			failedAttempts: 0
		}

		this._character = new game.Character();

		this._stage.addChild(this._character.getCharacter());

		this._currentWord = null;
		this._isActive = false;

		this._createLetterButtons();

		this._gameEnd = new game.GameEnd();

		this._outputText = new libs.pixi.Text("ddd", {font: "35px Arial Bold", align: "left", "fill": "white"});
		this._outputText.position.x = defaultSettings.outputTextPosition.x; 
		this._outputText.position.y = defaultSettings.outputTextPosition.y; 

		this._stage.addChild(this._outputText);

		libs.globalEventBus.addListener('game.startGame', this._onStartGame.bind(this));
		libs.globalEventBus.addListener('game.end', this._onGameEnd.bind(this));

	};

	/**
	 * Create the buttons for the letters - when clicked fire a call back for an action
	 * @return {[type]} [description]
	 */
	HangmanMain.prototype._createLetterButtons = function(){
		var position = {
			x: defaultSettings.textPosition.x, 
			y: defaultSettings.textPosition.y
		};

		for(var i = 0; i < defaultSettings.letters.length; i++){
			var letter = defaultSettings.letters[i];
			var text = new libs.pixi.Text(letter, {font: "35px Arial Bold", align: "left", "fill": "white"});
			
			text.position.x = position.x;
			text.position.y = position.y;
			position.x += 40;

			if((i + 1) % 7 === 0 && i !== 0){
				position.x = defaultSettings.textPosition.x;
				position.y += 40
			}

			libs.utils.addClickHandler(text, this._letterClickHandler.bind(this, letter));
			this._letterButtons.push(text);
			this._stage.addChild(text);		
		}
	};

	/**
	 * Starts the main game once the game has been played
	 * @return {[type]} [description]
	 */
	HangmanMain.prototype._onStartGame = function() {
		//Get the level off difficulty
		
		this._isActive = true;

		this._currentWord = this._getRandomword();
		this._wordString = this._currentWord.replace(/[^0-9]/g, "_");
		this._outputText.setText(this._wordString);
		libs.globalEventBus.emit('libs.updateStage', this._stage);
	};

	/**
	 * Whenever we get some letter do some checks and allow the items to work.
	 * @param  {[type]} letter [description]
	 * @return {[type]}        [description]
	 */
	HangmanMain.prototype._letterClickHandler = function(letter) {
		if(this._isActive){
			letter = letter.toLowerCase();

			//Check if the letter has already been selected
			if(this._usedLetters.indexOf(letter) === -1){
				//Find the letter and hide it.
				var sprite = this._letterButtons[letterString.indexOf(letter.toUpperCase())];
				sprite.alpha = 0.5;
				this._usedLetters.push(letter);

				//If it's a letter in the word then update the on screen word
				if(this._currentWord.indexOf(letter) > -1 ){
					this._updateWord(letter);
					
					if(this._wordString.indexOf('_') === -1){
						libs.globalEventBus.emit('game.end', true);
					}

				} else {
					
					if(this._state.failedAttempts < defaultSettings.totalFailedAttempts){
						this._state.failedAttempts += 1;
						this._character.updateCharacter(this._state.failedAttempts);

						if(this._state.failedAttempts === defaultSettings.totalFailedAttempts){
							libs.globalEventBus.emit('game.end', false);
						}	
					}

				}
			}
		}
	};


	/**
	 * Get's a random word based off the current level from the words.json file. 
	 * @return {[type]} [description]
	 */
	HangmanMain.prototype._getRandomword = function(){
		var levelWords = words["levels"][this._state.level]
		return levelWords[Math.floor(Math.random()*levelWords.length)]; 
	};

	/**
	 * Updates the word printed on the screen
	 * @param  {[type]} letter [description]
	 * @return {[type]}        [description]
	 */
	HangmanMain.prototype._updateWord = function(letter){

		for(var i = 0; i < this._currentWord.length; i++){
			if(this._currentWord[i] === letter){
				this._wordString = this._replaceAt(this._wordString, i, letter);
			}
		}
		this._outputText.setText(this._wordString);

	};

	HangmanMain.prototype._onGameEnd = function(win){

		this._isActive = false;

		if(win){
			this._outputText.setText('Congratulations you have won')
		} else {
			this._outputText.setText('Sorry no more lives');
		}
	};

	/**
	 * Replaces a character at a certain position in the string.
	 * @param  {[type]} string    [description]
	 * @param  {[type]} index     [description]
	 * @param  {[type]} character [description]
	 * @return {[type]}           [description]
	 */
	HangmanMain.prototype._replaceAt = function(string, index, character) {
		return string.substr(0, index) + character + string.substr(index+character.length);
	};

	game.HangmanMain = HangmanMain;


})();
