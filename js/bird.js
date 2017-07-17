window.onload=function(){
	var out=document.querySelector('.out');
	var outCylider=document.querySelector('.outCylider');
	var outCylider2=document.querySelector('.outCylider2');
	//******定义小鸟类
	function Bird(timer,die){
		this.domBird=document.querySelector('.ball');
		this._height=this.domBird.parentNode.offsetHeight-this.domBird.offsetTop-this.domBird.offsetHeight;
		this.timer=timer;
		this.die=die;
	}
	Bird.prototype.flyUp=function(){//小鸟向上飞
		var oldHeight=this._height;//用来记录小鸟每次点击时飞到了多高;
		var _this=this;
		clearInterval(this.timer);
		this.timer=setInterval(moveU,1);
		function moveU(){
			_this._height+=1;
			if(_this._height-oldHeight>=60){
				clearInterval(_this.timer);	
				_this.flyDown();
			}
			_this.domBird.style.bottom=_this._height+"px";
		}
	}
	Bird.prototype.flyDown=function(){//小鸟向下飞
		var t=0;
		var h=0;
		var _this=this;
		clearInterval(this.timer);
		this.timer=setInterval(moveD,1000/60);
		function moveD(){
			t++;
			h=0.01*t*t/2;//模仿h=g*t*t/2自由落体运动g设为0.01
			_this._height=_this._height-h;
			if(_this._height<=0){
				_this._height=0;
				t=0;
				h=0;
				clearInterval(_this.timer);
			}
			_this.domBird.style.bottom=_this._height+"px";
		}
	}
	//**********定义水管类
	function Pipe(obj){
		this.obj=obj;
		this._left=obj.offsetLeft;
		this._height=obj.children[1].offsetHeight;//获取下边水管的高度用来小鸟的高度比较
	}
	Pipe.prototype.changeHeight=function(){//改变水管之间的间隔
		var firstChild=this.obj.children[0];
		var lastChild=this.obj.children[1];
		var random=Math.round(Math.random()*150+110);
		firstChild.style.height=random+"px";
		lastChild.style.height=500-130-random+"px";
		firstChild.style.backgroundPositionY=random-450+"px";
		this._height=500-130-random;
	}
	function runControl(){//运行控制
	 	pipe1.changeHeight();
	 	pipe2.changeHeight();
	 	bird.flyDown();
	 	var timer=null;
	 	var grade=document.querySelector('.score');
	 	var score=0;
	 	timer=setInterval(move,1);
	 	function move(){
	 		if(isCollision(pipe1)||isCollision(pipe2)){
	 			stop(timer);
	 		}
	 		else{
	 			if(pipe1._left==40&&bird.die==false){
				score++;
				grade.innerHTML=score;
			}
			else if(pipe2._left==40&&bird.die==false){
				score++;
				grade.innerHTML=score;
			}
		 		if(pipe1._left<-30){
		 			pipe1.changeHeight();
					pipe1.obj.style.left=430+"px";
					pipe1._left=pipe1.obj.offsetLeft;
		 		}
		 		else if(pipe2._left<-30){
		 			pipe2.changeHeight();
					pipe2.obj.style.left=430+"px";
					pipe2._left=pipe2.obj.offsetLeft;
		 		}
		 		else{
		 			pipe1.obj.style.left=pipe1._left+"px";
		 			pipe2.obj.style.left=pipe2._left+"px";
		 			pipe1._left--;
		 			pipe2._left--;
				}	
	 		}
	 	}
	 }
	function stop(timer){
	 			clearInterval(bird.timer);
	 			clearInterval(timer);
	 			bird.die=true;
	 }
	function isCollision(pipe){//碰撞检测
	 	if(pipe._left==100){
	 		if(bird._height<=pipe._height||bird._height+22>=pipe._height+130){
	 			return true;
	 		}
	 	}
	 	else if(pipe._left>=40&&pipe._left<100){
	 			if(bird._height+22>=pipe._height+130||bird._height<=pipe._height){
	 				return true;
	 			}
	 	}
	 }
	out.onclick=function(){
		if(bird.die==false){
			clearInterval(bird.timer);
			bird.flyUp();
		}
	}
	var bird=new Bird(null,false);//实例化小鸟对象
	var pipe1=new Pipe(outCylider);//实例化水管对象1
	var pipe2=new Pipe(outCylider2);//实例化水管对象2
	runControl();//全局控制函数
}
