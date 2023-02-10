import { initialCards } from "./cards.js";
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
const popupForms = document.querySelectorAll('.popup__form')

// Открытие попапа профиля

function editeProfileButtonClick() {
  popupProfileName.value = profileName.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  formListener() // иначе не пройдет валидацию и сабмит будет активным
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
  event.target.reset();
}

formCardAdd.addEventListener('submit', addNewCard);

// 2. Шесть карточек «из коробки»
initialCards.forEach(element => {
  newCardAddPlace.prepend(createCard(element.name, element.link));
});

// 5. Лайк карточки
function like(evt) {
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

//Закрытие попапа Искейпом и кликом вне

popups.forEach(element => {
  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
      closePopup(element)
    }
  })
  element.addEventListener('click', (e) => {
    const targetForm = element.querySelector('.popup__form')
    const shadowClick = e.composedPath().includes(targetForm);
    if (!shadowClick) {
      closePopup(element)
    }
  })
})

//
// Валидация форм
//

// const profileForm = document.querySelector('.input-form'); //
// const formInputName = profileForm.querySelector('.popup__profile_name')
// const inputError = profileForm.querySelector('.popup__input-error-message')

//Отображение ошибки
function showInputError(formElement, InputFormElement, textError) {
  const inputError = formElement.querySelector(`.${InputFormElement.id}-error`)
  InputFormElement.classList.add('popup__form-input_type_error')
  inputError.textContent = textError
  inputError.classList.add('popup__input-error-message_active')
}

//Скрытие ошибки
function hideInputError(formElement, InputFormElement) {
  const inputError = formElement.querySelector(`.${InputFormElement.id}-error`)
  InputFormElement.classList.remove('popup__form-input_type_error')
  inputError.textContent = ''
  inputError.classList.remove('popup__input-error-message_active')
}

function isValid(form, formInput) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity('');
  }
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage)
  } else {
    hideInputError(form, formInput)
  }
}

//Слушатель на все инпуты в форме

function inputListener(form) {
  const formInputs = Array.from(form.querySelectorAll('.popup__form-input'));
  const button = form.querySelector('.popup__submite-button');
  buttonActive(formInputs, button);
  formInputs.forEach(formInput => {
    formInput.addEventListener('input', () => {
      isValid(form, formInput)
      buttonActive(formInputs, button)
    })
  });
}

//Слушатель на формы

function formListener() {
  const forms = Array.from(document.querySelectorAll('.input-form'));
  forms.forEach(form => {
    inputListener(form)
  })
}

//проверка полей ввода на валидность до взаимодействия с инпутом

function hasInvalid(formInputs) {
  return formInputs.some((input) => {
    return !input.validity.valid;
  })
}

function buttonActive(inputs, button) {
  if (hasInvalid(inputs)) {
    button.disabled = true;;
    button.classList.add('popup__submite-button_disabled');
  } else {
    button.disabled = false;
    button.classList.remove('popup__submite-button_disabled');
  }
}

formListener()