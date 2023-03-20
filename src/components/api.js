import { checkResponse, request } from "./utils.js";

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
//   headers: {
//     authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
//     'Content-Type': 'application/json'
//   }
// }

export class Api {
  constructor() {
    this.config = {
      baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
      headers: {
        authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
        'Content-Type': 'application/json'
      }
    }
  }

  getProfile = () => {
    return request(`${this.config.baseUrl}/users/me`, this.config) 
  }

  //Загрузка карточек с сервера
  initialCards = () => {
    return request(`${this.config.baseUrl}/cards`, this.config)
  }

  patchProfile = (editeProfileName, editeProfileAbout) => {
    return fetch(`${this.config.baseUrl}/users/me`, {
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
  postNewCard = (newCardName, newCardUrl) => {
    return fetch(`${this.config.baseUrl}/cards`, {
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
  deleteCard = (cardId) => {
    return fetch(`${this.config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
      .then(checkResponse)
  }

  //добавить лайк 
  addLike = (cardId) => {
    return fetch(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
      .then(checkResponse)
  }

  //удалить лайк 
  deleteLike = (cardId) => {
    return fetch(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
      .then(checkResponse)
  }

  //Обновление авы
  changeAvatar = (AvatarURL) => {
    return fetch(`${this.config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: AvatarURL
      })
    })
      .then(checkResponse)
  }
}

export const api = new Api()


