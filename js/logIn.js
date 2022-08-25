import { autorisation } from "./dataBase/autorisation.js";
import { modal } from "./main.js";
import { btnOpenModal } from "./main.js";
import { getCards, getVisitCards } from "./sendRequest.js";

function dataStorage(loginValue, passwordValue) {
  localStorage.setItem("login", loginValue);
  localStorage.setItem("Password", passwordValue);
}

function validLogin(modalWind, description, modalError) {
  const usName = modalWind.querySelector('[name="uname"]').value;
  const usPassword = modalWind.querySelector('[name="psw"]').value;
  autorisation.forEach(({ login, password }) => {
    if (
      login.includes(usName) &&
      password.includes(usPassword) &&
      usName !== "" &&
      usPassword !== ""
    ) {
      dataStorage(usName, usPassword);
      modal.hide();
      document.querySelector("#visit-open").style.display = "block";
      document.querySelector("#exit").style.display = "block";
      btnOpenModal.style.display = "none";
      document.querySelector(".advantage").style.display = "none";
      getVisitCards();
    } else {
      modalError.style.display = "block";
    }
  });
}

export function login() {
  const modalWind = document.querySelector("#modal");
  const description = document.querySelector(".description");
  const buttonSubmit = modalWind.querySelector('[type="submit"]');
  const modalError = document.querySelector(".modal-error");

  buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    validLogin(modalWind, description, modalError);
  });
  document.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      validLogin(modalWind, description, modalError);
    }
  });
}
