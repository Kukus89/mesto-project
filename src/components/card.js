import { openPopup, profileName, closePopup } from "./modal.js";
export const cardsContainer = document.querySelector('.elements__list');
export const popupCardAdd = document.querySelector('.popup_card-add');
export const submiteButtonCardAdd = document.querySelector('.popup__submite-button_card-add');
const popupAreaName = document.querySelector('.popup__area-name');
const imageSrc = document.querySelector('.popup__src-image');
const formCardAdd = document.querySelector('.popup__container_newCardAdd');
const newCardTemplate = document.querySelector('.templateElements').content;
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
let userID = '';

// форма готовой карточки
export function createCard(newCardObject) {
  const element = newCardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete-button');
  const elementLikeQquantity = element.querySelector('.element__like-quantity');
  if (newCardObject.owner.name !== profileName.textContent) {
    elementDelete.remove();
  }
  elementImage.src = newCardObject.link;
  elementImage.alt = `Здесь должна быть фотография "${newCardObject.name}"`;
  elementLikeQquantity.textContent = newCardObject.likes.length;
  element.querySelector('.element__title').textContent = newCardObject.name;

  function clickElementDelete(evt) {
    evt.preventDefault()
    deleteCard(newCardObject._id, element)
      .then(() => {
        elementDelete.closest('.element').remove();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  elementDelete.addEventListener('click', clickElementDelete)

  newCardObject.likes.forEach(element => {
    if (element._id == userID) {
      elementLike.classList.toggle('element__like_active');
    }
  })

  elementLike.addEventListener('click', () => {
    if (!elementLike.classList.contains('element__like_active')) {
      addLike(newCardObject._id)
        .then((res) => {
          elementLike.classList.toggle('element__like_active');
          elementLikeQquantity.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    } else {
      deleteLike(newCardObject._id)
        .then((res) => {
          elementLike.classList.toggle('element__like_active');
          elementLikeQquantity.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    }
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
  submiteButtonCardAdd.textContent = 'Сохранение';
  postNewCard(popupAreaName.value, imageSrc.value)
    .then((obj) => {
      const newCardObject = obj
      cardsContainer.prepend((createCard(newCardObject)))
    })
    .then((obj) => {
      closePopup(submiteButtonCardAdd.closest('.popup'))
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      submiteButtonCardAdd.textContent = 'Сохранить'
    })
  event.target.reset();
}

formCardAdd.addEventListener('submit', addNewCard);