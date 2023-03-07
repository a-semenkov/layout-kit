export default class ModalView {
  createMarkup(contents) {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.setAttribute("data-close", "");

    this.modal.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="modal__dialog">
            <button class="btn-close" data-close></button>
                    <div class="modal__header">
                        <h2 class="header__content>${contents.header || ""}</h2>

                    </div>
                    <div class="modal__body">
                        <div class="body__content>${contents.body || ""}</div>
                    </div>
                    <div class="modal__footer">
                        <div class="footer__content">${
                          contents.footer || ""
                        }</div>
                    </div>

            </div>
        `
    );

    document.body.prepend(this.modal);
  }
}
