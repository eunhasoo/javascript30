const video = document.querySelector('.flex');
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');

function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight; // 0 ~ 0.99
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%'; // 0% ~ 100%
    const playbackRate = percent * (max - min) + min; // min ~ max값 사이가 되도록 지정
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(1) + 'x';
    video.playbackRate = playbackRate;
}

speed.addEventListener('click', handleMove);

