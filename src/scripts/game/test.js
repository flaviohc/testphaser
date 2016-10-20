var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');

var group = craft.$g()
.$set({
	x: 300,
	y: 200,
})
.$into(scope.layers.top);

var alt = 100;

var raq = craft.$rect({
	fill:'#00D8E0',
	width:10,
	height:alt,

}).$set({
	x: 20,
	//y:game.height/2-alt/2,
})

var raq2 = craft.$rect({
	fill:'#00D8E0',
	width:10,
	height:alt,

}).$set({

	x:game.width-20,
	y:game.height/2-alt/2,
})
//.$into(group)

raq.pivot.y=alt/2;
raq2.pivot.y=alt/2;

var sprite = craft.$sprite('phaser')
.$set({
	x:150,
	y:100,
})
// .$into(group)
.$mid()

// stage size
// game.width
// game.height


// mouse cord
// game.input.x
// game.input.y
var diry=1;
var dirx=1;
sprite.update = function(){
	sprite.x+=5*dirx;
	sprite.y+=5*diry;
	if (sprite.y>=game.height){
		diry=-1;
	}
	if (sprite.y<=0){
		diry=1;
	}
	if(sprite.x==game.width-20){
		if (sprite.y>=game.input.y-alt/2 && sprite.y<=game.input.y+alt/2){
			dirx=-1;
		}
	}
	if(sprite.x==20){
		if (sprite.y>=raq.y-alt/2 && sprite.y<=raq.y+alt/2){
			dirx=1;
		}
	}
	if (sprite.x>=game.width){
		sprite.pendingDestroy=true;
	}
}

raq.update = function(){
	raq.y=sprite.y;
}

raq2.update = function(){
	raq2.y=game.input.y;
}

//game.add.tween(group).to({ y: -28 }, 2500, Phaser.Easing.Sinusoidal.InOut, true, 1000, 1000, false);
//game.add.tween(group).to({ x: -100 }, 2500, Phaser.Easing.Sinusoidal.InOut, true, 1000, 1000, false);
//game.add.tween(ball).to({ y: 300 }, 2500, Phaser.Easing.Sinusoidal.InOut, true, 1000, 1000, false);
//console.log(abc);
// .$tint('#FF0000');


