(function(){
	
	var cwidth = window.innerWidth;
	var cheight = window.innerHeight;
	// 获取canvas元素并设置宽高
	var mycanvas = document.getElementById("mycanvas");
	
	window.onresize = function(){
		mycanvas.width = window.innerWidth;
		mycanvas.height = window.innerHeight;
		c.clearRect(0,0,cwidth,cheight); //清除旧位置的圆
	}
	mycanvas.width = window.innerWidth;
	mycanvas.height = window.innerHeight;
	
	// 创建context对象
	var c = mycanvas.getContext('2d');
	
	
	function Line(){  //线条对象构造函数
		this.width = Math.round(Math.random()*2)+1; //随机生成线宽最大为8,最小为2
		this.startx = -Math.round(Math.random()*3000); //初始x坐标
		this.starty = -Math.round(Math.random()*1600);//初始y坐标
		
		// 随机颜色
		this.color = 'rgba('+Math.floor(Math.random()*256)
		+','+Math.floor(Math.random()*256)+','+
		Math.floor(Math.random()*256)+','+Math.round(Math.random()*10-5)/10+')'
	}
	
	Line.prototype.draw = function(){
		
		
		
		// 绘制线条
		c.beginPath();
		c.moveTo(this.startx+400,this.starty+300);//终点,注意,顺序不能换
		c.lineTo(this.startx,this.starty);  //起点
		var gnt1 = c.createLinearGradient(this.startx,this.starty,this.startx+400,this.starty+300);//线性渐变的起止坐标
		gnt1.addColorStop(0,'transparent');//创建渐变的开始颜色，0表示偏移量，
		// 个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
		gnt1.addColorStop(1,this.color);
		c.lineWidth=this.width;
		c.strokeStyle = gnt1;
		c.stroke();
	}
	
	// 一次画6条线并画出创建好的线
	
	var arr = [];
	
	for(var i = 0; i < 6; i++){
		var item = new Line();
		arr.push(item)
		item.draw()
	}
	
	setInterval(move,20)
	
	function move(){
		var item = new Line();
		arr.push(item)
		c.clearRect(0,0,cwidth,cheight); //清除旧位置的圆
		arr.forEach((item,i)=>{
			item.startx += 13;
			item.starty += 10;
			if(item.starty > cheight ){
				arr.splice(i,1);
			}
			item.draw()
		})
	}
	
})();