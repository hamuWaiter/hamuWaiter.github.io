window.onload = function() {
	//1. 获取元素
	var aImg = document.getElementsByClassName("lazy"),
		swiper = document.getElementById("swiper"),
		ul = swiper.querySelector("ul"),
		tabbar = document.querySelector(".box .tabbar"),
		tab = document.querySelectorAll(".tabbar li"),
		controll = document.querySelector(".controll"),
		preImg = document.querySelector(".box .pre_page"),
		nextImg = document.querySelector(".box .next_page"),
		len = aImg.length, //页面个数
		aWidth = window.innerWidth, //屏幕宽度
		aHeight = window.innerHeight;


	// 可视区域高度
	var w = window.innerWidth;
	// 获取图片列表，即img标签列表
	// var imgs = document.querySelectorAll(".lazy");  //所有的图片并初始化高度

	// 获取到浏览器顶部的距离
	function getLeft(ele) {
		return ele.getBoundingClientRect().left;
	}

	// 懒加载实现
	function lazyload(imgs) {
		//滚动区域高度
		for (let i = 0; i < imgs.length; i++) {
			//图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
			if (getLeft(imgs[i]) < w) {
				// 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
				// 不加立即执行函数i会等于9
				// 隐形加载图片或其他资源，
				//创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
				var temp = new Image();
				temp.src = imgs[i].getAttribute('data-src'); //只会请求一次
				// onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
				temp.onload = function() {
					// 获取自定义属性data-src，用真图片替换假图片
					imgs[i].src = imgs[i].getAttribute('data-src')
				}
			}
		}
	}

	timer2 = setInterval(function(){
		lazyload(aImg)
	}, 1000);

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

// 3.点击停止播放停止，点击继续播放开始轮播
// 鼠标移入swiper显示上下一张切换
swiper.onmouseenter = function() {
	opacity(1);
}
swiper.onmouseleave = function() {
	opacity(0);
}
controll.onmouseenter = function() {
	opacity(1);
}
preImg.onmouseenter = function() {
	opacity(1);
}
nextImg.onmouseenter = function() {
	opacity(1);
}

function opacity(target) {
	preImg.style.opacity = target;
	nextImg.style.opacity = target;
	controll.style.opacity = target;
}

// 4.开始与暂停

var isMoving = true;
controll.onclick = function() {
	if (isMoving) {
		clearInterval(timer);
		this.innerHTML = "开始播放";
		isMoving = !isMoving;
	} else {
		timer = setInterval(move, 6000);
		this.innerHTML = "停止播放";
		isMoving = !isMoving;
	}
}
// 5.点击上一张/下一张切换图片

// 上一张

preImg.onclick = function() {
	init(idx - 1); //复原上一个的动画位置
	tab[idx - 1].style.backgroundColor = "rgba(255,255,255,.2)";
	if (idx == 1) {
		swiperMoveTo(1, 7);
	} else {
		idx = idx - 1;
		console.log(idx);
		tab[idx - 1].click();
	}

}

// 下一张
nextImg.onclick = function() {
	init(idx - 1); //复原上一个的动画位置
	tab[idx - 1].style.backgroundColor = "rgba(255,255,255,.2)";

	if (idx == 7) {
		swiperMoveTo(7, 1);
	} else {
		idx = idx + 1;
		console.log(idx);
		tab[idx - 1].click();
	}

}

// 此函数用于在轮播的边界部分时的逻辑移动方式
// currentIdx是当前idx，targetIdx是目标的idx

function swiperMoveTo(currentIdx, targetIdx) {

	swiper.style.transition = "transform 1s ease";
	swiper.style.transform = "translateX(-" + (currentIdx + 1) * aWidth + "px)";
	tab[targetIdx - 1].style.backgroundColor = "rgba(255,0,0,.4)";

	// 最后一张过渡完成就在一瞬间将swiper定位到第一张的位置
	swiper.addEventListener('transitionend', function handel() {
		// 注意,这里的处理函数要用实名函数,否则此事件监听无法移除

		idx = targetIdx; //改变全局的idx，（tabbar也用到idx所以是全局的）

		swiper.style.transition = "none";
		swiper.style.transform = "translateX(-" + targetIdx * aWidth + "px)";
		aLi[targetIdx - 1].click(); //让文本显示出来

		// 移除过渡监听
		swiper.removeEventListener("transitionend", handel)
	})
}



//6. 轮播部分
// 设置轮播从哪里开始（初始位置）
var idx = 7;
tab[idx - 1].style.backgroundColor = "rgba(255,0,0,.4)";
swiper.style.transform = "translateX(-" + idx * aWidth + "px)";

var timer = setInterval(move, 6000); //开启定时器

function move() { //开启定时器
	init(idx - 1); //将上一次的文本隐藏

	// 清除上一个tabbar的样式

	tab[idx - 1].style.backgroundColor = "rgba(255,255,255,.2)";

	idx++;


	if (idx < len - 1) {
		swiper.style.transition = "transform 1s ease";
		swiper.style.transform = "translateX(-" + idx * aWidth + "px)";
		tab[idx - 1].click() //文本显示(tabbar跟随变化宝行在其中)

	} else {

		swiperMoveTo(7, 1); //从当前idx以动画形式移动到下一个idx（边界的时候用）
	}

}



// 7.tabbar部分
for (let i = 0; i < len - 2; i++) {


	tab[i].index = i + 1; //第一个tab栏对应第二张轮播图

	tab[i].onclick = function() {

		init(idx - 1); //将上一次的文本隐藏
		// 清除上一个tabbar样式
		tab[idx - 1].style.backgroundColor = "rgba(255,255,255,.2)";
		// 这里idx表示轮播图中的序号
		idx = this.index;

		aLi[idx - 1].click() //文本显示

		// 更改这一次tabbar样式
		tab[idx - 1].style.backgroundColor = "rgba(255,0,0,.4)";

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
