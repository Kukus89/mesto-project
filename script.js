const profile = document.querySelector('.profile');
const editeButton = profile.querySelector('.profile__edite-button');
const addCardButton = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupProfileName = document.querySelector('.popup__profile_name');
const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle'); 
const saveProfile = document.querySelector('.popup__submite-button');
const saveCard = document.querySelector('.popup__saveCard-button');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formItems = document.querySelectorAll('.popup__form-item')
const picc = document.querySelector('.popup__preview-image  ');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');


// Реализация функциональности проекта «Mesto» на JavaScript
// 1. Работа модальных окон

function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popups[0].classList.add('popup_opened');
}
editeButton.addEventListener('click', editeProfileButtonClick);

function closePopupButtonClick() {  // Закрытие всех попапов "крестиком"
  for (i = 0; i < popups.length; i++) {
    popups[i].classList.remove('popup_opened');
  }
  for (i = 0; i < formItems.length; i++) {
    formItems[i].value = '';
  }
}

for (i = 0; i < popups.length; i++) {
  closeButtons[i].addEventListener('click', closePopupButtonClick);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileame.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
}
saveProfile.addEventListener('submit', formSubmitHandler);


// 2. Шесть карточек «из коробки»

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Задания не по порядку т.к. вызов функции после её объявления
// 5. Лайк карточки

function cardLike(e) {
  e.target.classList.toggle('element__like_active')
}

// 6. Удаление карточки

function removeCard(e) {
  const dist = e.target.parentNode;
  dist.remove()
}

// 7. Попап картинки


function popupImage(e) {
  const parent = e.target.parentNode;
  picc.alt = parent.querySelector('.element__title').textContent;
  picc.src = parent.querySelector('.element__image').src;
  imageSubtitle.textContent = picc.alt
  popups[2].classList.add('popup_opened');
}

function addCardDefault(placeName, srcPic) {
  const cardTemplate = document.querySelector('.templateElements').content;
  const elementsList = document.querySelector('.elements__list');
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = srcPic;
  element.querySelector('.element__title').textContent = placeName;
  element.querySelector('.element__like').addEventListener('click', cardLike)
  elementsList.append(element);
  element.querySelector('.element__delete-button').addEventListener('click', removeCard);
  element.querySelector('.element__image').addEventListener('click', popupImage);
}
for (let i = 0; i < initialCards.length; i++) {
  addCardDefault(initialCards[i].name, initialCards[i].link)
}

// 3. Форма добавления карточки

// форма добавлена в разметку т.к. в тренажере не рекомендуется переводить разметку модальных окон в template.

function addCardButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popups[1].classList.add('popup_opened');
}
addCardButton.addEventListener('click', addCardButtonClick);

// 4. Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  const elementsList = document.querySelector('.elements__list');
  const cardTemplate = document.querySelector('.templateElements').content;
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = document.querySelector('.popup__src-image').value;
  element.querySelector('.element__title').textContent = document.querySelector('.popup__area-name').value;
  element.querySelector('.element__like').addEventListener('click', cardLike)
  element.querySelector('.element__delete-button').addEventListener('click', removeCard);
  element.querySelector('.element__image').addEventListener('click', popupImage);
  elementsList.prepend(element);
  closePopupButtonClick();
}
saveCard.addEventListener('click', addCard);




