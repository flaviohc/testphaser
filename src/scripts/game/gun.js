var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');

var gun = scope.gun = craft.$rect({
	fill:'#000000',
	width:3,
	height:30
}).$set({
	x:game.width/2,
	y:game.height/2,
})
.$mid();
gun.update = function() {
	var angle = utils.angleBetweenRad(gun,game.input);
	gun.angle = angle-90;
};

var ball = craft.$circle({
	fill:'#00D8E0',
	size:25
}).$set({
	x:game.width/2,
	y:game.height/2,
})
.$mid();

var life=100;
var maxLife=100;
var lifeWidth = 60;

var lifeCont = craft.$rect({
	fill:'#000000',
	width:70,
	height:20
}).$set({
	x: 300,
	y: 30,
})
.$mid();

var lifeBar = craft.$rect({
	fill:'#FF0000',
	width:60,
	height:10
}).$set({
	x: 305,
	y: 35,
})
.$mid();

var loseLife = scope.loseLife = function(){
	var dmg = 20;
	// var newLife = Number((life-dmg).toFixed(2));
	if (life-dmg<=0){
		life=0;
		_.each(scope.Zombies,function(zombie){
			if(!zombie)return true;
			zombie.update = function(){};
			scope.respawn.destroy();

		})
	} else {
		life-=dmg;
	}
	console.log(life);
	lifeBar.width=(life/maxLife)*lifeWidth;
}


var shoot = scope.shoot = function(){

	var bullet = craft.$circle({
		fill:'#00D8E0',
		size:5,
	}).$set({
		x: game.width/2,
		y: game.height/2,
	})
	var angle = utils.angleBetweenRad(game.input,scope.gun)+180;
	bullet.update = function(){
		var pos = utils.radPos({
			x:bullet.x,
			y:bullet.y
		},angle,5)
		bullet.x=pos.x;
		bullet.y=pos.y;
		_.each(scope.Zombies,function(zombie){
			if(!zombie)return true;
			if(utils.dist(bullet,zombie)<=20){
				zombie.die();
				bullet.pendingDestroy=true;
			}
		})
	}
}
