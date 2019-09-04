var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			console.log(ctx);


			// 页面加载完成获取并设置画布大小为浏览器可视范围
			c.width = window.innerWidth;
			c.height = window.innerHeight;
			// 浏览器大小改变是改变画布大小
			window.onresize = function() {
				c.width = window.innerWidth;
				c.height = window.innerHeight;
			}



			var arr = [];
			c.onmousemove = function(e) {
				// 鼠标移动一下就在鼠标位置画一个圆
				// var circle = new Circle({
				// 	x: e.offsetX,
				// 	y: e.offsetY,
				// 	r: 10
				// });
				// // 鼠标移动一次就向球球数组中push一个球
				// arr.push(circle);
				// circle.draw();
				
				// 鼠标移动时在鼠标位置画半径不同的4个圆
				for(var i = 1; i < 5; i++) {
					var circle = new Circle({
						x: e.offsetX,
						y: e.offsetY,
						r: 5 + 5*i
					});
					// 鼠标移动一次就向球球数组中push一个球
					arr.push(circle);
					circle.draw();
				}
			}


			// animation用来不停地检查球球数组arr中的球球数量以及位置透明度改变
			// 并将其画出来以达到移动的目的
			function animation() {
				ctx.clearRect(0,0,c.width,c.height); //清除旧位置的圆
				
				// 循环遍历圆对象数组改变圆心并重新绘制圆
				arr.forEach((item, i) => {
					
						item.x += item.vx;
						item.y += item.vy;
						item.a -= 0.01;  //透明度
						item.r -= 0.1;
						if(item.a < 0.05){
							arr.splice(i, 1); //删除已经消失的
						}
						item.draw();
				})
				requestAnimationFrame(animation);
				}
				animation();



				// 随机产生颜色rgb（0~255）值，调用三次即可得到一个颜色 
				function getColor() {
					var color = Math.floor(Math.random() * 256);
					return (color);
				}
				// 圆对象构造函数Circle
				function Circle(options) {
					var options = options || {};
					this.x = options.x || 100;
					this.y = options.y || 100;
					this.r = options.r || 50;
					
					this.vx = (Math.random() - 0.5) * 6; //随机产生正/负圆扩散速度
					this.vy = (Math.random() - 0.5) * 6;
					//随机颜色
					this.a = 1;
					this.color = 'rgba(' + getColor() + ',' + getColor() + ',' + getColor() + ','+'1)';
				}

				// 画一个圆
				Circle.prototype.draw = function() {
					ctx.beginPath();
					ctx.globalCompositeOperation = "lighter";
					ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
					ctx.globalAlpha=this.a;
					ctx.fillStyle = this.color;
					ctx.fill();
				}