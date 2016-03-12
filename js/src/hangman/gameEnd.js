(function(){

	var GameEnd = function(){


		libs.globalEventBus.addListener('game.end', this._onGameEnd.bind(this));

	};

	GameEnd.prototype._onGameEnd = function(win){
		if(win){
			alert('Congratulations you have won');
		} else {
			alert('You are out of lives');
		}

		//On close do something
	}

	game.GameEnd = GameEnd;

})(); 