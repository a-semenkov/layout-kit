// import Modal from './elements/modal/modal.controller.js';

const hooks = {
  onOpen: () => {
    console.log('открыто');
  },
};

const element = document.querySelectorAll('.modal-btn');

element.forEach((el) => {
  el.addEventListener('click', async (e) => {
    await import('./elements/modal/modal.controller.js').then((module) => {
      const Modal = module.default;
      const modal = new Modal(e.target, hooks);
    });
  });
});
