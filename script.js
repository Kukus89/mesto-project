let profile = document.querySelector('.profile');
let edite_button = profile.querySelector('.profile__edite-button');
let addCardButton = profile.querySelector('.profile__add-button');
let popup = document.querySelectorAll('.popup');
let closeButton = document.querySelectorAll('.popup__close-button');
let popup_profile_name = document.querySelector('.popup__profile_name');    // Поле ввода имени попапа 
let popup_profile_subtitle = document.querySelector('.popup__profile_subtitle'); // Поле ввода профессии попапа
let saveProfile = document.querySelector('.popup__submite-button');
let saveCard = document.querySelector('.popup__saveCard-button');
let profile_name = document.querySelector('.profile__name');
let profile_subtitle = document.querySelector('.profile__subtitle');


// Реализация функциональности проекта «Mesto» на JavaScript
// 1. Работа модальных окон

function editeProfileButtonClick() {
  popup_profile_name.value = profile_name.textContent;
  popup_profile_subtitle.value = profile_subtitle.textContent;
  popup[0].classList.add('popup_opened');
}
edite_button.addEventListener('click', editeProfileButtonClick);

function closePopupButtonClick() {  // Закрытие всех попапов "крестиком"
  let formItem = document.querySelectorAll('.popup__form-item')
  for (i = 0; i < popup.length; i++) {
    popup[i].classList.remove('popup_opened');
  }
  for (i = 0; i < formItem.length; i++) {
    formItem[i].value = '';
  }
}
for (i = 0; i < popup.length; i++) {
  closeButton[i].addEventListener('click', closePopupButtonClick);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profile_name.textContent = popup_profile_name.value;
  profile_subtitle.textContent = popup_profile_subtitle.value;
}
saveProfile.addEventListener('submit', formSubmitHandler);


// 2. Шесть карточек «из коробки»

let initialCards = [
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

function addCardDefault(placeName, srcPic) {
  let cardTemplate = document.querySelector('.templateElements').content;
  let elementsList = document.querySelector('.elements__list');
  let element = cardTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = srcPic;
  element.querySelector('.element__title').textContent = placeName;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })
  element.querySelector('.element__delete-button').addEventListener('click', function removeCard(e) {
    let dist = e.target.parentNode;
    dist.remove()
  });
  elementsList.append(element);
}
for (let i = 0; i < initialCards.length; i++) {
  addCardDefault(initialCards[i].name, initialCards[i].link)
}

// 3. Форма добавления карточки

// форма добавлена в разметку т.к. в тренажере не рекомендуется переводить разметку модальных окон в template.

function addCardButtonClick() {
  popup_profile_name.value = profile_name.textContent;
  popup_profile_subtitle.value = profile_subtitle.textContent;
  popup[1].classList.add('popup_opened');
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
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })
  element.querySelector('.element__delete-button').addEventListener('click', function removeCard(e) {
    let dist = e.target.parentNode;
    dist.remove()
  });
  elementsList.prepend(element);
  closePopupButtonClick();
}
saveCard.addEventListener('click', addCard);

// 5. Лайк карточки

// Код добавлен в пункты 2 и 4.

// 6. Удаление карточки

// Код добавлен в пункты 2 и 4.