import { profileName, profileSubtitle, closePopup, popupEditeAvatar, popupSubmiteButtonEditeAvatar } from "./modal";
import { createCard, confirmDeleteButton, submiteButtonCardAdd } from "./card";
import { cardsContainer } from "./card";
export const profileAvatar = document.querySelector('.profile__avatar');
const submiteButtonProfileSave = document.querySelector('.popup__submite-button_profile-save');


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
    'Content-Type': 'application/json'
  }
}

//загрузка нформации профиля
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((result) => {
      profileName.textContent = result.name;
      profileSubtitle.textContent = result.about;
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

getProfile()

//Загрузка карточек с сервера
export const initialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((result) => {
      result.forEach(element => {
        // console.log(element);
        cardsContainer.prepend(createCard(element))
      });
    })
}

initialCards()

export const patchProfile = (editeProfileName, editeProfileAbout) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: editeProfileName,
      about: editeProfileAbout
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then(() => {
      closePopup(submiteButtonProfileSave.closest('.popup'))
      submiteButtonProfileSave.textContent = 'Сохранить'
    })
}

//Отправка новой карточки на сервер
export const postNewCard = (newCardName, newCardUrl) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardUrl
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((obj) => {
      const newCardObject = obj
      cardsContainer.prepend((createCard(newCardObject)))
    })
    .then(() => {
      submiteButtonCardAdd.textContent = 'Сохранить'
      closePopup(submiteButtonCardAdd.closest('.popup'))
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

//Удаление Карточки
export const deleteCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        // console.log(res.ok);
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then(() => {
      closePopup(confirmDeleteButton.closest('.popup'))
      confirmDeleteButton.textContent = 'Да';
    })
}

//добавить лайк 
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

//удалить лайк 
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

//Обновление авы
export const changeAvatar = (AvatarURL) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: AvatarURL
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then(() => {
      closePopup(popupEditeAvatar)
      popupSubmiteButtonEditeAvatar.textContent = 'Сохранить'
    })
}