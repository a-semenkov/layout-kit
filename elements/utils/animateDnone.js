import addEventListenerWithDispose from './addEventListenerWithDispose.js';

export function animateFadeIn(element, handler) {
  element.style.display = 'block';

  requestAnimationFrame(() => {
    element.setAttribute('data-shown', '');
    handler();
  });
}

export function animateFadeOut(element, handler) {
  element.removeAttribute('data-shown');

  const transition = addEventListenerWithDispose(
    element,
    'transitionend',
    handleFadeOut
  );

  function handleFadeOut() {
    element.style.display = 'none';
    transition();
    handler();
  }
}
