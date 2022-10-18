import DropdownModel from './dropdown.model.js';
import DropdownView from './dropdown.view.js';

export default class Dropdown {
  #view;
  #model;
  #searchResults;
  constructor(options) {
    this.#view = new DropdownView();
    this.#model = new DropdownModel();

    this.options = options;
    this.defaultElementValue = options.rootNode.textContent || '';
    this.isInput = this.#model.checkForInputElement(this.options.rootNode);
    this.isSelect = options.isSelect === undefined && true;
    this.animate = options.animate === undefined && false;
    //опции, которые передаются во view и model

    this.#view.selectedClass = options.selected === undefined && 'selected';

    this.options.handleInput = this.#handleInput;
    this.options.handleClick = this.#handleClick;

    this.options.inputDelay = options.inputDelay || 300;
    this.options.minCharacters = options.minCharacters || 3;
    this.options.list = this.#initListProxy(options.list);

    this.#render();
  }

  /**
   * @param {Array} arr
   */
  set optionsList(arr) {
    //optionList - список со всеми вариантами
    this.options.list.array = arr;
  }

  get optionsList() {
    return this.options.list.array;
  }

  set autocompleteList(value = []) {
    // список только с autocomplete
    this.#searchResults.result = value;
  }

  get autocompleteList() {
    return this.#searchResults?.result;
  }

  #initListProxy = (targetObj = []) => {
    // оборачиваем в прокси список, чтобы можно было менять список из вне
    const proxyObj = { array: targetObj };

    let handler = {
      set: (item, property, value, itemProxy) => {
        item[property] = value;

        this.#changeItemList();

        return true;
      },
    };
    return new Proxy(proxyObj, handler);
  };

  #changeItemList() {
    // изменение списка из вне
    this.#updateList();
    if (this.isInput) this.clearSearchResults();

    this.hideDropdown();
    this.#model.setElementValue(
      this.defaultElementValue,
      this.#view.interactiveElement,
      this.isInput
    );
  }

  #updateList = () => {
    if (this.isInput) {
      this.#updateAutocompleteList();
      return;
    }

    this.#view.createOptionsList(this.optionsList);
  };

  #updateAutocompleteList() {
    if (this.autocompleteList) {
      this.#view.createOptionsList(
        this.#searchResults.result,
        this.#searchResults.condition
      );
    }
  }

  #handleClick = (event) => {
    // обработка клика элементу dropdown

    if (this.isInput) {
      this.#handleInputClick(event);
      return;
    }

    if (this.#model.isDropdownOpen(this.#view.dropdown)) {
      this.options.onDropdownOpen();

      this.#handleSelect(event);
    }

    this.#model.toggleDropdownMenu(this.#view.dropdown);
  };

  #handleInputClick = (event) => {
    //обработка клика по инпуту
    if (this.#model.isDropdownOpen(this.#view.dropdown)) {
      this.#handleSelect(event);
      this.#model.toggleDropdownMenu(this.#view.dropdown);
      return;
    }

    if (this.autocompleteList?.length > 0)
      this.#model.toggleDropdownMenu(this.#view.dropdown);
  };

  #handleInput = (event) => {
    // обработка инпута
    if (event.target.value.length < this.options.minCharacters) {
      this.#model.hideDropdown(this.#view.dropdown);
      this.#view.clearList();
      this.clearSearchResults();
      return;
    }

    this.#searchResults = this.#model.handleInput(
      event.target.value,
      this.optionsList
    );

    if (this.autocompleteList?.length === 0) {
      this.hideDropdown();
      return;
    }

    this.#updateList(this.#searchResults);
    this.showDropdown();

    this.options.onDropdownOpen(event);
  };

  #handleSelect = (e) => {
    // обработка клика по элементу списка
    if (!this.#model.isListItem(e.target, this.#view.itemList)) return;

    if (!this.isInput) {
      this.#model.setItemSelected(
        e.target,
        this.#view.itemList,
        this.#view.selectedClass
      ); // добавляем класс selected выбранному элементу
    }

    this.options.onSelect(e.target);

    this.isSelect &&
      this.#model.setElementValue(
        e.target.textContent,
        this.#view.interactiveElement,
        this.isInput
      );
  };

  // публичные методы
  showDropdown() {
    this.#model.showDropdown(this.#view.dropdown);
  }

  hideDropdown() {
    this.#model.hideDropdown(this.#view.dropdown);
  }

  isDropdownOpen() {
    return this.#model.isDropdownOpen(this.#view.dropdown);
  }

  clearSearchResults() {
    if (this.autocompleteList) this.autocompleteList = [];
  }

  #render() {
    this.#view.createLayout(this.options);
    if (!this.isInput) {
      this.#view.createOptionsList(this.optionsList);
    }
  }
}

/*



*/
