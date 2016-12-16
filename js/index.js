var can1,can2,ctx1,ctx2;
var lastTime; //上一帧执行时间
var deltaTime; //两帧之间间隔差

var bgPic = new Image();

var canWidth,canHeight;

var ane; //海葵
var fruit; //果实
var mom; //大鱼
var baby; //小鱼

var mx,my; //鼠标坐标

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

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src="img/background.jpg";
	canWidth = 800;
	canHeight = 600;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;
}

function gameloop(){
	requestAnimFrame(gameloop); //commonFunction.js中的缓动函数
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime>40) deltaTime = 40;

	drawBackground();
	ane.draw(); //绘制海葵
	fruitMonitor();
	fruit.draw(); //绘制果实

	ctx1.clearRect(0,0,canWidth,canHeight); //清空画布
	mom.draw();

	Collision();

	baby.draw();
}

function onMouseMove(e){
	if(e.offSetX || e.layerX){
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
}