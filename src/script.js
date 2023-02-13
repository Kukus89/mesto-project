import "../src/index.css";
import "./components/card.js"
import "./components/validate.js"
import "./components/modal.js"
import { closePopup } from "./components/modal.js";
export const profile = document.querySelector('.profile');
export const popupProfileName = document.querySelector('.popup__profile_name');
export const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
export const profileName = document.querySelector('.profile__name');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const popupEditeProfile = document.querySelector('.popup_edite-profile');
export const popupCardAdd = document.querySelector('.popup_card-add');
const formProfileEdite = document.querySelector('.popup__form_editeProfile');

// Сохранение профиля
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopup(popupEditeProfile);
}
formProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);


