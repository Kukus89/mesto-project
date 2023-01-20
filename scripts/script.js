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
const popupPreiw = document.querySelector('.popup_preview')


// Открытие попапа профиля

function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popupEditeProfile.classList.add('popup_opened');
  document.querySelector('.popup__close-button-profile').addEventListener('click', () => {
    popupEditeProfile.classList.remove('popup_opened');
  })
}
buttonEditeProfile.addEventListener('click', editeProfileButtonClick);

// Сохранение профиля

function handleSubmitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  popupEditeProfile.classList.remove('popup_opened');
}
formProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);

// 3. Попап формы добавления карточки

function addCardButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popupCardAdd.classList.add('popup_opened');
  document.querySelector('.popup__close-button-cardAddForm').addEventListener('click', () => {
    popupCardAdd.classList.remove('popup_opened');
  })
}
buttonAddCard.addEventListener('click', addCardButtonClick);

// 4. Добавление карточек

// форма готовой карточки
function addCard(placeName, srcPic) {
  const element = newCardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image')
  elementImage.src = srcPic;
  element.querySelector('.element__title').textContent = placeName;
  element.querySelector('.element__like').addEventListener('click', like)
  element.querySelector('.element__delete-button').addEventListener('click', removeCard);
  elementImage.addEventListener('click', () => {
    popupPreviewImage.alt = placeName;
    popupPreviewImage.src = srcPic;
    imageSubtitle.textContent = popupPreviewImage.alt
    popupPreiw.classList.add('popup_opened');
    document.querySelector('.popup__close-button_preview-close').addEventListener('click', () => {
      popupPreiw.classList.remove('popup_opened')
    })
  });
  return element
}

// добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const imageSrc = document.querySelector('.popup__src-image').value;
  const popupAreaName = document.querySelector('.popup__area-name').value;
  newCardAddPlace.prepend(addCard(popupAreaName, imageSrc));
  popupCardAdd.classList.remove('popup_opened')
}

formCardAdd.addEventListener('submit', addNewCard);

// 2. Шесть карточек «из коробки»
initialCards.forEach(element => {
  newCardAddPlace.prepend(addCard(element.name, element.link));
});

// 5. Лайк карточки
function like(e) {
  e.target.classList.toggle('element__like_active')
}

// 6. Удаление карточки
function removeCard(element) {
  element.target.closest('.element').remove();
}
