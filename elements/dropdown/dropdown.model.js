export default class DropdownModel {
  constructor() {}

  compareListArrays(arr1, arr2) {
    let result =
      arr1.length === arr2.length &&
      arr1.every((element, index) => element === arr2[index]);

    return result;
  }

  isListItem(item, list) {
    return list?.includes(item);
  }

  isDropdownOpen(dropdownItem) {
    return dropdownItem.dataset.shown === 'true';
  }

  checkForInputElement(element) {
    return element.tagName === 'INPUT';
  }

  hideDropdown(element) {
    element.dataset.shown = 'false';
  }

  showDropdown(element) {
    element.dataset.shown = 'true';
  }

  handleInput(inputValue, array) {
    const query = inputValue.trim();
    if (!query.length) return;

    const condition = new RegExp(`${inputValue}`, 'gi');
    const result = this.#matchString(condition, array);

    return { condition, result };
  }

  #matchString(condition, iterableObj) {
    let matches = [];

    matches = iterableObj.filter((element) => element.value.match(condition));

    return matches;
  }

  toggleDropdownMenu(element) {
    if (!element.hasAttribute('data-shown')) return;
    const shown = element.dataset.shown === 'true';

    element.dataset.shown = (!shown).toString();
  }

  setItemSelected(item, list, className) {
    list.forEach((item) => {
      item.classList.remove(className);
    });

    item.classList.add(className);
  }

  setElementValue(value, rootElement, isInput) {
    isInput ? (rootElement.value = value) : (rootElement.textContent = value);
  }
}
