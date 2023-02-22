const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileEdite = document.forms['profile-edite-form'];
export const popupProfileName = document.querySelector('.popup__profile_name');
export const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
export const popupEditeProfile = document.querySelector('.popup_edite-profile');
import { popupCardAdd } from "./card.js";
import { enableValidation, validationParams } from "./validate";

// Открытие попапа профиля
function openProfilePopup() {
  openPopup(popupEditeProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  enableValidation(validationParams); 
}
buttonEditeProfile.addEventListener('click', openProfilePopup);

// Попап формы добавления карточки
function openCardPopup() {
  openPopup(popupCardAdd);
}
buttonAddCard.addEventListener('click', openCardPopup);

// Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeByEscape);
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('click', closeByEscape);
}

//Закрытие попапов
function closeByEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if ((openedPopup !== null) && (evt.key === 'Escape')) {
    closePopup(openedPopup);
  }
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(openedPopup)
  }
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(openedPopup)
  }
  else return
}

// Сохранение профиля
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopup(popupEditeProfile);
}

formProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);

