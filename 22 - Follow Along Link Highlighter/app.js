const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
    // console.log(this); -> this는 해당 이벤트에 타겟이 되는 element
    const linkCoords = this.getBoundingClientRect(); // 좌표값 정보를 갖는 객체 반환
    // console.log(linkCoords);

    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        // scroll up, down 때마다 offset을 좌표값에 더해줘야 한다
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };
    
    // 하이라이트용 span의 크기 지정
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;

    // 엘리먼트 위치를 찾아 하이라이트 표시
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));