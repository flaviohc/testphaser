var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');

var group = craft.$g()
.$into(scope.layers.top);

var sprite = craft.$sprite('phaser')
.$set({
	x:game.width/2,
	y:game.height-30,
})
.$into(group)
.$mid()
// .$tint('#FF0000');

// sprite.update = function(){
// 	sprite.x=game.input.x;
// }
var dirmon=1;
var invaders = [];
var createInvader = function(init){
	var invader = craft.$circle({
		fill:'#00D8E0',
		size: 20,
	}).$set({
		x:(game.width/2)+init.x,
		y:80+init.y,
	});

	invader.die = function(){
		invader.pendingDestroy = true;
		_.pull(invaders,invader);
	}

	invaders.push(invader);

	//.$into(scope.layers.bot)
	var vel = 3;
	invader.update = function(){
		if(invader.x>=500+init.x+vel){
			dirmon=-1;
		}
		if(invader.x<=100+init.x-vel){
			dirmon=1;
		}
		invader.x+=vel*dirmon;
	}
}

_.each([
	{x:0,y:0},
	{x:50,y:0},
	{x:100,y:0},
	{x:-50,y:0},
	{x:100,y:50},
	{x:150,y:50},
	{x:200,y:50},
	{x:-250,y:50},
],function(val,i){
	createInvader(val);
})

var shoot = function(){
	var bullet = craft.$rect({
		fill:'#00D8E0',
		width:2,
		height:40,
	}).$set({
		x:sprite.x,
		y:game.height-20,
	})
	//.$into(scope.layers.bot)
	var vel = 10;
	bullet.update = function(){
		//bullet.x=sprite.x;
		bullet.y-=vel;

		if (bullet.y<=-50){
			bullet.pendingDestroy=true;
		}
		//if(utils.dist(bullet,invader)<=60){
			//die
		//}
		_.each(invaders,function(invader){
			if(!invader)return true;
			if(utils.dist(bullet,invader)<=20){
				invader.die();
				bullet.pendingDestroy=true;
			}
		})
	}

}


var stop = function(){
	sprite.update = function(){
		return false;
	}
}

var left = function(){
	sprite.update = function(){
		sprite.x-=3;
		if (sprite.x<=0){
			stop();
		}
	}
}

var right = function(){
	sprite.update = function(){
		sprite.x+=3;
		if (sprite.x>=game.width){
			stop();
		}
	}
}

var key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
key1.onDown.add(function(){
	shoot();
});

var leftkey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
leftkey.onDown.add(function(){
	left();
});
leftkey.onUp.add(function(){
	stop();
});

var rightkey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
rightkey.onDown.add(function(){
	right();
});
rightkey.onUp.add(function(){
	stop();
});
