var can1,can2,ctx1,ctx2;
var lastTime; //上一帧执行时间
var deltaTime; //两帧之间间隔差

var bgPic = new Image();

var canWidth,canHeight;

var ane; //海葵
var fruit; //果实

$(function(){
	game();
})

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	// 获得context
	can1 = document.getElementById('canvas1'); //fishes, dust, UI,circle 前面一层
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2'); //background, ane ,fruits 后面一层
	ctx2 = can2.getContext('2d');

	bgPic.src="img/background.jpg";
	canWidth = 800;
	canHeight = 600;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();
}

function gameloop(){
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	drawBackground();
	ane.draw(); //绘制海葵
	fruit.draw(); //绘制果实
}