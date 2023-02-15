const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
import { popupProfileName } from "../index.js";
import { popupProfileSubtitle } from "../index.js";
import { popupEditeProfile } from "../index.js";
import { formListener } from "./validate";
import { profileName } from "../index.js";
import { profileSubtitle } from "../index.js";
import { popupCardAdd } from "../index.js";

// Открытие попапа профиля
function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  formListener() // иначе не пройдет валидацию и сабмит будет активным
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
  closeByKey();
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

// Функция закрытия попапов "Крестиком"
popups.forEach(element => {
  const closeButton = element.querySelector('.popup__close-button')
  closeButton.addEventListener('click', () => {
    closePopup(element);
  })
});

//Закрытие попапа Искейпом и кликом вне

function closeByKey(params) {
  popups.forEach(element => {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        closePopup(element)
      }
    })
    element.addEventListener('click', (e) => {
      const targetForm = element.querySelector('.popup__form')
      const shadowClick = e.composedPath().includes(targetForm);
      if (!shadowClick) {
        closePopup(element)
      }
    })
  })
}

