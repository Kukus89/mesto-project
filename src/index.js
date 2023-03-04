import "../src/index.css";
import "./components/card.js";
import "./components/validate.js";
import "./components/modal.js";
import "./components/api.js";
import { enableValidation, validationParams } from "./components/validate.js"
import { getProfile, initialCards } from "./components/api.js";
import { profileName, profileSubtitle } from "./components/modal.js";
import { cardsContainer, createCard } from "./components/card.js";
export const profileAvatar = document.querySelector('.profile__avatar');


enableValidation(validationParams);

Promise.all([getProfile(), initialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    cards.forEach(element => {
      cardsContainer.prepend(createCard(element))
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })





















