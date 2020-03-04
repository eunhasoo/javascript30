const timeNodes = Array.from(document.querySelectorAll('[data-time]')); // NodeList to Array

// 총 비디오 시간 구하기 (초 단위)
const seconds = timeNodes.map(node => node.dataset.time)
                         .map(timeCode => {
                             const [mins, secs] = timeCode.split(':').map(parseFloat);
                             return (mins * 60) + secs;})
                         .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds; // 이후 계산을 위해 let으로 선언

// 시간 구하기
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

// 분 구하기
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

// 초 구하기 (=남은 시간)
const secs = secondsLeft;

console.log("영상 총 시간: " + hours + "시간 " + mins + "분 " + secs +"초");