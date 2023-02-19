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
export function formListener() {
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


//Состояние кнопки
function buttonActive(inputs, button) {
  if (hasInvalid(inputs)) {
    button.disabled = true;;
    button.classList.add('popup__submite-button_disabled');
  } else {
    button.disabled = false;
    button.classList.remove('popup__submite-button_disabled');
  }
}

// formListener()

function enableValidation({
  formSelector: '.input-form',
  inputSelector: '.popup__input'
  submitButtonSelector: '.popup__button';
  inactiveButtonClass: 'popup__button_disabled';
  inputErrorClass: 'popup__input_type_error';
  errorClass: 'popup__error_visible'
}) {}

