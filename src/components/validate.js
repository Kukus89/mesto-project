const popupForm = {
  formSelector: '.input-form', //
  inputSelector: '.popup__form-input', //
  submitButtonSelector: '.popup__submite-button', //
  inactiveButtonClass: 'popup__submite-button_disabled', //
  inputErrorClass: 'popup__form-input_type_error',//
  errorClass: 'popup__input-error-message_active'//
}

function enableValidation(popupFormElement) {

  //Отображение ошибки
  function showInputError(formElement, InputFormElement, textError) {
    const inputError = formElement.querySelector(`.${InputFormElement.id}-error`);
    InputFormElement.classList.add(popupFormElement.inputErrorClass);
    inputError.textContent = textError;
    inputError.classList.add(popupFormElement.errorClass);
  }

  //Скрытие ошибки
  function hideInputError(formElement, InputFormElement) {
    const inputError = formElement.querySelector(`.${InputFormElement.id}-error`)
    InputFormElement.classList.remove(popupFormElement.inputErrorClass)
    inputError.textContent = ''
    inputError.classList.remove(popupFormElement.errorClass)
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
  function listenImput(form) {
    const formInputs = Array.from(form.querySelectorAll(popupFormElement.inputSelector));
    const button = form.querySelector(popupFormElement.submitButtonSelector);
    activateButton(formInputs, button);
    formInputs.forEach(formInput => {
      formInput.addEventListener('input', () => {
        isValid(form, formInput)
        activateButton(formInputs, button)
      })
    });
  }

  //Слушатель на формы
  function listenForm() {
    const forms = Array.from(document.querySelectorAll(popupFormElement.formSelector));
    forms.forEach(form => {
      listenImput(form)
    })
  }

  //проверка полей ввода на валидность
  function hasInvalid(formInputs) {
    return formInputs.some((input) => {
      return !input.validity.valid;
    })
  }

  //Состояние кнопки
  function activateButton(inputs, button) {
    if (hasInvalid(inputs)) {
      button.disabled = true;;
      button.classList.add(popupFormElement.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(popupFormElement.inactiveButtonClass);
    }
  }
  listenForm()
};
export { enableValidation, popupForm }




