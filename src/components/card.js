import { openPopup, closePopup } from "./modal.js";
const popupAreaName = document.querySelector('.popup__area-name');
const imageSrc = document.querySelector('.popup__src-image');
const formCardAdd = document.querySelector('.popup__container_newCardAdd');
const newCardTemplate = document.querySelector('.templateElements').content;
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
export const cardsContainer = document.querySelector('.elements__list');
export const popupCardAdd = document.querySelector('.popup_card-add');

// форма готовой карточки
export function createCard(placeName, srcPic) {
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
  cardsContainer.prepend(createCard(popupAreaName.value, imageSrc.value));
  closePopup(popupCardAdd);
  event.target.reset();
}

formCardAdd.addEventListener('submit', addNewCard);

