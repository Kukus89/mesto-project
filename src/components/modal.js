const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const avatarEditeButton = document.querySelector('.profile__edite-overlay')
const popupAvatarEdite = document.querySelector('.popup_edite-avatar')
export const profileName = document.querySelector('.profile__name');
export const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileEdite = document.forms['profile-edite-form'];
const popups = document.querySelectorAll('.popup')
export const popupProfileName = document.querySelector('.popup__profile_name');
export const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
export const popupEditeProfile = document.querySelector('.popup_edite-profile');
import { popupCardAdd } from "./card.js";
import { patchProfile, changeAvatar, getProfile } from "./fetch.js";

// Открытие попапа профиля
function openProfilePopup() {
  openPopup(popupEditeProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
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
  document.addEventListener('keydown', closeByEscape); //
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Закрытие попапов
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
  else return
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

// Сохранение профиля
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  patchProfile(popupProfileName.value, popupProfileSubtitle.value)
  getProfile()
  closePopup(popupEditeProfile);
}

formProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);

//открыть попап изменения авы
avatarEditeButton.addEventListener('click', () => {
  openPopup(popupAvatarEdite)
  const popupEditeAvatar = document.querySelector('.popup_edite-avatar');
  const popupSubmiteButtonEditeAvatar = popupEditeAvatar.querySelector('.popup__submite-button_edite-avatar');
  const inputEditeAvatarURL = popupEditeAvatar.querySelector('.popup__form-input');
  popupSubmiteButtonEditeAvatar.addEventListener('click', (evt) => {
    evt.preventDefault();
    showLoadingMessage(true, popupSubmiteButtonEditeAvatar)
    changeAvatar(inputEditeAvatarURL.value)
    // getProfile()
    closePopup(popupAvatarEdite)
  })
})

function showLoadingMessage(isLoading, element) {
  if (isLoading) {
    element.textContent = 'Сохранение'
  }
  else {

  }
}