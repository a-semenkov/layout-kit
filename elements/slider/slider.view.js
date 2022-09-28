export default class SliderView {
  constructor(node, slides) {
    this.node = node;
    this.slides = slides;
    this.createLayout();
  }

  createLayout() {
    this.node.insertAdjacentHTML(
      'afterbegin',
      `
    <div cla></div>
    `
    );
  }
}
