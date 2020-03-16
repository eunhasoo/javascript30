const triggers = document.querySelectorAll('.cool > li');          // 마우스 hover 타겟
const background = document.querySelector('.dropdownBackground'); // hover시 나타날 드롭다운
const nav = document.querySelector('.top');         // 문서상 상대적 위치 정보 저장을 위한 객체*

function handleEnter() {
    this.classList.add('trigger-enter');
   
    setTimeout(() =>                // A && B --> A가 false면 B까지 도달 안함
        this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active')
    , 150);
   background.classList.add('open');
   const dropdown = this.querySelector('.dropdown'); // this의 하위 dropdown만을 가져오기 위해 여기서 변수 설정
   const dropdownCoords = dropdown.getBoundingClientRect();
   const navCoords = nav.getBoundingClientRect();
   //console.log(dropdownCoords, navCoords);

   const coords = {
       width: dropdownCoords.width,
       height: dropdownCoords.height,
       top: dropdownCoords.top - navCoords.top,     //*
       left: dropdownCoords.left - navCoords.left   //*
   };
   
   background.style.setProperty('width', `${coords.width}px`);
   background.style.setProperty('height', `${coords.height}px`);
   background.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`);
}

function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));