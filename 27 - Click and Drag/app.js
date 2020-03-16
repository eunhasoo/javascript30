const slider = document.querySelector('.items');
let isDown = false; // 클릭상태 감지용 플래그
let startX; // initial click down
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if(!isDown) { // 클릭상태 아니면 함수 실행 중단
        return;
    }
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft; // 마우스 이동 후 위치
    const walk = (x - startX) * 3; // 클릭한 뒤 좌 or 우 이동량
    slider.scrollLeft = scrollLeft - walk;
});