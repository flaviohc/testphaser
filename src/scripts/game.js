var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./main');

module.exports = function(){
	var state = {};

	state.init = function(){
	}

	state.preload = function(){
		game.stage.disableVisibilityChange = false;
		game.stage.backgroundColor = '#fff';
		game.load.start();
	}

	state.create = function(){
		require('./game/layers');
		require('./game/zombie');
		require('./game/gun');
		require('./game/controler');
	}

	return state;
}
