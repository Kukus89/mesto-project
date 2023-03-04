import { checkResponse, request } from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
    'Content-Type': 'application/json'
  }
}

export const getProfile = () => {
  return request(`${config.baseUrl}/users/me`, config)
}

//Загрузка карточек с сервера
export const initialCards = () => {
  return request(`${config.baseUrl}/cards`, config)
}

export const patchProfile = (editeProfileName, editeProfileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: editeProfileName,
      about: editeProfileAbout
    })
  })
    .then(checkResponse)
}

//Отправка новой карточки на сервер
export const postNewCard = (newCardName, newCardUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardUrl
    })
  })
    .then(checkResponse)
}

//Удаление Карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}

//добавить лайк 
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
}

//удалить лайк 
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
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
    .then(checkResponse)
}


