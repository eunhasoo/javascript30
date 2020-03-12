const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop; // nav의 top값 저장
const button = document.querySelector('button');

function scrollCheck() {
    // 1. nav를 화면 상단에 고정되도록 만들기
    if (topOfNav <= window.scrollY) { // 스크롤한 크기가 nav의 top보다 크다면
        document.body.classList.add('fixed-nav');
        // position이 고정되면서 space를 할당하지 않아 뜨는 현상을 막기 위해 
        // 수동적으로 nav의 높이값을 할당시킨다
        document.body.style.paddingTop = nav.offsetHeight + 'px';
    } else {
        document.body.style.paddingTop = 0; // 기본 0px으로 다시 되돌린다
        document.body.classList.remove('fixed-nav');
    }

    // 2. 스크롤 위치에 따라 Top 버튼 표시/숨기기
    const maxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // 문서의 전체 스크롤 크기를 구한 뒤
    const size = maxY / 4; // 스크롤의 1/4 이상 다다른 경우 버튼을 표시하도록 한다
    if (document.documentElement.scrollTop > size || document.body.scrollTop > size) {
        button.style.display = 'block';        
    } else {
        button.style.display = 'none';
    }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.addEventListener('scroll', scrollCheck);
button.addEventListener('click', backToTop);