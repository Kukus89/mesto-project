import { popupProfileName, popupProfileSubtitle } from "./modal";
document.querySelector('.profile__avatar')

function cards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    })
}

function authorization() {
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
      // console.log(result);
      document.querySelector('.profile__name').textContent = result.name;
      document.querySelector('.profile__subtitle').textContent = result.about;
      document.querySelector('.profile__avatar').src = result.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

authorization()