const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__info');
const buttons = document.querySelectorAll('[data-time]');
const restartBtn = document.querySelector('#restart');

let countdown;
function timer(seconds) {
    clearInterval(countdown); // 이미 존재하는 인터벌 종료시키기

    const now = Date.now(); // 1970.01.01 0시 0분 0초부터 현재까지 경과된 milliseconds
    const then = now + (seconds * 1000); // second * 1000 = millisecond
    
    displayTimeLeft(seconds); // 시작시간 출력 (interval 내부에선 seconds - 1부터 첫 출력)
    displayInfo(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) { // 남은 시간이 0초 미만이면 종료하기
            clearInterval(countdown);
            document.title = 'Ring Ring (:';
            endTime.innerHTML =`<p>Clear! 😎</p>`;
            return;
        }

        displayTimeLeft(secondsLeft); // 1초마다 출력
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = 
    `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
  }

function displayInfo(timestamp) {
    const end = new Date(timestamp); // convert from milliseconds to formatted Date
    const hour = end.getHours();
    const min = (end.getMinutes() < 10) ? ('0'+end.getMinutes()) : end.getMinutes();
    const adjustedHour = (hour > 12) ? (hour - 12) : hour; // ex) 15시 -> 3시
    endTime.innerHTML = `<p>종료시간은 ${adjustedHour}시 ${min}분입니다.</p>`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time); // 해당하는 button의 value 가져오기
    timer(seconds);
    console.log(this.sibling);
}

function handleForm(e) {
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60); // min to sec
    this.reset(); // form 비우기
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', handleForm);