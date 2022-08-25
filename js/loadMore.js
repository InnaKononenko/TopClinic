import { getOneCards } from "./sendRequest.js";

export const renderVisitMore = (id) => {
  const cardDiv = document.getElementById(`${id}`);
  const btnLoadMore = document.createElement("button");

  btnLoadMore.innerText = "Load more";
  btnLoadMore.classList.add("btn", "btn-color", "btn-load-more");
  cardDiv.querySelector(".card-body").append(btnLoadMore);

  btnLoadMore.addEventListener("click", (e) => {
    getOneCards(id).then(
      ({
        doctor,
        purpose,
        summary,
        fullName,
        urgence,
        isDone,
        lastVisitDate,
        bloodPressure,
        BMI,
        cardioDeseases,
        age,
      }) => {
        const textloadMore = document.createElement("div");
        cardDiv.append(textloadMore);

        textloadMore.insertAdjacentHTML(
          "afterend",
          ` <div
          class="modal fade modal-sm modal-load-more "
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"> ${doctor}</h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-input">
                  <div>ФІО:  ${fullName}</div>
                  <div>Мета візиту: ${purpose}</div>
                  <div>Короткий опис: ${summary}</div>
                  <div>Терміновість: ${urgence}</div>
                  <div class = "container-input__more text-center"></div>
                  </div>
              </div>
            </div>
          </div>
        </div>`
        );
        const container = cardDiv.querySelector(".container-input__more");
        container.innerHTML = "";
        if (doctor == "Стоматолог") {
          container.insertAdjacentHTML(
            "beforeend",
            `<div>Дата останнього візиту: ${lastVisitDate}</div>`
          );
        } else if (doctor == "Терапевт") {
          container.insertAdjacentHTML("beforeend", ` <div>Вік: ${age}</div>`);
        } else if (doctor == "Кардіолог") {
          container.insertAdjacentHTML(
            "beforeend",
            `     <div>Вік: ${age}</div>
                  <div>Тиск: ${bloodPressure}</div>
                  <div>ІМТ: ${BMI}</div>
                  <div>Серцево-судинні захворювання: ${cardioDeseases}</div>`
          );
        }

        const modalMore = new bootstrap.Modal(
          cardDiv.querySelector(".modal-load-more"),
          {
            keyboard: true,
            focus: true,
            backdrop: true,
          }
        );

        modalMore.show();
        closeModal(modalMore);
      }
    );
  });
};
function closeModal(modal) {
  const closeModal = document.querySelectorAll(".close");
  closeModal.forEach((elem) => {
    elem.addEventListener("click", () => {
      modal.hide();
    });
  });
}
