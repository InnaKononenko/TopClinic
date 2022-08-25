import { createCard } from "../createCard.js";

const visitModalForm = document.querySelector("#visit-modal");

export class visitForm {
  constructor(title, selectedName, errorText) {
    this.title = title;
    this.selectedName = selectedName;
    this.errorText = errorText;
  }
  renderVisitForm() {
    visitModalForm.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content" id="visit-form">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${this.title}</h5>
          <button
            type="button"
            class="close-visit"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="error-modal">
        <div class="alert alert-danger" role="alert" data-bs-dismiss="alert">
        ${this.errorText}
        </div></div>

        <div class="modal-body">
          <form name="visitStartForm" action="" id="started-form-visit">
            <select
              id="choose-doctor"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>${this.selectedName}</option>
              <option value="1">Кардіолог</option>
              <option value="2">Стоматолог</option>
              <option value="3">Терапевт</option>
              <span class="error">Error</span>
            </select>
            <input
              autocomplete="off"
              id="purpose"
              class="form-control"
              type="text"
              placeholder="мета візиту"
              aria-label="default input example"
            />
            <span class="error">Error</span>
            <input
              id="summary"
              class="form-control"
              type="text"
              placeholder="короткий опис візиту"
              aria-label="default input example"
            />
            <input
              id="fullName"
              class="form-control"
              type="text"
              placeholder="ПІБ"
              aria-label="default input example"
            />
            <select
              id="urgence"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>терміновість</option>
              <option value="звичайна">звичайна</option>
              <option value="пріоритетна">пріоритетна</option>
              <option value="невідкладна">невідкладна</option>
            </select>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary close-modal-visit"
            data-dismiss="modal"
          >
            Закрити
          </button>
          <h3 class="visit-modal-error">Виберіть лікаря!</h3>
          <button type="submit" id="saveChanges" class="btn btn-color">
            Зберегти
          </button>
          <button type="submit" id="saveChanges-edit" class="btn btn-color">
            Зберегти
          </button>
        </div>
      </div>
    </div>
            `
    );
  }

  renderVisitFormDentist() {
    const form = document.querySelector("#started-form-visit");
    form.insertAdjacentHTML(
      "afterend",
      `
      <div class="dentist">
    <input
    id="lastVisitDate"
    class="form-control"
    type="text"
    placeholder="дата останнього відвідування"
    aria-label="default input example"
  />
  </div>`
    );
  }
  renderVisitFormCardiologist() {
    const form = document.querySelector("#started-form-visit");
    form.insertAdjacentHTML(
      "afterend",
      `<div class="cardiologist">
        <input
        id="bloodPressure"
        class="form-control"
        type="text"
        placeholder="звичайний тиск"
        aria-label="default input example"
      />
      <input
        id="BMI"
        class="form-control"
        type="text"
        placeholder="Індекс маси тіла"
      />
      <input
        id="cardioDeseases"
        class="form-control"
        type="text"
        placeholder="перенесені захворювання серцево-судинної системи"
        aria-label="default input example"
      />
      <input
        id="age"
        class="form-control"
        type="text"
        placeholder="вік"
        aria-label="default input example"
      /></div>`
    );
  }
  renderVisitFormTherapist() {
    const form = document.querySelector("#started-form-visit");
    form.insertAdjacentHTML(
      "afterend",
      `<div class="therapist">
      <input
      id="age"
      class="form-control"
      type="text"
      placeholder="вік"
      aria-label="default input example"
    /></div>`
    );
  }
}
export const startedFormVisit = new visitForm(
  "Введіть дані для створення візиту",
  "Оберіть лікаря",
  "Введіть всі дані!"
);
export function resetForm() {
  document.querySelector(".cardiologist") &&
    (document.querySelector(".cardiologist").innerHTML = "");
  document.querySelector(".therapist") &&
    (document.querySelector(".therapist").innerHTML = "");
  document.querySelector(".dentist") &&
    (document.querySelector(".dentist").innerHTML = "");
}
export function createForm() {
  startedFormVisit.renderVisitForm();

  const chooseDoctor = document.querySelector("#choose-doctor");

  chooseDoctor.addEventListener("change", () => {
    resetForm();
    const doctor = chooseDoctor.value;
    chooseDoctorForm(startedFormVisit, doctor);
  });

  createCard();
}
export function chooseDoctorForm(startedFormVisit, doctor) {
  resetForm();
  switch (doctor) {
    case "1":
      startedFormVisit.renderVisitFormCardiologist();
      break;
    case "2":
      startedFormVisit.renderVisitFormDentist();
      break;
    case "3":
      startedFormVisit.renderVisitFormTherapist();
      break;
  }
}
