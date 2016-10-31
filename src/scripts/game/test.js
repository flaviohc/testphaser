var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {scope,game,craft} = require('./../main');

var group = craft.$g()
.$into(scope.layers.top);

//var sprite = craft.$sprite('b1')
// .$set({
// 	x:100,
// 	y:100
// })
// .$into(group)
// .$mid()
// // .$tint('#FF0000');
var text;

// var ball = craft.$circle({
// 	fill:'#00D8E0',
// 	size:50
// }).$set({
// 	x:120,
// 	y:120,

// })
// .$into(scope.layers.bot)



// .$into(scope.layers.bot)
var operation = "";
var styledis = { font: "bold 30px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
var styledispaux = { font: "bold 20px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
var number="";
var d=400;
var display = game.add.text(d, 200, number, styledis);
display.text="0";
var dispAux = game.add.text(300, 150, operation, styledispaux);
var op = "";
var op1 = "";
var op2 = "";
var point = "";
var result = "";
var calculate = {
	"plus":function(){result=n1+n2;},
	"minus":function(){result=n1-n2;},
	"mult":function(){result=n1*n2;},
	"div":function(){result=n1/n2;}
}
var buttonColor='#00D8E0';

var n1="";
var n2="";

var allOperators = function(o){
	if(op2=="="){
		number=result;
		op2="";
		n1=result;
	}else{
		number=number;
	}
	dispAux.text=number+o;
	display.text="0";
	display.x = d-display.width;
	dispAux.x = d-dispAux.width;
	number="";
	point="";
}

var numberClick = function(n){
	if(op2=="="){
		number="";
		op2="";
		dispAux.text="";
	}
	number=number+n;
	if (op1==""){
		n1=Number(number);
	}else{
		n2=Number(number);
	}
	console.log(n1);
	console.log(n2);
	display.text = number;
	display.x = d-display.width;
}
var plusClick = function(n){
	op="plus";
	op1="+";
	allOperators(op1);
	if(n2!=""){
		calculate[op]();
		dispAux.text=n1+op1+n2+"=";
		display.text=result;
	}
}
var minosClick = function(n){
	op="minus";
	op1="-";
	allOperators(op1);
}
var multClick = function(n){
	op="mult";
	op1="x";
	allOperators(op1);
}
var divClick = function(n){
	op="div";
	op1="/";
	allOperators(op1);
}
var pointClick = function(n){
	if(point==""){
		number=number+n;
		display.text=number;
	}
	console.log(point);
	point=n;
}
var equalClick = function(n){
	op2="="
	dispAux.text=n1+op1+n2+op2;
	calculate[op]();
	display.text=result;
	display.x = d-display.width;
	dispAux.x = d-dispAux.width;
	number="";
	point="";
	op1="";
}

_.each([
	{
		x:342,
		y:250,
		value:"+",
		func:function(){
			plusClick("+");
		}
	},
	{
		x:342,
		y:300,
		value:"-",
		func:function(){
			minosClick("-");
		}
	},
	{
		x:342,
		y:350,
		value:"x",
		func:function(){
			multClick("x");
		}
	},
	{
		x:342,
		y:400,
		value:"/",
		func:function(){
			divClick("/");
		}
	},
	{
		x:292,
		y:250,
		value:9,
		func:function(){
			numberClick(9);
		}
	},
	{
		x:242,
		y:250,
		value:8,
		func:function(){
			numberClick(8);
		}
	},
	{
		x:192,
		y:250,
		value:7,
		func:function(){
			numberClick(7);
		}
	},
	{
		x:292,
		y:300,
		value:6,
		func:function(){
			numberClick(6);
		}
	},
	{
		x:242,
		y:300,
		value:5,
		func:function(){
			numberClick(5);
		}
	},
	{
		x:192,
		y:300,
		value:4,
		func:function(){
			numberClick(4);
		}
	},
	{
		x:292,
		y:350,
		value:3,
		func:function(){
			numberClick(3);
		}
	},
	{
		x:242,
		y:350,
		value:2,
		func:function(){
			numberClick(2);
		}
	},
	{
		x:192,
		y:350,
		value:1,
		func:function(){
			numberClick(1);
		}
	},
	{
		x:292,
		y:400,
		value:3,
		func:function(){
			equalClick("=");
		}
	},
	{
		x:242,
		y:400,
		value:2,
		func:function(){
			pointClick(".");
		}
	},
	{
		x:192,
		y:400,
		value:1,
		func:function(){
			numberClick(0);
		}
	},
],function(val,i){
	var button = craft.$rect({
		fill:buttonColor,
		size:37
	}).$set({
		x:val.x,
		y:val.y,
	});

	utils.setBtn(button,function(){
		// numberClick(val.value)
		if(val.func) val.func();
	})
})

var n9 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:292,
	y:250,
})

var n8 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:242,
	y:250,
})

var n7 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:192,
	y:250,

})

var n6 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:292,
	y:300,
})

var n5 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:242,
	y:300,
})

var n4 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:192,
	y:300,
})

var n3 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:292,
	y:350,
})

var n2 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:242,
	y:350,
})

var n1 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:192,
	y:350,
})

var n0 = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:192,
	y:400,
})

var eq = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:292,
	y:400,

})
var po = craft.$rect({
	fill:buttonColor,
	size:37
}).$set({
	x:242,
	y:400,
})

var style = { font: "bold 30px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
var zero = "0";
var one = "1";
var two = "2";
var three = "3";
var four = "4";
var five = "5";
var six = "6";
var seven = "7";
var eight = "8";
var nine = "9";
var pnt = ".";
var equal = "=";
var plus = "+";
var min = "-";
var mult = "x";
var div = "/";
text = game.add.text(200, 400, zero, style);
text = game.add.text(250, 400, point, style);
text = game.add.text(300, 400, equal, style);
text = game.add.text(200, 350, one, style);
text = game.add.text(250, 350, two, style);
text = game.add.text(300, 350, three, style);
text = game.add.text(200, 300, four, style);
text = game.add.text(250, 300, five, style);
text = game.add.text(300, 300, six, style);
text = game.add.text(200, 250, seven, style);
text = game.add.text(250, 250, eight, style);
text = game.add.text(300, 250, nine, style);
text = game.add.text(350, 250, plus, style);
text = game.add.text(350, 300, min, style);
text = game.add.text(350, 350, mult, style);
text = game.add.text(350, 400, div, style);
