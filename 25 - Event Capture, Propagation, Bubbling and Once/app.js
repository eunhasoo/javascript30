const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(e) {
    console.log(this.classList.value); // three two one
}

divs.forEach(div => div.addEventListener('click', logText, {
    capture: false
}));

/*
<event propagation>
addEventListener의 세번째 인자로 capturing을 true / false(default) 지정
캡처링: 부모 -> 자식순으로 이벤트 전파
버블링: 자식 -> 부모순으로 이벤트 전파
*/

button.addEventListener('click', function() {
    alert('한번밖에 못 누름! (;');
}, { once: true });