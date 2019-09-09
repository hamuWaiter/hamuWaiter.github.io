var circleBox1 = document.getElementById('circle1'),
	circles1 = circleBox1.getElementsByClassName("num"),  //复制的最后一页（技能）
	circleBox2 = document.getElementById('circle2'),
	circles2 = circleBox2.getElementsByClassName("num"),  //最后一页（技能）
	num = 0;


function add(target, index, callback) {

	var percent = target / 100;

	var speed = (1 - percent) * 1000;

	var timer = setInterval(function() {
		
		circles1[index].innerHTML = num;
		circles2[index].innerHTML = num;
		if (num < target) {
			num = num + 1
		} else {
			clearInterval(timer);
			callback;
		}
	}, speed);
}

add(90, 0, add(80, 1, add(90, 2, add(70, 3))))
