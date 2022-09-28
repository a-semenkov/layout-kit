export default class ModalView {
  createMarkup(contents) {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.setAttribute('data-close', '');

    this.modal.insertAdjacentHTML(
      'afterbegin',
      `
            <div class="modal__dialog">
            <button class="btn-close" data-close></button>
                    <div class="modal__header">
                        <h2>${contents.header || ''}</h2> 
                        
                    </div>
                    <div class="modal__body">
                        <p>${contents.body || ''}</p>
                    </div>
                    <div class="modal__footer">
                        <p>${contents.footer || ''}</p> 
                    </div>
                
            </div>
        `
    );

    document.body.prepend(this.modal);
  }
}
