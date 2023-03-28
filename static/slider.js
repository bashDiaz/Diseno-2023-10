const sliderValue = document.querySelector('div.sliderValue span');
const inputSlider = document.querySelector("div.field input[type='range']");
inputSlider.oninput = (() => {
    let value = inputSlider.value;
    sliderValue.textContent = value;
    sliderValue.style.left = value/2 + '%';
    sliderValue.classList.add('show');
});
inputSlider.onblur = (() => {
    sliderValue.classList.remove('show');
});
console.log(inputSlider.value)

