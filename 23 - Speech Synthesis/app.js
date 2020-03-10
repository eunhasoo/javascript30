/*
The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. 
It contains the content the speech service should read (ex. text)
and information about how to read it (e.g. language, pitch and volume.)
*/
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    // API로부터 현재 장치에서 이용가능한 voice 객체들을 가져온다
    voices = this.getVoices(); 
    voicesDropdown.innerHTML = 
        voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
              .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', toggle.bind(null, false)); 
// context는 null, 인자는 false를 전달. (toggle(false)로 구현시 동작하지 않음.)