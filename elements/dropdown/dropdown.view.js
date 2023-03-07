import { el, mount, setChildren } from '../utils/vendor/redom.es.min.js';

export default class DropdownView {
  #itemList;
  #selectedClass;

  /**
   * @param {String} val
   */
  set selectedClass(val) {
    this.#selectedClass = val;
  }

  get selectedClass() {
    return this.#selectedClass;
  }

  get dropdown() {
    return this.dropdownWrapper;
  }

  get interactiveElement() {
    return this.mainEl;
  }

  get itemList() {
    return this.#itemList;
  }

  createLayout(options) {
    const rootElement = options.rootNode;
    this.mainEl = options.rootNode.cloneNode(true);

    const rootClass = options.rootNode.classList[0];

    this.dropdownWrapper = el(
      `.${rootClass}--wrapper.dropdown__wrapper`,
      { 'data-shown': 'false' },

      this.mainEl,
      (this.overlay = el('.dropdown-overlay')),
      (this.dropdownMenu = el(`ul.${rootClass}--menu.dropdown__menu`)),
      (this.rootElIcon = el(`.${rootClass}--icon`))
    );

    rootElement.replaceWith(this.dropdownWrapper);

    if (options.rootNode.tagName === 'INPUT') {
      this.dropdownWrapper.addEventListener('input', options.handleInput);
    }
    this.dropdownWrapper.addEventListener('click', options.handleClick);
  }

  createOptionsList(list, condition = '') {
    this.#itemList = [];
    list.forEach((item) => {
      const option = el(
        `li.dropdown__option${item.selected ? 'selected' : ''}`,

        { 'data-id': item.id || item.value }
      );

      option.insertAdjacentHTML(
        'afterbegin',
        `${item.value.replace(condition, (match) => {
          return '<span class="dropdown__item--highlight">' + match + '</span>';
        })} `
      );
      {
      }
      this.#itemList.push(option);
    });

    setChildren(this.dropdownMenu, this.#itemList);
  }

  clearList() {
    setChildren(this.dropdownMenu, []);
  }
}
