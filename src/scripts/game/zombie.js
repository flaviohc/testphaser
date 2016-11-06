var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');


var amount = 10;
var distance = 300;
var angle = 120;
var Zombies = scope.Zombies = [];

var createZombie = scope.createZombie = function(){
	var zombie = scope.zombie;
	var quad = _.random(1,4);
	switch (quad){
		case 1:
			zombie = craft.$sprite('phaser').$set({
				x:-50,
				y:_.random(-50,game.height+50)
			}).$mid();
		break;
		case 2:
			zombie = craft.$sprite('phaser').$set({
				x:_.random(-50,game.width+50),
				y:-50
			}).$mid();
		break;
		case 3:
			zombie = craft.$sprite('phaser').$set({
				x:game.width+50,
				y:_.random(-50,game.height+50)
			}).$mid();
		break;
		case 4:
			zombie = craft.$sprite('phaser').$set({
				x:_.random(-50,game.width+50),
				y:game.height+50
			}).$mid();
		break;
	}


	zombie.die = function(){
		zombie.pendingDestroy = true;
		_.pull(Zombies,zombie);
	}

	Zombies.push(zombie);

	zombie.update = function(){
		var angle = utils.angleBetweenRad(zombie,scope.gun);
		var pos = utils.radPos({
			x:zombie.x,
			y:zombie.y
		},angle,1)
		zombie.x=pos.x;
		zombie.y=pos.y;
		if (utils.dist(zombie,scope.gun)<=30){
			zombie.pendingDestroy=true;
			scope.loseLife();
		}
	}
}

var t=1000;
scope.respawn = game.time.create(false);
scope.respawn.start();

scope.respawn.loop(t, function(){
		createZombie();
});
// scope.respawn.destroy();
