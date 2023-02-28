import { openPopup, closePopup } from "./modal.js";
import { postNewCard } from "./fetch.js";
import { profileName } from "./modal";
import { deleteCard } from "./fetch.js";
const popupAreaName = document.querySelector('.popup__area-name');
const imageSrc = document.querySelector('.popup__src-image');
const formCardAdd = document.querySelector('.popup__container_newCardAdd');
const newCardTemplate = document.querySelector('.templateElements').content;
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
const popupConfirmDelete = document.querySelector('.popup_confirm-delete');
export const cardsContainer = document.querySelector('.elements__list');
export const popupCardAdd = document.querySelector('.popup_card-add');

// форма готовой карточки
export function createCard(newCardObject) {
  const element = newCardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete-button')
  const elementLikeQquantity = element.querySelector('.element__like-quantity')
  if (newCardObject.owner.name !== profileName.textContent) {
    elementDelete.remove()
  }
  elementImage.src = newCardObject.link;
  elementImage.alt = `Здесь должна быть фотография "${newCardObject.name}"`;
  elementLikeQquantity.textContent = newCardObject.likes.length;
  element.querySelector('.element__title').textContent = newCardObject.name;
  elementDelete.addEventListener('click', () => {
    // openPopup(popupConfirmDelete);
    // console.log(newCardId);
    deleteCard(newCardId)
    // elementDelete.closest('.element').remove();///
  })
  elementLike.addEventListener('click', () => {
    elementLike.classList.toggle('element__like_active')
  })
  elementImage.addEventListener('click', () => {
    popupPreviewImage.alt = `Здесь должна быть фотография "${newCardObject.name}"`;
    popupPreviewImage.src = newCardObject.link;
    imageSubtitle.textContent = newCardObject.name;
    openPopup(popupPreview);
  });
  return element
}

// добавление новой карточки
export function addNewCard(event) {
  event.preventDefault();
  postNewCard(popupAreaName.value, imageSrc.value);
  closePopup(popupCardAdd);
  event.target.reset();
}

formCardAdd.addEventListener('submit', addNewCard);