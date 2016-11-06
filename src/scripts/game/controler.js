var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');

var square = scope.square = craft.$rect({
	fill:"#0FF345",
	height:game.height,
	width:game.width,
}).$set({
	alpha:0,
});

utils.setBtn(square,function(){
	scope.shoot();
});
