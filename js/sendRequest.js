import { Visit } from "./class/classVisit.js";
import { renderFilter, resetFilters } from "./filter.js";
const token = "7dfef29f-0fd6-4312-83ac-0bf5499d8cd7";
const API = `https://ajax.test-danit.com/api/v2/cards`;

export const sendRequest = async (url, method = "GET", config) => {
  return await fetch(url, {
    method,
    ...config,
  }).then((response) => {
    if (response.ok) {
      if (method === "GET" || method === "POST" || method === "PUT") {
        return response.json();
      }
      return response;
    } else {
      return new Error("error");
    }
  });
};
export const getCards = () =>
  sendRequest(API, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getOneCards = (id) =>
  sendRequest(`${API}/${id}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updatePostOne = (id, requestBody) => {
  sendRequest(`${API}/${id}`, "PUT", {
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendPost = (requestBody) =>
  sendRequest(API, "POST", {
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteCard = (id) =>
  sendRequest(`${API}/${id}`, "DELETE", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getVisitCards = () => {
  getCards()
    .then((data) => {
      if (data.length) {
        document.querySelector(".description").innerHTML = "";
        renderFilter();
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
            card.renderVisit();
            card.taskIsDone();
            card.removeTask();

            card.editTask();
            if (document.querySelector("#filter")) {
              document
                .querySelector("#btnResetFilters")
                .addEventListener("click", (e) => {
                  e.preventDefault();
                  resetFilters(data);
                });
            }
          }
        );
      } else {
        document.querySelector(
          ".description"
        ).innerHTML = `<h1>No items have been added</h1>`;
      }
    })
    .catch((error) => {
      console.log(error.massage);
    })
    .finally(() => {
      document.querySelector(".loader").style.display = "none";
    });
};
