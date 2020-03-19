const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUp = false;
let score = 0;

// 두더지가 나오는 시간 정하기
function getRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 두더지가 나올 구멍 정하기
function getRandomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) { // 같은 구멍이면 다시 호출
        return getRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// 시간과 구멍을 정해서 튀어나오기
function peep() {
    const time = getRandomTime(200, 2000); // 0.2초부터 2초 사이의 시간
    const hole = getRandomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 10000); // 10초동안 게임 실행
}

function bonk(e) {
    if (!e.isTrusted) return; // 치팅 방지
    score++;
    this.parentNode.classList.remove('up'); // this.parentNode === hole
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));