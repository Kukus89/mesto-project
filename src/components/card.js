import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./defaultCards";
const popupAreaName = document.querySelector('.popup__area-name');
const imageSrc = document.querySelector('.popup__src-image');
const formCardAdd = document.querySelector('.popup__form_newCardAdd');
const newCardTemplate = document.querySelector('.templateElements').content;
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
const newCardAddPlace = document.querySelector('.elements__list');
export const popupCardAdd = document.querySelector('.popup_card-add');

// форма готовой карточки
function createCard(placeName, srcPic) {
  const element = newCardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image')
  elementImage.src = srcPic;
  element.querySelector('.element__title').textContent = placeName;
  element.querySelector('.element__delete-button').addEventListener('click', removeCard);
  elementImage.addEventListener('click', () => {
    popupPreviewImage.alt = placeName;
    popupPreviewImage.src = srcPic;
    imageSubtitle.textContent = popupPreviewImage.alt
    openPopup(popupPreview)
  });
  return element
}

// добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  newCardAddPlace.prepend(createCard(popupAreaName.value, imageSrc.value));
  closePopup(popupCardAdd);
  event.target.reset();
}

formCardAdd.addEventListener('submit', addNewCard);

// Шесть карточек «из коробки»
initialCards.forEach(element => {
  newCardAddPlace.prepend(createCard(element.name, element.link));
});

// Лайк карточки
function like(evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
}
newCardAddPlace.addEventListener('click', like)

// Удаление карточки
function removeCard(element) {
  element.target.closest('.element').remove();
}