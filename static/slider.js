const slidervalue = document.querySelector("#Tval");
const inputslider = document.querySelector("#slider_1");
inputslider.oninput = (() => {
  let value = inputslider.value;
  slidervalue.textContent = value;
  slidervalue.style.left = (value / 2) + "%";
  slidervalue.classList.add("show");
});
inputslider.onblur = (() => {
  slidervalue.classList.remove("show");
});
const slidervalue1 = document.querySelector("#Tval1");
const inputslider1 = document.querySelector("#slider_2");
inputslider1.oninput = (() => {
  let value1 = inputslider1.value;
  slidervalue1.textContent = value1;
  slidervalue1.style.top = (100 - (value1 / 2)) + "%";
  slidervalue1.classList.add("show");
});
inputslider1.onblur = (() => {
  slidervalue1.classList.remove("show");
})
