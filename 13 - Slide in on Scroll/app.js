const sliderImages = document.querySelectorAll('.slide-in');

/*
스크롤 up, down 하는 매 순간마다 event 발생 -> 메모리에 부담
debounce 메소드를 사용해서 정해둔 시간을 기준으로 event를 받도록 지정
*/
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        // half way through the image
        // get the pixel level of when each of the images should be slide in at
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    })
}

window.addEventListener('scroll', debounce(checkSlide));