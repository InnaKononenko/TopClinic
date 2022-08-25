"use strict";
import { login } from "./logIn.js";
import { newModal } from "./class/classModal.js";
import { getVisitCards } from "./sendRequest.js";
import { createForm, resetForm } from "./class/classVisitForm.js";
export const cardsRow = document.querySelector(".row");
const btnExit = document.querySelector("#exit");
newModal.renderModalWindow();

createForm();

export const btnOpenModal = document.querySelector("#modal-window");
export const modal = new bootstrap.Modal(document.querySelector("#modal"), {
  keyboard: true,
  focus: true,
});

btnOpenModal.addEventListener("click", () => {
  modal.show();
});

login();
reboot();

const closeOpenModal = document.querySelector(".close");
closeOpenModal.addEventListener("click", function () {
  modal.hide();
});

const btnOpenVisit = document.querySelector("#visit-open");
export const visitModal = new bootstrap.Modal(
  document.querySelector("#visit-modal"),
  {
    keyboard: true,
    focus: true,
    backdrop: true,
  }
);
const closeOpenVisitModal = document.querySelector(".close-visit");
const closeOpenVisitModalTwo = document.querySelector(".close-modal-visit");

const closeOpenVisitModalEdit = document.querySelector("#saveChanges-edit");

btnOpenVisit.addEventListener("click", () => {
  visitModal.show();
  document.querySelector("#error-modal").style.display = "none";
  document.visitStartForm.reset();
  resetForm();
});

closeOpenVisitModal.addEventListener("click", () => {
  visitModal.hide();
});
closeOpenVisitModalTwo.addEventListener("click", () => {
  visitModal.hide();
});

closeOpenVisitModalEdit.addEventListener("click", () => {
  visitModal.hide();
});

function reboot() {
  if (localStorage.getItem("login") && localStorage.getItem("Password")) {
    document.querySelector("#visit-open").style.display = "block";
    document.querySelector(".loader").style.display = "block";
    btnExit.style.display = "block";
    document.querySelector(".advantage").style.display = "none";
    btnOpenModal.style.display = "none";
    getVisitCards();
  }
}

btnExit.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("login");
  localStorage.removeItem("Password");
  document.querySelector("#filter").remove();
  cardsRow.innerHTML = "";
  document.querySelector(".advantage").style.display = "block";
  btnExit.style.display = "none";
  btnOpenVisit.style.display = "none";
  btnOpenModal.style.display = "block";
});
