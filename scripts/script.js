const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const popupProfileName = document.querySelector('.popup__profile_name');
const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
const popupSubmitSaveProfileButton = document.querySelector('.popup__submite-button_profile-save');
const popupSubmitAddCardButton = document.querySelector('.popup__submite-button_card-add');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formItems = document.querySelectorAll('.popup__form-item')
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
const popupEditeProfile = document.querySelector('.popup_edite-profile');
const popupCardAdd = document.querySelector('.popup_card-add');

// Реализация функциональности проекта «Mesto» на JavaScript
// 1. Работа модальных окон

function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popupEditeProfile.classList.add('popup_opened');
}
buttonEditeProfile.addEventListener('click', editeProfileButtonClick);

// Закрытие всех попапов "крестиком"

function closePopupButtonClick(e) {
  for (i = 0; i < popups.length; i++) {
    popups[i].classList.remove('popup_opened');
  }
  for (i = 0; i < formItems.length; i++) {
    formItems[i].value = '';
  }
}
for (i = 0; i < popups.length; i++) {
  buttonsClose[i].addEventListener('click', closePopupButtonClick);
}

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  popupEditeProfile.classList.remove('popup_opened');
}
popupSubmitSaveProfileButton.addEventListener('click', handleSubmitEditProfileForm );

// 2. Шесть карточек «из коробки»

//Задания не по порядку т.к. вызов функции после её объявления
// 5. Лайк карточки

function like(e) {
  e.target.classList.toggle('element__like_active')
}

// 6. Удаление карточки

function removeCard(e) {
  const cardAdded = e.target.parentNode;
  cardAdded.remove()
}

// 7. Попап картинки

function popupImage(e) {
  const parent = e.target.parentNode;
  popupPreviewImage.alt = parent.querySelector('.element__title').textContent;
  popupPreviewImage.src = parent.querySelector('.element__image').src;
  imageSubtitle.textContent = popupPreviewImage.alt
  popups[2].classList.add('popup_opened');
}

function addCardDefault(placeName, srcPic) {
  const newCardTemplate = document.querySelector('.templateElements').content;
  const newCardAddPlace = document.querySelector('.elements__list');
  const newCardTemplateElement = newCardTemplate.querySelector('.element').cloneNode(true);
  newCardTemplateElement.querySelector('.element__image').src = srcPic;
  newCardTemplateElement.querySelector('.element__title').textContent = placeName;
  newCardTemplateElement.querySelector('.element__like').addEventListener('click', like);
  newCardAddPlace.append(newCardTemplateElement);
  newCardTemplateElement.querySelector('.element__delete-button').addEventListener('click', removeCard);
  newCardTemplateElement.querySelector('.element__image').addEventListener('click', popupImage);
}
for (let i = 0; i < initialCards.length; i++) {
  addCardDefault(initialCards[i].name, initialCards[i].link)
}

// 3. Форма добавления карточки

// форма добавлена в разметку т.к. в тренажере не рекомендуется переводить разметку модальных окон в template.

function addCardButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popupCardAdd.classList.add('popup_opened');
}
buttonAddCard.addEventListener('click', addCardButtonClick);

// 4. Добавление карточки

// При замене события 'клик' на 'Сабмит' происходит обновление страницы, и новая крточка сбрасывается

function addCard(evt) {
  evt.preventDefault();
  const newCardAddPlace = document.querySelector('.elements__list');
  const newCardTemplate = document.querySelector('.templateElements').content;
  const element = newCardTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = document.querySelector('.popup__src-image').value;
  element.querySelector('.element__title').textContent = document.querySelector('.popup__area-name').value;
  element.querySelector('.element__like').addEventListener('click', like)
  element.querySelector('.element__delete-button').addEventListener('click', removeCard);
  element.querySelector('.element__image').addEventListener('click', popupImage);
  newCardAddPlace.prepend(element);
  closePopupButtonClick();
}
popupSubmitAddCardButton.addEventListener('submit', addCard);
