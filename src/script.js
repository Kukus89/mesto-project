import "../src/index.css";
import "./components/card.js"
const profile = document.querySelector('.profile');
const buttonEditeProfile = profile.querySelector('.profile__edite-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const popupProfileName = document.querySelector('.popup__profile_name');
const popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditeProfile = document.querySelector('.popup_edite-profile');
export const popupCardAdd = document.querySelector('.popup_card-add');
const formProfileEdite = document.querySelector('.popup__form_editeProfile');
const popups = document.querySelectorAll('.popup');

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

// Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

// Функция закрытия попапа
export function closePopup(popupElement) {
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
// enableValidation({
//   formSelector: '.input-form',
//   inputSelector: '.popup__form-input',
//   submitButtonSelector: '.popup__submite-button',
//   inactiveButtonClass: 'popup__submite-button_disabled',
//   inputErrorClass: 'popup__form-input_type_error',
//   errorClass: 'popup__input-error-message_active'
// }); 


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