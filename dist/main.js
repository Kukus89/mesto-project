/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/cards.js":
/*!**************************!*\
  !*** ./scripts/cards.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialCards\": () => (/* binding */ initialCards)\n/* harmony export */ });\nvar initialCards = [{\n  name: 'Архыз',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'\n}, {\n  name: 'Челябинская область',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'\n}, {\n  name: 'Иваново',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'\n}, {\n  name: 'Камчатка',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'\n}, {\n  name: 'Холмогорский район',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'\n}, {\n  name: 'Байкал',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'\n}];\n\n//# sourceURL=webpack://mesto-project/./scripts/cards.js?");

/***/ }),

/***/ "./scripts/script.js":
/*!***************************!*\
  !*** ./scripts/script.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.js */ \"./scripts/cards.js\");\n\nvar profile = document.querySelector('.profile');\nvar buttonEditeProfile = profile.querySelector('.profile__edite-button');\nvar buttonAddCard = profile.querySelector('.profile__add-button');\nvar popupProfileName = document.querySelector('.popup__profile_name');\nvar popupProfileSubtitle = document.querySelector('.popup__profile_subtitle');\nvar profileName = document.querySelector('.profile__name');\nvar profileSubtitle = document.querySelector('.profile__subtitle');\nvar popupPreviewImage = document.querySelector('.popup__preview-image');\nvar imageSubtitle = document.querySelector('.popup__preview-image-subtitle');\nvar popupEditeProfile = document.querySelector('.popup_edite-profile');\nvar popupCardAdd = document.querySelector('.popup_card-add');\nvar newCardAddPlace = document.querySelector('.elements__list');\nvar formProfileEdite = document.querySelector('.popup__form_editeProfile');\nvar formCardAdd = document.querySelector('.popup__form_newCardAdd');\nvar newCardTemplate = document.querySelector('.templateElements').content;\nvar popupPreview = document.querySelector('.popup_preview');\nvar closeButton = document.querySelector('.popup__close-button');\nvar popups = document.querySelectorAll('.popup');\nvar popupAreaName = document.querySelector('.popup__area-name');\nvar imageSrc = document.querySelector('.popup__src-image');\nvar popupForms = document.querySelectorAll('.popup__form');\n\n// Открытие попапа профиля\n\nfunction editeProfileButtonClick() {\n  popupProfileName.value = profileName.textContent;\n  popupProfileSubtitle.value = profileSubtitle.textContent;\n  formListener(); // иначе не пройдет валидацию и сабмит будет активным\n  openPopup(popupEditeProfile);\n}\nbuttonEditeProfile.addEventListener('click', editeProfileButtonClick);\n\n// Сохранение профиля\nfunction handleSubmitEditProfileForm(event) {\n  event.preventDefault();\n  profileName.textContent = popupProfileName.value;\n  profileSubtitle.textContent = popupProfileSubtitle.value;\n  closePopup(popupEditeProfile);\n}\nformProfileEdite.addEventListener('submit', handleSubmitEditProfileForm);\n\n// 3. Попап формы добавления карточки\nfunction addCardButtonClick() {\n  openPopup(popupCardAdd);\n}\nbuttonAddCard.addEventListener('click', addCardButtonClick);\n\n// 4. Добавление карточек\n// форма готовой карточки\nfunction createCard(placeName, srcPic) {\n  var element = newCardTemplate.querySelector('.element').cloneNode(true);\n  var elementImage = element.querySelector('.element__image');\n  elementImage.src = srcPic;\n  element.querySelector('.element__title').textContent = placeName;\n  element.querySelector('.element__delete-button').addEventListener('click', removeCard);\n  elementImage.addEventListener('click', function () {\n    popupPreviewImage.alt = placeName;\n    popupPreviewImage.src = srcPic;\n    imageSubtitle.textContent = popupPreviewImage.alt;\n    openPopup(popupPreview);\n  });\n  return element;\n}\n\n// добавление новой карточки\nfunction addNewCard(event) {\n  event.preventDefault();\n  newCardAddPlace.prepend(createCard(popupAreaName.value, imageSrc.value));\n  closePopup(popupCardAdd);\n  event.target.reset();\n}\nformCardAdd.addEventListener('submit', addNewCard);\n\n// 2. Шесть карточек «из коробки»\n_cards_js__WEBPACK_IMPORTED_MODULE_0__.initialCards.forEach(function (element) {\n  newCardAddPlace.prepend(createCard(element.name, element.link));\n});\n\n// 5. Лайк карточки\nfunction like(evt) {\n  if (evt.target.classList.contains('element__like')) {\n    evt.target.classList.toggle('element__like_active');\n  }\n}\nnewCardAddPlace.addEventListener('click', like);\n\n// 6. Удаление карточки\nfunction removeCard(element) {\n  element.target.closest('.element').remove();\n}\n\n// Функция открытия попапа\nfunction openPopup(popupElement) {\n  popupElement.classList.add('popup_opened');\n}\n\n// Функция закрытия попапа\nfunction closePopup(popupElement) {\n  popupElement.classList.remove('popup_opened');\n}\n\n// Функция закрытия попапов \"Крестиком\"\npopups.forEach(function (element) {\n  var closeButton = element.querySelector('.popup__close-button');\n  closeButton.addEventListener('click', function () {\n    closePopup(element);\n  });\n});\n\n//Закрытие попапа Искейпом и кликом вне\n\npopups.forEach(function (element) {\n  document.addEventListener('keydown', function (e) {\n    if (e.key == 'Escape') {\n      closePopup(element);\n    }\n  });\n  element.addEventListener('click', function (e) {\n    var targetForm = element.querySelector('.popup__form');\n    var shadowClick = e.composedPath().includes(targetForm);\n    if (!shadowClick) {\n      closePopup(element);\n    }\n  });\n});\n\n//\n// Валидация форм\n//\n\n// const profileForm = document.querySelector('.input-form'); //\n// const formInputName = profileForm.querySelector('.popup__profile_name')\n// const inputError = profileForm.querySelector('.popup__input-error-message')\n\n//Отображение ошибки\nfunction showInputError(formElement, InputFormElement, textError) {\n  var inputError = formElement.querySelector(\".\".concat(InputFormElement.id, \"-error\"));\n  InputFormElement.classList.add('popup__form-input_type_error');\n  inputError.textContent = textError;\n  inputError.classList.add('popup__input-error-message_active');\n}\n\n//Скрытие ошибки\nfunction hideInputError(formElement, InputFormElement) {\n  var inputError = formElement.querySelector(\".\".concat(InputFormElement.id, \"-error\"));\n  InputFormElement.classList.remove('popup__form-input_type_error');\n  inputError.textContent = '';\n  inputError.classList.remove('popup__input-error-message_active');\n}\nfunction isValid(form, formInput) {\n  if (formInput.validity.patternMismatch) {\n    formInput.setCustomValidity(formInput.dataset.errorMessage);\n  } else {\n    formInput.setCustomValidity('');\n  }\n  if (!formInput.validity.valid) {\n    showInputError(form, formInput, formInput.validationMessage);\n  } else {\n    hideInputError(form, formInput);\n  }\n}\n\n//Слушатель на все инпуты в форме\n\nfunction inputListener(form) {\n  var formInputs = Array.from(form.querySelectorAll('.popup__form-input'));\n  var button = form.querySelector('.popup__submite-button');\n  buttonActive(formInputs, button);\n  formInputs.forEach(function (formInput) {\n    formInput.addEventListener('input', function () {\n      isValid(form, formInput);\n      buttonActive(formInputs, button);\n    });\n  });\n}\n\n//Слушатель на формы\n\nfunction formListener() {\n  var forms = Array.from(document.querySelectorAll('.input-form'));\n  forms.forEach(function (form) {\n    inputListener(form);\n  });\n}\n\n//проверка полей ввода на валидность до взаимодействия с инпутом\n\nfunction hasInvalid(formInputs) {\n  return formInputs.some(function (input) {\n    return !input.validity.valid;\n  });\n}\nfunction buttonActive(inputs, button) {\n  if (hasInvalid(inputs)) {\n    button.disabled = true;\n    ;\n    button.classList.add('popup__submite-button_disabled');\n  } else {\n    button.disabled = false;\n    button.classList.remove('popup__submite-button_disabled');\n  }\n}\nformListener();\n\n//# sourceURL=webpack://mesto-project/./scripts/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/script.js");
/******/ 	
/******/ })()
;