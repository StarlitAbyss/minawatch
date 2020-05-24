var timeElem = document.getElementById('time');
var hmsElem = document.getElementById('hms');
var msElem = document.getElementById('ms');
var startElem = document.getElementById('start');
var resetElem = document.getElementById('reset');

var accumulated = 0;
var startTime = null;
var timer = null;
var updateTime = null;

function pad(num, places) {
	return String(num).padStart(places, '0');
}

function update() {
	updateTime = new Date();
	var interval = updateTime - startTime + accumulated;
	var d = new Date(interval);
	hmsElem.innerText = `${pad(d.getUTCHours(), 2)}:${pad(d.getUTCMinutes(), 2)}:${pad(d.getSeconds(), 2)}`;
	msElem.innerText = '.' + pad(d.getMilliseconds(), 3);
}

function start() {
	if (timer !== null) {
		// Stop
		update();
		window.clearInterval(timer);
		accumulated += updateTime - startTime;
		timer = null;
		document.body.classList.add('paused');
	} else {
		// Start / resume
		startTime = new Date();
		timer = window.setInterval(update, 10);
		document.body.classList.remove('paused');
		document.body.classList.add('running');
		resetElem.disabled = false;
	}
}

function reset() {
	startTime = new Date();
	accumulated = 0;
	update();
	window.clearInterval(timer);
	timer = null;
	document.body.classList.remove('running', 'paused');
	resetElem.disabled = true;
}

function keyDown(e) {
	if(e.keyCode == 32) {
		start();
	}
}
