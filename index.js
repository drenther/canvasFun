const canvas = document.querySelector('#draw');

const ctx = canvas.getContext('2d');

canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;


ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
	if (!isDrawing) return;

	ctx.strokeStyle = document.querySelector('.pen-color input').value;
	ctx.lineWidth = document.querySelector('.pen-size input').value;
	ctx.beginPath();

	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);

	ctx.stroke();

	[lastX, lastY] = [e.offsetX, e.offsetY];
}

function download() {
	const link = document.createElement('a');
	link.href = canvas.toDataURL();
	link.download = 'filename.png';
	link.click();
}

function setXY(e) {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

const downloadBtn = document.querySelector('.download');
const resetBtn = document.querySelector('.reset');

downloadBtn.addEventListener('click', download);
resetBtn.addEventListener('click', () => (ctx.clearRect(0, 0, canvas.width, canvas.height)));

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setXY);
canvas.addEventListener('mouseup', () => isDrawing = false );
canvas.addEventListener('mouseout', () => isDrawing = false );

canvas.addEventListener('touchstart', (e) => {
	e.preventDefault();
	e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;     
	e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
	setXY(e);	
});
canvas.addEventListener('touchmove', (e) => {
	e.preventDefault();
	e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;     
	e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
	draw(e);	
});
canvas.addEventListener('touchend', () => isDrawing = false );
canvas.addEventListener('touchcancel', () => isDrawing = false );

function scrollPrevent(e) {
	if (e.target === canvas) {
		e.preventDefault();
	}
}

document.addEventListener('touchstart', scrollPrevent);
document.addEventListener('touchmove', scrollPrevent);
document.addEventListener('touchend', scrollPrevent);
document.addEventListener('touchcancel', scrollPrevent);