import { cardsRow } from "../main.js";
import { deleteCard, getOneCards, updatePostOne } from "../sendRequest.js";
import { renderVisitMore } from "../loadMore.js";
import { visitModal } from "../main.js";
import {
  startedFormVisit,
  chooseDoctorForm,
  createForm,
  resetForm,
} from "./classVisitForm.js";
import { saveDataCard } from "../createCard.js";

export class Visit {
  constructor(id, doctor, purpose, summary, fullName, urgence, isDone = "") {
    this.id = id;
    this.doctor = doctor;
    this.purpose = purpose;
    this.summary = summary;
    this.fullName = fullName;
    this.urgence = urgence;
    this.isDone = isDone;
  }
  renderVisit() {
    cardsRow.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-sm-3 visit_card" id="${this.id}">
      <div class="card text-center">
        <div class="card-body">
        <label for="checkbox${this.id}" class="form-checkbox">
          <input type="checkbox" ${this.isDone} id ="checkbox${this.id}">
          <span class="checkmark"></span>
        </label>  
        <span class="icon-edit"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 91 91" height="24px" id="Layer_1" version="1.1" viewBox="0 0 91 91" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M76.931,85.25H3.313V7.739l55.802,0.001L84.88,31.732v45.572C84.88,81.675,81.303,85.25,76.931,85.25z" fill="#FFFFE0"/><g><path d="M48.222,61.858L30.559,44.194L67.736,7.019c3.025-3.03,7.944-3.03,10.972,0l6.689,6.69    c3.029,3.03,3.029,7.94,0,10.973L48.222,61.858z" fill="#9ABFDA"/><path d="M48.222,64.371L48.222,64.371c-0.666,0-1.306-0.266-1.776-0.736L28.782,45.971    c-0.981-0.98-0.981-2.572,0-3.553L65.96,5.242c1.937-1.939,4.516-3.008,7.262-3.008c2.745,0,5.325,1.069,7.264,3.009l6.688,6.69    c4.002,4.003,4.003,10.519,0.001,14.524L49.998,63.635C49.527,64.105,48.888,64.371,48.222,64.371z M34.111,44.194l14.11,14.11    l35.399-35.399c2.043-2.046,2.044-5.375-0.001-7.42l-6.688-6.69c-0.99-0.991-2.308-1.537-3.71-1.537s-2.719,0.545-3.707,1.536    L34.111,44.194z" fill="#454B53"/></g><path d="M81.451,31.142c-0.643,0-1.286-0.246-1.776-0.736L62.009,12.744c-0.981-0.981-0.981-2.572,0-3.553   c0.98-0.98,2.572-0.981,3.553,0l17.666,17.662c0.981,0.981,0.981,2.572,0,3.553C82.737,30.896,82.095,31.142,81.451,31.142z" fill="#454B53"/><g><polygon fill="#E0F1F8" points="47.981,61.611 24.103,68.068 30.75,44.386   "/><path d="M24.103,70.58c-0.661,0-1.307-0.262-1.785-0.744c-0.636-0.643-0.878-1.576-0.634-2.447l6.647-23.682    c0.241-0.859,0.92-1.525,1.783-1.752c0.863-0.225,1.78,0.023,2.412,0.654l17.231,17.225c0.634,0.634,0.883,1.558,0.651,2.424    c-0.231,0.867-0.906,1.545-1.771,1.778l-23.879,6.457C24.542,70.552,24.321,70.58,24.103,70.58z M32.009,49.197l-4.292,15.291    l15.418-4.17L32.009,49.197z" fill="#454B53"/></g><path d="M48.178,46.75c-0.644,0-1.286-0.246-1.776-0.736c-0.981-0.981-0.981-2.572,0-3.554l17.182-17.179   c0.981-0.981,2.573-0.979,3.553,0c0.981,0.981,0.981,2.572,0,3.553L49.954,46.014C49.464,46.504,48.82,46.75,48.178,46.75z" fill="#454B53"/><path d="M76.967,88.355H3.313c-1.388,0-2.513-1.125-2.513-2.513V7.74c0-1.388,1.125-2.513,2.513-2.513h49.455   c1.388,0,2.513,1.125,2.513,2.513s-1.125,2.513-2.513,2.513H5.825V83.33h71.142c2.892,0,5.243-2.354,5.243-5.248V41.017   c0-1.388,1.125-2.513,2.513-2.513s2.513,1.125,2.513,2.513v37.065C87.235,83.747,82.629,88.355,76.967,88.355z" fill="#454B53"/></g>
          </svg>
          </span>
          <span class="icon-del">
          <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 91 91" height="24px" id="Layer_1" version="1.1" viewBox="0 0 91 91" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M16.142,90.613H68.39c3.418,0,6.197-2.779,6.197-6.195V29.52l-58.445-0.002V90.613z" fill="#647F94"/><path d="M58.431,42.701c0-1.547,1.254-2.801,2.801-2.801s2.803,1.254,2.803,2.801v37.295    c0,1.549-1.256,2.801-2.803,2.801s-2.801-1.252-2.801-2.801V42.701z M42.56,42.701c0-1.547,1.254-2.801,2.803-2.801    c1.545,0,2.799,1.254,2.799,2.801v37.295c0,1.549-1.254,2.801-2.799,2.801c-1.549,0-2.803-1.252-2.803-2.801V42.701z     M26.688,42.701c0-1.547,1.256-2.801,2.801-2.801c1.547,0,2.803,1.254,2.803,2.801v37.295c0,1.549-1.256,2.801-2.803,2.801    c-1.545,0-2.801-1.252-2.801-2.801V42.701z" fill="#95AEC2"/><rect fill="#6EC4A7" height="9.438" width="66.611" x="12.056" y="14.479"/><rect fill="#647F94" height="7.887" width="18.205" x="36.259" y="0.99"/></g></g>
          </svg>
          </span>
          <h5 class="card-title">${this.doctor}</h5>
          <p class="card-text">${this.fullName}</p>
        </div>
      </div>
    </div>
        `
    );
    renderVisitMore(this.id);
  }

  taskIsDone() {
    const checkbox = document.getElementById(`checkbox${this.id}`);
    checkbox.addEventListener("change", (e) => {
      getOneCards(this.id).then((card) => {
        if (e.target.checked) {
          card.isDone = "checked";
        } else {
          card.isDone = "";
        }

        updatePostOne(this.id, JSON.stringify(card));
      });
    });
  }

  removeTask() {
    const cardDiv = document.getElementById(`${this.id}`);
    const delBtn = cardDiv.querySelector(".icon-del");

    delBtn.addEventListener("click", () => {
      const toDelete = confirm("Remove task?");

      if (toDelete) {
        deleteCard(this.id);
        delBtn.closest(".visit_card").remove();
        localStorage.removeItem(`card ${this.id}`);

        if (!document.querySelector(".visit_card")) {
          document.querySelector("#filter").remove();
          document.querySelector(
            ".description"
          ).innerHTML = `<h1>No items have been added</h1>`;
        }
      }
    });
  }
  editTask() {
    const cardDiv = document.getElementById(`${this.id}`);
    const editBtn = cardDiv.querySelector(".icon-edit");
    const visitForm = document.querySelector("#visit-form");

    editBtn.addEventListener("click", () => {
      getOneCards(this.id).then((card) => {
        visitModal.show();
        let chooseDoctor = document.querySelector("#choose-doctor");

        if (card.doctor == "Стоматолог") {
          chooseDoctor.selectedIndex = "2";
        } else if (card.doctor == "Кардіолог") {
          chooseDoctor.selectedIndex = "1";
        } else if (card.doctor == "Терапевт") {
          chooseDoctor.selectedIndex = "3";
        }
        resetForm();
        let value = "";
        value = chooseDoctor.selectedIndex.toString();
        chooseDoctorForm(startedFormVisit, value);

        const inputs = visitForm.querySelectorAll("input");

        for (const [key, value] of Object.entries(card)) {
          inputs.forEach((input) => {
            if (input.id == key) {
              input.value = `${value}`;
            }
          });
          changeCard(card);
        }
      });
    });

    function changeCard(card) {
      const btnEdit = visitForm.querySelector("#saveChanges-edit");
      btnEdit.style.display = "block";
      visitForm.querySelector("#saveChanges").style.display = "none";
      btnEdit.addEventListener("click", () => {
        const doctor = document.querySelector("#choose-doctor").value;
        const nameThis = document.querySelector("#fullName").value;
        let doctorValue = "";
        if (doctor == "1") {
          doctorValue = "Кардіолог";
        } else if (doctor == "2") {
          doctorValue = "Стоматолог";
        } else if (doctor == "3") {
          doctorValue = "Терапевт";
        }

        localStorage.setItem(`card ${card.id}`, JSON.stringify(card));
        cardDiv.querySelector(".card-title").innerText = `${doctorValue}`;
        cardDiv.querySelector(".card-text").innerText = `${nameThis}`;

        updatePostOne(card.id, JSON.stringify(saveDataCard()));
      });
    }
  }
}

export class VisitDentist extends Visit {
  constructor(
    id,
    doctor,
    purpose,
    summary,
    fullName,
    urgence,
    isDone,
    lastVisitDate
  ) {
    super(id, doctor, purpose, summary, fullName, urgence, isDone);
    this.lastVisitDate = lastVisitDate;
  }
}

export class VisitCardiologist extends Visit {
  constructor(
    id,
    doctor,
    purpose,
    summary,
    fullName,
    urgence,
    isDone,
    bloodPressure,
    BMI,
    cardioDeseases,
    age
  ) {
    super(id, doctor, purpose, summary, fullName, urgence, isDone);
    this.bloodPressure = bloodPressure;
    this.BMI = BMI;
    this.cardioDeseases = cardioDeseases;
    this.age = age;
  }
}
export class VisitTherapist extends Visit {
  constructor(
    id,
    doctor,
    purpose,
    summary,
    fullName,
    urgence,
    isDone,
    age,
    lastVisitDate
  ) {
    super(id, doctor, purpose, summary, fullName, urgence, isDone);
    this.lastVisitDate = lastVisitDate;
    this.age = age;
  }
}
