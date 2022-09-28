import { animateFadeIn, animateFadeOut } from '../utils/animateDnone.js';
import addEventListenerWithDispose from '../utils/addEventListenerWithDispose.js';
import importCSS from '../utils/importCSS.js';

export default class ModalModel {
  renderModal(modalElement, hooks) {
    this.modal = modalElement;
    this.hooks = hooks;

    requestAnimationFrame(() => {
      animateFadeIn(this.modal, this.disableScroll);
    });

    this.hooks.onOpen();
    this.initCloseModal();
  }

  async importStlyes() {
    // const webpackPath = require('./modal.css'); путь для webpack

    await importCSS('./elements/modal/style/modal.css');
  }

  initCloseModal() {
    this.clickEvDispose = addEventListenerWithDispose(
      this.modal,
      'click',
      this.initClosingAnimation
    );
  }

  initClosingAnimation = (e) => {
    if (!e.target.hasAttribute('data-close')) return;

    animateFadeOut(this.modal, this.closingHandler);
  };

  closingHandler = () => {
    this.enableScroll();
    this.clickEvDispose();
    this.modal.remove();
    this.hooks.onClose();
  };

  disableScroll = () => {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  };

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.paddingRight = '0px';
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({
      top: pagePosition,
      left: 0,
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.paddingRight = paddingOffset;
  }
}
