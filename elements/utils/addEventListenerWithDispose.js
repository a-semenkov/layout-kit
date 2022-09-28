export default function addEventListenerWithDispose(element, name, handler) {
  element.addEventListener(name, handler);
  return () => element.removeEventListener(name, handler);
}
