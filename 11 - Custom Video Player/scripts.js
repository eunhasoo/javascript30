const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullBtn = document.getElementById('fullscreen');

function togglePlay() {
    /*
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    */
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '▶' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function controlByKey(e) {
    // console.log(e);
    if (e.key === 'ArrowRight') {
        video.currentTime += 10;
    } else if(e.key === 'ArrowLeft') {
        video.currentTime -= 10;
    }
    if (e.key === ' ') {
        togglePlay();
    }
    if (e.key === 'Enter') {
        fullScreen();
    }
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipBtns.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // mousedown를 먼저 체크후 true일시 scrub 실행
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousedown', () => mousedown = false);
fullBtn.addEventListener('click', fullScreen);
window.addEventListener('keyup', controlByKey);