import ModalView from './modal.view.js';
import ModalModel from './modal.model.js';

export default class Modal {
  constructor(targetNode, options, content) {
    this.view = new ModalView();
    this.model = new ModalModel();
    this.element = targetNode;
    this.handleModalCreate();

    this.defaultOptions = {
      onOpen: () => {},
      onClose: () => {},
    };
    this.defaultContent = {
      header: '',
      body: '',
      footer: '',
    };

    this.options = Object.assign(this.defaultOptions, options);
    this.content = Object.assign(this.defaultContent, content);

    // this.initEventListeners();
  }

  handleModalCreate = async () => {
    await this.model.importStlyes();
    this.view.createMarkup(this.content);
    this.model.renderModal(this.view.modal, this.options);
  };

  // initEventListeners() {
  //   this.elements.forEach((el) => {
  //     el.addEventListener('click', this.handleModalCreate);
  //   });
  // }
}
