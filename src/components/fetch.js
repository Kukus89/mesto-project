import { profileName, profileSubtitle } from "./modal";
import { createCard } from "./card";
import { cardsContainer } from "./card";
const profileAvatar = document.querySelector('.profile__avatar')

//загрузка нформации профиля
export function getProfile() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270'
    }
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
export function initialCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270'
    }
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


export function patchProfile(editeProfileName, editeProfileAbout) {
  fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: editeProfileName,
      about: editeProfileAbout
    })
  });
}

//Отправка новой карточки на сервер
export function postNewCard(newCardName, newCardUrl) {
  fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    method: 'POST',
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
      'Content-Type': 'application/json'
    },
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
      // console.log(obj._id);
      const newCardObject = obj
      cardsContainer.prepend((createCard(newCardObject)))
    })
}

//Удаление Карточки
export function deleteCard(cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (res.ok) {
        // console.log(res.ok);
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

//добавить лайк 
export function addLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

//удалить лайк 
export function deleteLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}