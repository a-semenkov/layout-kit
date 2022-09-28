import SliderView from './slider.view.js';

export default class Slider {
  constructor(tragetElement, slideArray = [], options = {}) {
    this.slider = document.getElementById(tragetElement);
    this.slides = slideArray;
    this.view = new SliderView(this.slider, this.slides);
    this.settings = {
      margin: options.margin || 0,
      slidesPerView: options.slidesPerView || 1,
    };
  }

  createSlider() {}
}
