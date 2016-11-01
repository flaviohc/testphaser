var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');

var group = craft.$g().$set({
	x:game.width/2,
	y:game.height/2,
})
.$into(scope.layers.top);

var group2 = craft.$g().$set({
	x:game.width/2,
	y:game.height/2,
})
.$into(scope.layers.top);

craft.$dot().$into(group);

var amount = 16;

// var Iletter = craft.$rect({
// 	fill:'#00D8E0',
// 	width:10,
// 	height:40,

// }).$set({
// 	x: 20,
// 	//y:game.height/2-alt/2,
// })
// var Oletter = craft.$circle({
// 	fill:'#00D8E0',
// 	size: 40,
// }).$set({
// 	x: 20,
// 	//y:game.height/2-alt/2,
// })
var letterO = function(){
	var group = craft.$g();
	var letterO_img = craft.$sprite('letO')
	.$set({
		x:5,
		y:20,
	}).$scale(0.8).$mid().$into(group)

	return group;
}

var letterI = function(){
	var Iletter = craft.$rect({
	fill:'#000000',
	width:13,
	height:44,
	})
	// .$set({
	// 	x: pos.x,
	// 	y: pos.y,
	// 	angle: angle+90,
	// 	alpha: 0.1,
	// })
	.$scale(1)
	// .$into(group)
	.$mid()

	return Iletter;
}

var letters = {};

_.times(amount,function(i){
	// console.log(i%2)
	var angle = i*(360/amount)+(-90);
	var pos = utils.radPos({
		x:0,
		y:0
	},angle,150); // O que significa esse 100?

	if(i%2==0){
		var letter = letterI().$set({
			x: pos.x,
			y: pos.y,
			angle: angle+90,
			alpha: 0.1,
		})
		.$into(group)
	}else{
		var letter = letterO().$set({
			x: pos.x,
			y: pos.y,
			angle: angle+90,
			alpha: 0.1,
		})
		.$into(group)
	}

	letter.id = i;
	letters[i]=letter;

	letter.show = function(){
		game.add.tween(letter)
		.to({
			alpha:1
		}, 800, Phaser.Easing.Quadratic.Out, true);
	}
	letter.hide = function(){
		game.add.tween(letter)
		.to({
			alpha:0.1
		}, 800, Phaser.Easing.Quadratic.Out, true);
	}

})


var t = 0;
game.time.events.loop(1000, function(){
	game.add.tween(group)
	.to({
		angle: "+"+String(360/amount),
	}, 800, Phaser.Easing.Back.Out, true);
	//console.log(t%amount)

	//group.Iletter{id:t$amout}.set({alpha:1});
	console.log(t%amount);

	var f = amount-t%amount;
	if (f==16){
		f=0;
	}

	letters[amount-1-t%amount].show();
	letters[f].hide();
	t++;
})

var sprite = craft.$sprite('tick')
.$set({
	x:335,
	y:27,
}).$scale(0.8)


// var ball = craft.$circle({
// 	fill:'#00D8E0',
// 	size:50
// }).$set({
// 	x:120,
// 	y:120,
// })
// .$into(scope.layers.bot)


//_.times
//utils.radPos
