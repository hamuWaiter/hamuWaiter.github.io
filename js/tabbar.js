var tips = document.querySelector(".tips"); //获取提示框
			
			var tabbar = document.querySelectorAll(".tabbar li"); //tabbar
			var aLi = document.querySelectorAll(".swiper .item"); //所有的盒子
			var text = document.querySelectorAll(".swiper .content"); //所有的盒子
			var title = document.querySelectorAll(".swiper .content h3"); //所有标题
			var p1 = document.querySelectorAll(".swiper .content .p1"); //所有文本(第一段)
			var p2 = document.querySelectorAll(".swiper .content .p2"); //所有文本(第二行)
			var btn = document.querySelectorAll(".swiper .content button");
			
			
			// 提示框相关
			function show(flag){
				if(flag){
					console.log("show")
					tips.style.opacity = "1";
				}else{
					console.log("hidden")
					tips.style.opacity = "0";
				}
			}
			for(var i = 0; i< btn.length; i++){
				if(i != 3){
					btn[i].onclick = function(){
						show(true);
						tipTimer = setTimeout(function(){
							show(false)
							clearTimeout(tipTimer)
						},3000)
					}
				}
				
			}
			// 鼠标进出tabbar动作
			for (let i = 0; i < tabbar.length; i++) {
				tabbar[i].onmouseenter = function() {
					tabbar[i].style.outline = "1px solid red";
				}
				tabbar[i].onmouseleave = function() {
					tabbar[i].style.outline = "none";
				}
			}
			
			
			
			// 初始化动画开始的位置
			function init(idx) {
				
				startSets(title, idx, 300, 0);
				startSets(p1, idx, 300, 0.4);
				startSets(p2, idx, 300, 0.8);
				startSets(btn, idx, 300, 1);
			}

			// 元素名称(name)以及序号(index)以及初始偏移量(target)
			// 1.开始状态设置以及过渡相关设置
			function startSets(name, index, target, delay) {
				name[index].style.left = target + "px";
				name[index].style.transition = "all 1s ease " + delay + "s";
			}
			// 2.结束状态设置
			function endSets(name, index, target) {
				name[index].style.left = target + "px";
			}



			for (let i = 0; i < p1.length; i++) {
				init(i); //初始化动画开始的位置

				aLi[i].onclick = function() { //触发动画
				
					if (i < 6) {
						endSets(title, i, 0)
						endSets(p1, i, 0)
						endSets(p2, i, 0)
						endSets(btn, i, 0)
					}
				}
			}