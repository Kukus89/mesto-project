export const profileName = document.querySelector('.profile__name');
export const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileEdite = document.querySelector('.popup__form_editeProfile');
import { closePopup } from "./modal";
import { popupProfileName } from "./modal.js";
import { popupProfileSubtitle } from "./modal";
import { popupEditeProfile } from "./modal";

// Сохранение профиля
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopup(popupEditeProfile);
}
formProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);
