const inputs = document.querySelectorAll('.controls input');
function handleUpdate(){
    console.log(this.value);
    const suffix = this.dataset.sizing || ''; // data-xxx로 된 속성값을 가져온다(px) 없으면 이미지
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
inputs.forEach(input => input.addEventListener('change', handleUpdate));