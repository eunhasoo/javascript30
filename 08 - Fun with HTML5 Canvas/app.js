const canvas = document.querySelector('#draw');
// grab the context 2D to draw on it
const ctx = canvas.getContext('2d');
// set canvas size same as window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.shadowColor = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.shadowBlur = 5;
ctx.lineWidth = 20;

// set true when cursor is down
let isDrawing = false;

// line needs start to stop
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
     if (!isDrawing) return; // stop the function

     ctx.strokeStyle = ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
     ctx.beginPath();
     ctx.moveTo(lastX, lastY);
     ctx.lineTo(e.offsetX, e.offsetY);
     ctx.stroke();
     [lastX, lastY] = [e.offsetX, e.offsetY];
     hue++;
     if (hue >= 360) {
         hue = 0;
     }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);