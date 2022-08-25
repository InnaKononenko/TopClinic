const modalWind = document.querySelector("#modal");

export class Modal {
  constructor(title, labelName, labelPassword, textSubmit, nameCheckbox) {
    this.title = title;
    this.labelName = labelName;
    this.labelPassword = labelPassword;
    this.textSubmit = textSubmit;
    this.nameCheckbox = nameCheckbox;
  }
  renderModalWindow() {
    modalWind.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${this.title}</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-input">
              <label for="uname"><b>${this.labelName}</b></label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />

              <label for="psw"><b>${this.labelPassword}</b></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
              <h4 class="modal-error">Incorrect data</h4>
              <button class="btn btn-outline-secondary btn-lg" type="submit">
                ${this.textSubmit}
              </button>
              <label>
                <input type="checkbox" checked="checked" name="remember" />
                ${this.nameCheckbox}
              </label>
            </div>
          </div>
      </div>
    </div>`
    );
  }
}

export const newModal = new Modal(
  "Sign in",
  "You login",
  "You password",
  "Sign in",
  "Remember"
);
