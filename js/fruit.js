var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";

	for(var i=0;i<this.num;i++){
		this.alive[i] = true;
		this.x[i] = 0;
		this.y[i] = 0;
		this.born(i);
	}
}

fruitObj.prototype.draw = function(){
	for(var i=0;i<this.num;i++){
		if(this.l[i]<=10){
			this.l[i] += 0.01 * deltaTime;
		}
		ctx2.drawImage(this.orange,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
	}
}

fruitObj.prototype.born = function(i){
	var aneId = Math.floor(Math.random() * ane.num); //随机选取海葵
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.len[aneId];
	this.l[i] = 0;
}

fruitObj.prototype.update = function(){
	var num = 0;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			num++;
		}
	}
}