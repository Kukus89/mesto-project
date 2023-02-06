const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const popupProfileName = document.querySelector('.popup__profile_name');
const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupPreviewImage = document.querySelector('.popup__preview-image');
const imageSubtitle = document.querySelector('.popup__preview-image-subtitle');
const popupEditeProfile = document.querySelector('.popup_edite-profile');
const popupCardAdd = document.querySelector('.popup_card-add');
const newCardAddPlace = document.querySelector('.elements__list');
const formProfileEdite = document.querySelector('.popup__form_editeProfile');
const formCardAdd = document.querySelector('.popup__form_newCardAdd');
const newCardTemplate = document.querySelector('.templateElements').content;
const popupPreview = document.querySelector('.popup_preview');
const closeButton = document.querySelector('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const popupAreaName = document.querySelector('.popup__area-name');
const imageSrc = document.querySelector('.popup__src-image');
const newCardForm = document.forms.newCardForm;

// Открытие попапа профиля
function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEditeProfile);
}
buttonEditeProfile.addEventListener('click', editeProfileButtonClick);

// Сохранение профиля
function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopup(popupEditeProfile);
}
formProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);

// 3. Попап формы добавления карточки
function addCardButtonClick() {
  openPopup(popupCardAdd);
}
buttonAddCard.addEventListener('click', addCardButtonClick);

// 4. Добавление карточек
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
  newCardForm.reset()
}

formCardAdd.addEventListener('submit', addNewCard);

// 2. Шесть карточек «из коробки»
initialCards.forEach(element => {
  newCardAddPlace.prepend(createCard(element.name, element.link));
});

// 5. Лайк карточки
function like (evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
}
newCardAddPlace.addEventListener('click', like)

// 6. Удаление карточки
function removeCard(element) {
  element.target.closest('.element').remove();
}

// Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

// Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

// Функция закрытия попапов "Крестиком"
popups.forEach(element => {
  const closeButton = element.querySelector('.popup__close-button')
  closeButton.addEventListener('click', () => {
    closePopup(element);
  })
});



