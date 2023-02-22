import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./defaultCards";
const popupAreaName = document.querySelector('.popup__area-name');
const imageSrc = document.querySelector('.popup__src-image');
const formCardAdd = document.querySelector('.popup__container_newCardAdd');
const newCardTemplate = document.querySelector('.templateElements').content;
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
const cardsContainer = document.querySelector('.elements__list');
export const popupCardAdd = document.querySelector('.popup_card-add');

// форма готовой карточки
function createCard(placeName, srcPic) {
  const element = newCardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete-button')
  elementImage.src = srcPic;
  elementImage.alt = `Здесь должна быть фотография "${placeName}"`;
  element.querySelector('.element__title').textContent = placeName;
  elementDelete.addEventListener('click', () => {
    elementDelete.closest('.element').remove();
  })
  elementLike.addEventListener('click', () => {
    elementLike.classList.toggle('element__like_active')
  })
  elementImage.addEventListener('click', () => {
    popupPreviewImage.alt = `Здесь должна быть фотография "${placeName}"`;
    popupPreviewImage.src = srcPic;
    imageSubtitle.textContent = placeName;
    openPopup(popupPreview);
  });
  return element
}

// добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const button = event.target.querySelector('.popup__submite-button');
  cardsContainer.prepend(createCard(popupAreaName.value, imageSrc.value));
  closePopup(popupCardAdd);
  event.target.reset();
  button.classList.add('popup__submite-button_disabled');
  button.disabled = true;
}

formCardAdd.addEventListener('submit', addNewCard);

// Шесть карточек «из коробки»
initialCards.forEach(element => {
  cardsContainer.prepend(createCard(element.name, element.link));
});
