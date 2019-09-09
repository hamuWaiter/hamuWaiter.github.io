window.onload = function() {
	//1. 获取所有图片
	var aImg = document.getElementsByClassName("bgimg"),
		swiper = document.getElementById("swiper"),
		tab = document.querySelectorAll(".tabbar li"),
		play = document.querySelector(".play"),
		len = aImg.length, //页面个数
		maxWidth = swiper.offsetWidth,
		aWidth = window.innerWidth, //屏幕宽度
		aHeight = window.innerHeight;
		
		console.log(len)
		
	//2. 页面加载完成检测屏幕宽高并赋值给所有图片
	
	window.onresize = setSize;
	
	function setSize() {
		aWidth = window.innerWidth; //屏幕宽度
		aHeight = window.innerHeight;
		for (var i = 0; i < len; i++) {
	
			aImg[i].style.width = aWidth + "px";
			aImg[i].style.height = aHeight + "px";
	
		}
	}
	setSize();
	
	
	//重新开始播放 
	play.onclick = function() {
		this.style.display = "none";
		timer = setInterval(move,4000);
	}
	
		
	// 设置轮播从哪里开始（初始位置）
	var idx = 7;
	tab[idx-1].style.backgroundColor = "rgba(255,0,0,.4)";
	swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
		
		
		
	// 5.拖动swiper进行上/下一张切换
	var left = -idx*aWidth;  //获取其实值起始值
	
	
	document.onmousedown = function(e){
		
		clearInterval(timer);
		play.style.display = "block";
		
		var oldX = e.clientX,
			newX = 0,
			addedX = 0, //每次mousemove的增量
			moved = 0;  //用于记录本次拖动的距离
			
			this.onmousemove = function(e){
				newX = e.clientX;
				addedX = newX - oldX;
				
				moved += addedX;
				left += addedX;
				
				swiper.style.transform ="translateX("+left+"px)";
				oldX = newX;
			}
			
			
			
			this.onmouseup = function(e) { //松开鼠标
				
				
				if(Math.abs(moved) > 0.5*aWidth && moved < 0)  //向左拖动（下一页）
				{
					
					
					if(idx == 7){   //边界条件
					
						tab[6].style.backgroundColor = "rgba(255,255,255,.2)";
						
						swiper.style.transform ="translateX(-"+8*aWidth+"px)";
						swiper.style.transition = "transform 1s ease";
						console.log(aLi[8])
						tab[0].style.backgroundColor = "rgba(255,0,0,.4)";
						// 最后一张过渡完成就在一瞬间将swiper定位到第一张的位置
						swiper.addEventListener('transitionend', function handel() {
							// 注意,这里的处理函数要用实名函数,否则此事件监听无法移除
							idx = 1;
							swiper.style.transition = "none";
							swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
							aLi[0].click();  //文本出现
							left = -idx*aWidth; //更新拖动起始位置
							// 移除过渡监听
							swiper.removeEventListener("transitionend", handel)
						})
						
					}else{
						init(idx-1);//复位上一次的文字
						tab[idx-1].style.backgroundColor = "rgba(255,255,255,.2)";
						
						idx = idx+1;  //下一页
						aLi[idx-1].click();//文本出现
						tab[idx-1].style.backgroundColor = "rgba(255,0,0,.4)";  //高亮
						
						swiper.style.transform ="translateX(-"+idx*aWidth+"px)";
						swiper.style.transition = "transform 1s ease";
						left = -idx*aWidth; //更新拖动起始位置
					}
					
					
				}else if(Math.abs(moved) > 0.5*aWidth && moved > 0)  //向右拖动（上一页）
				{
					// idx = idx-1;  //上一页
					
					
					if(idx == 1){
						
						tab[0].style.backgroundColor = "rgba(255,255,255,.2)";
						
						swiper.style.transform ="translateX(-"+ 0*aWidth +"px)";
						swiper.style.transition = "transform 1s ease";
						tab[6].style.backgroundColor = "rgba(255,0,0,.4)";
								
						// 最后一张过渡完成就在一瞬间将swiper定位到第一张的位置
						swiper.addEventListener('transitionend', function handel() {
							// 注意,这里的处理函数要用实名函数,否则此事件监听无法移除
							idx = 7;
							swiper.style.transition = "none";
							swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
							aLi[6].click();//文本出现
							left = -idx*aWidth; //更新拖动起始位置
							// 移除过渡监听
							swiper.removeEventListener("transitionend", handel)
						})
					}else{
						
						init(idx-1);  //复位上一次的文字
						tab[idx-1].style.backgroundColor = "rgba(255,255,255,.2)";
						
						idx = idx-1;  //上一页
						aLi[idx-1].click();//文本出现
						tab[idx-1].style.backgroundColor = "rgba(255,0,0,.4)";  //高亮
						
						swiper.style.transform ="translateX(-"+idx*aWidth+"px)";
						swiper.style.transition = "transform 1s ease";
						left = -idx*aWidth; //更新拖动起始位置
					}
					
					
				}else{//回到原位置
					swiper.style.transform ="translateX(-"+idx*aWidth+"px)";
					swiper.style.transition = "transform 1s ease";
					left = -idx*aWidth; //并将left还原到之前的位置
				}
				
				this.onmousemove=null;
			}
	}
	
	
	//3. 轮播部分

	
	var timer = setInterval(move, 4000);
	
	function move() {  //开启定时器
		
		init(idx-1);  //将上一次的文本隐藏
			
			// 清除上一个tabbar的样式
			
		tab[idx-1].style.backgroundColor = "rgba(255,255,255,.2)";
		
		idx++;
		
		left = -idx*aWidth;  //每次轮播都更新拖动的其实位置
		
		if (idx < len - 1) {
			swiper.style.transition = "transform 1s ease";
			swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
			tab[idx-1].click()  //文本显示(tabbar跟随变化宝行在其中)
	
		} else{
	
			swiper.style.transition = "transform 1s ease";
			swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
			tab[0].style.backgroundColor = "rgba(255,0,0,.4)";
	
			// 最后一张过渡完成就在一瞬间将swiper定位到第一张的位置
			swiper.addEventListener('transitionend', function handel() {
				// 注意,这里的处理函数要用实名函数,否则此事件监听无法移除
				idx = 1;
				swiper.style.transition = "none";
				swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
				aLi[0].click();  //让文本显示出来
				
				// 移除过渡监听
				swiper.removeEventListener("transitionend", handel)
			})
		}
	}



	// 4.tabbar部分
	for (let i = 0; i < len - 2; i++) {
		
		
		tab[i].index = i+1;  //第一个tab栏对应第二张轮播图
		
		tab[i].onclick = function() {
			
			init(idx-1);  //将上一次的文本隐藏
			// 清除上一个tabbar样式
			tab[idx-1].style.backgroundColor = "rgba(255,255,255,.2)";
			// 这里idx表示轮播图中的序号
			idx = this.index;
			
			aLi[idx-1].click()  //文本显示
			
			// 更改这一次tabbar样式
			tab[idx-1].style.backgroundColor = "rgba(255,0,0,.4)";
			
			// 更改这一次swiper的位置
			
			swiper.style.transition = "transform 1s ease";
			swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
			
			
			
		if (idx == 5) {
				// 当翻到第五页时让魔法阵动画出来（最好使用局部变量以防冲突）
				var works = document.querySelectorAll(".carousel li"),
					len = works.length,
					deg = 360 / len;
					
				for (var i = 0; i < len; i++) {
					works[i].style.transform = "rotateY(" + i * deg + "deg) translateZ(400px) ";
					works[i].style.transitionDelay = (len - i) * 0.1 + "s";
					works[i].style.opacity = 1;
				}
			}

		}
	}
}
