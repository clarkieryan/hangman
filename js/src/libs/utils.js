(function(){

	libs.utils = {
		createSprite: function(imagePath){
			var texture = libs.pixi.Texture.fromImage(imagePath);
			var sprite = new libs.pixi.Sprite(texture);
			return sprite;
		}, 
		addClickHandler: function(button, callback){
			button.interactive = true;
			button.buttonMode = true;
			button.mousedown = callback.bind(this);
		}
	};

})();