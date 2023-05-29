document.addEventListener('DOMContentLoaded', () => {
    ItcSlider.getOrCreateInstance('.slider');
});

const sliderElem = document.querySelector('.slider');
const slider = ItcSlider.getInstance(sliderElem);