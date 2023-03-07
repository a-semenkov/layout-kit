// import Modal from './elements/modal/modal.controller.js';

import Dropdown from './elements/dropdown/dropdown.controller.js';

const hooks = {
  onOpen: (e) => {
    console.log(e);
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

const inputEl = document.querySelector('.hero__input');
const selectEl = document.querySelector('.hero__select');
const btnEl = document.querySelector('.hero__btn');

const btn = document.querySelector('.updateList');

const drop = new Dropdown({
  rootNode: selectEl,
  // isSelect: false,
  onInput: (e) => {
    // console.log(drop.handleClick);
  },
  onDropdownOpen: function (e) {
    // console.log(e);
  },
  onSelect: (element) => {
    console.log(element);
  },
  list: [
    { id: 1, value: 'Вариант1' },
    { id: 2, value: 'Вариант2' },
    { id: 3, value: 'Вариант3' },
  ],
});

btn.addEventListener('click', () => {
  drop.optionsList = [
    { id: 3, value: 'Вариант2' },
    { id: 4, value: 'Вариант3' },
    { id: 5, value: 'привет' },
    { id: 6, value: 'лапоть' },
    { id: 7, value: 'бочка' },
    { id: 8, value: 'сахар' },
    { id: 9, value: 'кефир' },
    { id: 10, value: 'бочка' },
  ];
  // console.log(drop.options);
});

document.addEventListener('click', (e) => {
  console.log(e);
});
