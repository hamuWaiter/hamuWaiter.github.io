// onload是等所有的资源文件加载完毕以后再绑定事件
		window.onload = function(){
			
			// 可视区域高度
			var w = window.innerWidth;
			// 获取图片列表，即img标签列表
			// var imgs = document.querySelectorAll(".lazy");  //所有的图片并初始化高度
			var aImg = document.getElementsByClassName("lazy");
		
			// 获取到浏览器顶部的距离
			function getTop(ele){
				return ele.getBoundingClientRect().left;
			}
		
			// 懒加载实现
			function lazyload(imgs){
				//滚动区域高度
				var s = document.documentElement.scrollTop || document.body.scrollTop;
				for(var i=0;i<aImg.length;i++){
					//图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
					if (getTop(aImg[i]) < w) {
						// 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
						(function(i){
							setTimeout(function(){
								// 不加立即执行函数i会等于9
								// 隐形加载图片或其他资源，
								//创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
								var temp = new Image();
								temp.src = aImg[i].getAttribute('data-src');//只会请求一次
								// onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
								temp.onload = function(){
									// 获取自定义属性data-src，用真图片替换假图片
									aImg[i].src = aImg[i].getAttribute('data-src')
								}
							},2000)
						})(i)
					}
				}
			}
			lazyload(aImg);
		
			// 滚屏函数
			window.onscroll =function(){
				lazyload(aImg);
			}
		}