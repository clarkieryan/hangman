(function(){

	var defaultSettings = {
		images: [

			{
				"url": "img/hangman/V1.png",
				position: {
					x: 60, 
					y: 20
				}
			},
			{
				"url": "img/hangman/V2.png",
				position: {
					x: 90, 
					y: 20
				}
			},
			{
				"url": "img/hangman/V3.png",
				position: {
					x: 0, 
					y: 0
				}
			},
			{
				"url": "img/hangman/V4.png",
				position: {
					x: 0, 
					y: 0
				}
			},
			{
				"url": "img/hangman/V5.png",
				position: {
					x: 0, 
					y: 0
				}
			},
			{
				"url": "img/hangman/V6.png",
				position: {
					x: 0, 
					y: 0
				}
			}
		]
	};

	var Character = function(){

		this._characterSprite = [];
		this._stage = new libs.pixi.Stage();
		this._sprites = [];

		this._addSprites();
	};

	Character.prototype._addSprites = function(){
		for(var i = 0; i < defaultSettings.images.length; i++){
			var image = defaultSettings.images[i];
			var sprite = libs.utils.createSprite(image.url);
			sprite.position.x = image.position.x;
			sprite.position.y = image.position.y;

			sprite.alpha = 0;
			this._sprites.push(sprite);
			this._stage.addChild(sprite);
		}
	}

	Character.prototype.getCharacter = function() {
		return this._stage;
	};

	Character.prototype.updateCharacter = function(level) {
		for(var i = 0; i < level; i++){
			this._sprites[i].alpha = 1;
		}
	};
	game.Character = Character;

})();