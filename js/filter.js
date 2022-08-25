import { getCards } from "./sendRequest.js";
export const renderFilter = () => {
  document.querySelector(".row").insertAdjacentHTML(
    "beforebegin",
    `
    <form name="validateForm" id="filter" class="input-group needs-validation" novalidate>
    <div class="btn-group" role="group" aria-label="Basic example">
      <input
        id="wordSearch"
        class="form-control"
        placeholder="шукати по ключовому слову"
        aria-describedby="basic-addon1"
      />
      <select
        id="isDone"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected>По статусу візиту</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select>
      <select
        id="priority"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected>По пріоритету</option>
        <option value="звичайна">звичайна</option>
        <option value="пріоритетна">пріоритетна</option>
        <option value="невідкладна">невідкладна</option>
      </select>
      <div class="form-footer-btn">
      <button id="btnSearch" class="btn btn-search" type="submit">
        Шукати
      </button>
      <button id="btnResetFilters" class="btn btn-reset" type="submit">Скинути</button>
      </div>
    </div>
  </form>
  <div id="error-modal-filter">
   <div class="alert alert-danger" role="alert" data-bs-dismiss="alert">
    Співпадінь не знайдено
    </div></div>
`
  );
  document.querySelector("#btnSearch").addEventListener("click", (e) => {
    e.preventDefault();
    filter();
  });
};

export const filter = () => {
  getCards().then((data) => {
    document.querySelectorAll(".visit_card").forEach((el) => {
      el.style.display = "block";
    });
    const keyword = document.querySelector("#wordSearch").value;
    const isDoneOption = document.querySelector("#isDone").value;
    const priorityOption = document.querySelector("#priority").value;

    if (
      keyword != "" &&
      isDoneOption != "По статусу візиту" &&
      priorityOption !== "По пріоритету"
    ) {
      const result = data.filter((card) => {
        let { purpose, summary, isDone, urgence } = card;
        let isDonValue = "";
        if (isDone === "checked") {
          isDonValue = "done";
        } else if (isDone === "") {
          isDonValue = "open";
        }

        if (
          (purpose.includes(keyword) || summary.includes(keyword)) &&
          isDoneOption == isDonValue &&
          urgence == priorityOption
        ) {
          return card;
        }
      });
      if (result.length > 0) {
        sort(data, result);
      } else {
        showError(data);
      }
    } else if (keyword != "") {
      const resultWord = data.filter((card) => {
        let { purpose, summary } = card;
        if (purpose.includes(keyword) || summary.includes(keyword)) {
          return card;
        }
      });
      if (resultWord.length > 0) {
        sort(data, resultWord);
      } else {
        showError(data);
      }
    } else if (isDoneOption !== "По статусу візиту") {
      const resultDone = data.filter((card) => {
        let { isDone } = card;
        let isDonValue = "";
        if (isDone === "checked") {
          isDonValue = "done";
        } else if (isDone === "") {
          isDonValue = "open";
        }

        if (isDoneOption == isDonValue) {
          return card;
        }
      });
      if (resultDone.length > 0) {
        sort(data, resultDone);
      } else {
        showError(data);
      }
    } else if (priorityOption !== "По пріоритету") {
      const resultRriority = data.filter((card) => {
        let { urgence } = card;
        if (urgence == priorityOption) {
          return card;
        }
      });
      if (resultRriority.length > 0) {
        sort(data, resultRriority);
      } else {
        showError();
      }
    }
  });
  document.body.addEventListener("click", (e) => {
    if (e.target !== document.querySelector("#btnSearch")) {
      document.querySelector("#error-modal-filter").style.display = "none";
      document.querySelectorAll(".visit_card").forEach((el) => {
        el.style.display = "block";
      });
    }
  });
};

function sort(data, result) {
  if (result.length > 0 && result.length < data.length) {
    data.forEach((element) => {
      if (!result.includes(element)) {
        document.getElementById(`${element.id}`).style.display = "none";
      }
    });
  } else if (result.length == data.length) {
    data.forEach((element) => {
      document.getElementById(`${element.id}`).style.display = "block";
    });
  }

  document.validateForm.reset();

  document.querySelector("#btnResetFilters").addEventListener("click", (e) => {
    e.preventDefault();
    resetFilters(data);
  });
}

function showError() {
  document.validateForm.reset();
  document.querySelector("#error-modal-filter").style.display = "block";
}
export const resetFilters = (data) => {
  data.forEach((element) => {
    document.getElementById(`${element.id}`).style.display = "block";
    document.validateForm.reset();
  });
};
