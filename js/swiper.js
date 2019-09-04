window.onload = function() {
	// 获取所有图片
	var aImg = document.getElementsByClassName("bgimg"),
		swiper = document.getElementById("swiper"),
		tab = document.querySelectorAll(".tabbar li")
	len = aImg.length, //页面个数
		maxWidth = swiper.offsetWidth,
		aWidth = window.innerWidth, //屏幕宽度
		aHeight = window.innerHeight;



	// 页面加载完成检测屏幕宽高并赋值给所有图片

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



	var idx = 0;
 	// 轮播部分
	tab[0].style.backgroundColor = "rgba(255,0,0,.4)";
	var timer = setInterval(function() {
		// 清除上一个tabbar的样式
		tab[idx].style.backgroundColor = "rgba(255,255,255,.2)";
		idx++;
		if (idx < len - 1) {
			swiper.style.transition = "transform 1s ease";
			swiper.style.transform = "translateX(-" + idx * aWidth + "px)";

			// tabbar跟随变化
			tab[idx].style.backgroundColor = "rgba(255,0,0,.4)";

		} else {

			swiper.style.transition = "transform 1s ease";
			swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
			tab[0].style.backgroundColor = "rgba(255,0,0,.4)";

			// 最后一张过渡完成就在一瞬间将swiper定位到第一张的位置
			swiper.addEventListener('transitionend', function handel() {
				// 注意,这里的处理函数要用实名函数,否则此事件监听无法移除
				idx = 0;
				swiper.style.transition = "none";
				swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
				swiper.removeEventListener("transitionend", handel)
			})
		}
	}, 5000);

	// tabbar部分
	for (let i = 0; i < len - 1; i++) {
		tab[i].idx = i;
		tab[i].onclick = function() {
			// 清除上一个tabbar样式
			tab[idx].style.backgroundColor = "rgba(255,255,255,.2)";
			idx = this.idx;
			// 更改这一次tabbar样式
			tab[idx].style.backgroundColor = "rgba(255,0,0,.4)";

			swiper.style.transition = "transform 1s ease";
			swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
		}
	}

}
