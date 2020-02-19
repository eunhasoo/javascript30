const panels = document.querySelectorAll('.panel');

// 클릭이 발생하면 실행
function toggleOpen() {
    this.classList.toggle('open');
}

// transition 끝나면 실행
function toggleActive(e) {
    if (e.propertyName.includes('flex')) {      // flex-grow 이벤트가 있으면
        this.classList.toggle('open-active');   // 숨겨둔 첫번째, 세번째 자식 엘리먼트 보여줌
    }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));