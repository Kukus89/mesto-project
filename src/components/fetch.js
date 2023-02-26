import { profileName, profileSubtitle } from "./modal";
import { createCard } from "./card";
import { cardsContainer } from "./card";
const profileAvatar = document.querySelector('.profile__avatar')

function initialCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    headers: {
      authorization: 'db2903a8-7d87-407f-a3ab-4cc55fb57270'
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.forEach(element => {
        cardsContainer.prepend(createCard(element.name, element.link))
      });
    })
}

initialCards()

function editeProfile() {
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
      profileName.textContent = result.name;
      profileSubtitle.textContent = result.about;
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

editeProfile()