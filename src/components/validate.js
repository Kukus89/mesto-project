export { enableValidation, validationParams }

const validationParams = {
  formSelector: '.input-form', //
  inputSelector: '.popup__form-input', //
  submitButtonSelector: '.popup__submite-button', //
  inactiveButtonClass: 'popup__submite-button_disabled', //
  inputErrorClass: 'popup__form-input_type_error',//
  errorClass: 'popup__input-error-message_active'//
}

function enableValidation(validationSetting) {

  //Отображение ошибки
  function showInputError(formElement, InputFormElement, textError) {
    const inputError = formElement.querySelector(`.${InputFormElement.id}-error`);
    InputFormElement.classList.add(validationSetting.inputErrorClass);
    inputError.textContent = textError;
    inputError.classList.add(validationSetting.errorClass);
  }

  //Скрытие ошибки
  function hideInputError(formElement, InputFormElement) {
    const inputError = formElement.querySelector(`.${InputFormElement.id}-error`)
    InputFormElement.classList.remove(validationSetting.inputErrorClass)
    inputError.textContent = ''
    inputError.classList.remove(validationSetting.errorClass)
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
    const formInputs = Array.from(form.querySelectorAll(validationSetting.inputSelector));
    const button = form.querySelector(validationSetting.submitButtonSelector);
    showButton(formInputs, button);
    formInputs.forEach(formInput => {
      formInput.addEventListener('input', () => {
        isValid(form, formInput)
        showButton(formInputs, button)
      })
    });
  }

  //Слушатель на формы
  function listenForm() {
    const forms = Array.from(document.querySelectorAll(validationSetting.formSelector));
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
  function showButton(inputs, button) {
    if (hasInvalid(inputs)) {
      button.disabled = true;;
      button.classList.add(validationSetting.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(validationSetting.inactiveButtonClass);
    }
  }

  // слушатель на сброс кнопки
  document.addEventListener('reset', (evt) => {
    setTimeout(() => {
      const activeButton = evt.target.querySelector('.popup__submite-button');
      activeButton.disabled = true;
      activeButton.classList.add('popup__submite-button_disabled');
    }, 0);
  });
  listenForm()
};