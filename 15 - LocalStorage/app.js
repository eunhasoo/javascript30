const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const checkBtn = document.querySelector('#checkAll');
const uncheckBtn = document.querySelector('#uncheckAll');
const deleteBtn = document.querySelector('#deleteAll');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault(); // 페이지 새로고침 방지

    // user input 저장
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, // ES6: key와 value가 같으면 생략
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));

    this.reset(); // 입력된 form창 비우기
}

function populateList(plates = [], platesList) { // default로 빈 배열 지정
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
          <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join(''); // array to single string
}

// 체크박스 상태가 변하는지 지켜봄
function toggleDone(e) {
    if (!e.target.matches('input')) return; // input이 아니면 스킵
    // console.log(e.target);

    // toggle checkbox state
    const el = e.target;            // checkbox
    const index = el.dataset.index; // checkbox index
    items[index].done = !items[index].done;

    // update LocalStorage
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function checkAll() {
    for(index in items) {
        items[index].done = true;
    }
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function uncheckAll() {
    for(index in items) {
        items[index].done = false;
    }
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);

}

function deleteAll() {
    localStorage.clear();
    for(index in items) {
        delete items[index];
    }
    itemsList.innerHTML = '';
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
checkBtn.addEventListener('click', checkAll);
uncheckBtn.addEventListener('click', uncheckAll);
deleteBtn.addEventListener('click', deleteAll);
populateList(items, itemsList);