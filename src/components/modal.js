const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
export const popupProfileName = document.querySelector('.popup__profile_name');
export const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
export const popupEditeProfile = document.querySelector('.popup_edite-profile');
import { formListener } from "./validate.js";
import { profileName } from "./utils.js";
import { profileSubtitle } from "./utils.js";
import { popupCardAdd } from "./card.js";

// Открытие попапа профиля
function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  // formListener() // иначе не пройдет валидацию и сабмит будет активным
  openPopup(popupEditeProfile);

}
buttonEditeProfile.addEventListener('click', editeProfileButtonClick);

// Попап формы добавления карточки
function addCardButtonClick() {
  openPopup(popupCardAdd);
}
buttonAddCard.addEventListener('click', addCardButtonClick);

// Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  closeByKey(popupElement);
  closeByClickBehind(popupElement);
  closeByCross(popupElement)
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

// Функция закрытия попапов "Крестиком"

function closeByCross(popup) {
  const closeButton = popup.querySelector('.popup__close-button')
  closeButton.addEventListener('click', () => {
    closePopup(popup);
 })
}

//Закрытие попапа Искейпом
function closeByKey(popup) {
  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
      closePopup(popup)
    }
  })
}
//Закрытие попапа кликом вне
function closeByClickBehind(element) {
  element.addEventListener('click', (e) => {
    const targetForm = element.querySelector('.popup__form')
    const shadowClick = e.composedPath().includes(targetForm);
    if (!shadowClick) {
      closePopup(element)
    }
  })
}

