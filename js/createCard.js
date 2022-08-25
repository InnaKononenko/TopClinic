import {
  VisitDentist,
  VisitCardiologist,
  VisitTherapist,
  Visit,
} from "./class/classVisit.js";
import { visitModal } from "./main.js";
import { sendPost } from "./sendRequest.js";
import { getCards } from "./sendRequest.js";
import { cardsRow } from "./main.js";
import { renderFilter, resetFilters } from "./filter.js";

let count = "1";

export function saveDataCard() {
  const doctor = document.querySelector("#choose-doctor").value;
  if (document.querySelector(".description")) {
    document.querySelector(".description").innerHTML = "";
  }
  const purpose = document.querySelector("#purpose").value;
  const summary = document.querySelector("#summary").value;
  const fullName = document.querySelector("#fullName").value;
  const urgence = document.querySelector("#urgence").value;
  const isDone = "";
  let card = null;
  switch (doctor) {
    case "1":
      const bloodPressure = document.querySelector("#bloodPressure").value;
      const BMI = document.querySelector("#BMI").value;
      const cardioDeseases = document.querySelector("#cardioDeseases").value;
      const age = document.querySelector("#age").value;
      card = new VisitCardiologist(
        `${count++}`,
        "Кардіолог",
        purpose,
        summary,
        fullName,
        urgence,
        isDone,
        bloodPressure,
        BMI,
        cardioDeseases,
        age
      );
      break;
    case "2":
      const lastVisitDate = document.querySelector("#lastVisitDate").value;
      card = new VisitDentist(
        `${count++}`,
        "Стоматолог",
        purpose,
        summary,
        fullName,
        urgence,
        isDone,
        lastVisitDate
      );
      break;
    case "3":
      const age2 = document.querySelector("#age").value;
      card = new VisitTherapist(
        `${count++}`,
        "Терапевт",
        purpose,
        summary,
        fullName,
        urgence,
        isDone,
        age2
      );
      break;
  }
  return card;
}

function checkFilledFields() {
  const form = document.querySelector("#visit-form");
  const inputs = form.querySelectorAll("input");

  const emptyInput = [...inputs].filter((input) => input.value.length <= 0);
  const doctor = document.querySelector("#choose-doctor").value;
  const urgence = document.querySelector("#urgence").value;
  return (
    emptyInput > "0" || doctor == "Оберіть лікаря" || urgence == "терміновість"
  );
}

export const createCard = () => {
  const saveChanges = document.querySelector("#saveChanges");
  saveChanges.addEventListener("click", () => {
    const emptyFields = checkFilledFields();
    if (emptyFields) {
      showErr();
    } else {
      visitModal.hide();
      const card = saveDataCard();

      (async () => {
        await sendPost(JSON.stringify(card));

        let arrCards = [];

        await getCards()
          .then((data) => {
            console.log(data);
            cardsRow.innerHTML = "";
            data.forEach(
              ({ id, doctor, purpose, summary, fullName, urgence, isDone }) => {
                let card = new Visit(
                  id,
                  doctor,
                  purpose,
                  summary,
                  fullName,
                  urgence,
                  isDone
                );

                arrCards.push(card);
                saveInLocal(arrCards);

                card.renderVisit();
                card.taskIsDone();

                card.removeTask();
                card.editTask();

                if (!document.querySelector("#filter")) {
                  renderFilter();
                } else {
                  document
                    .querySelector("#btnResetFilters")
                    .addEventListener("click", (e) => {
                      e.preventDefault();
                      resetFilters(data);
                    });
                }
              }
            );
          })
          .catch((error) => {
            console.log(error.massage);
          })
          .finally(() => {
            document.querySelector(".loader").style.display = "none";
          });
      })();
    }
  });
};

function saveInLocal(arr) {
  arr.forEach((el) => {
    localStorage.setItem(`card ${el.id}`, JSON.stringify(el));
  });
}
function showErr() {
  const errModal = document.querySelector("#error-modal");
  errModal.style.display = "block";

  const form = document.querySelector("#visit-form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((el) => {
    el.addEventListener("input", () => {
      errModal.style.display = "none";
    });
  });
}
