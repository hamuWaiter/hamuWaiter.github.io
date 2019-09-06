var circleBox = document.getElementById('circle'),
	circles = circleBox.getElementsByClassName("num"),
	num = 0;


function add(target, index, callback) {

	var percent = target / 100;

	var speed = (1 - percent) * 1000;

	var timer = setInterval(function() {

		// 	for(var i = 0; i<circles.length ; i++){
		// 		circles[i].innerHTML = num;
		// 	}
		circles[index].innerHTML = num;
		if (num < target) {
			num = num + 1
		} else {
			clearInterval(timer);
			callback;
		}
	}, speed);
}

add(90, 0, add(80, 1, add(90, 2, add(70, 3))))
