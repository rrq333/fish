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

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];

var data;

var wave; //大鱼波纹
var halo;//大鱼碰撞小鱼波纹
var dust; //漂浮物

var dustPic = [];

var momBodyOra = [];
var momBodyBlue = [];

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

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

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

	for(var i=0;i<8;i++){
		babyTail[i] = new Image();
		babyTail[i].src = "img/babyTail"+i+".png";
	}

	for(var i=0;i<2;i++){
		babyEye[i] = new Image();
		babyEye[i].src = "img/babyEye"+i+".png";
	}

	for(var i=0;i<20;i++){
		babyBody[i] = new Image();
		babyBody[i].src="img/babyFade"+i+".png";
	}

	for(var i=0;i<8;i++){
		momTail[i] = new Image();
		momTail[i].src = "img/bigTail"+i+".png";
	}

	for(var i=0;i<2;i++){
		momEye[i] = new Image();
		momEye[i].src = "img/bigEye"+i+".png";
	}

	data = new dataObj();

	for(var i=0;i<8;i++){
		momBodyOra[i] = new Image();
		momBodyOra[i].src="img/bigSwim"+i+".png";
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = "img/bigSwimBlue"+i+".png";
	}

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i=0;i<7;i++){
		dustPic[i] = new Image();
		dustPic[i].src = "img/dust"+i+".png";
	}
	dust = new dustObj();
	dust.init();
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

	momFruitsCollision();
	momBabyCollision();

	baby.draw();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}