const container = document.querySelector('.container');
const text = container.querySelector('h1');
const walk = 300; // px

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = container;
    let { offsetX: x, offsetY: y} = e;

    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / width * walk) - (walk / 2));

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 red,
        ${xWalk * -1}px ${yWalk}px 0 blue,
        ${yWalk}px ${xWalk * -1}px 0 gray,
        ${yWalk}px ${xWalk}px 0 yellow
    `;
}

container.addEventListener('mousemove', shadow);