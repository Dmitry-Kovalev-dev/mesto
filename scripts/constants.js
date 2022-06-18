const editBtn = document.querySelector('.profile__edit-btn');
const addPostBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

const popupProfile = document.querySelector('.popup_type_edit');
const formProfileElement = popupProfile.querySelector('.popup__form_type_profile-edit');
const inputName = formProfileElement.querySelector('.popup__input_type_name');
const inputJob = formProfileElement.querySelector('.popup__input_type_job');

const popupAddPost = document.querySelector('.popup_type_add');
const fomrAddElement = popupAddPost.querySelector('.popup__form_type_add-post');
const inputPlaceName = fomrAddElement.querySelector('.popup__input_type_place');
const inputLink = fomrAddElement.querySelector('.popup__input_type_link');

const popupZoomImage = document.querySelector('.popup_type_img');
const imageInPopup = popupZoomImage.querySelector('.popup__zoom-img');
const captionInPopup = popupZoomImage.querySelector('.popup__caption');


const closeButtons = document.querySelectorAll('.popup__close-btn');

const photoFeed = document.querySelector('.photo-feed');

const postTemplate = document.querySelector('#post').content;

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-input-btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const initialCards = [
  {
    name: 'Сочнечная Долина',
    link: './images/miass.jpg'
  },
  {
    name: 'Архыз',
    link: './images/arhyz.jpg'
  },
  {
    name: 'Аджигардак',
    link: './images/adzh.jpg'
  },
  {
    name: 'Роза Хутор',
    link: './images/rosa.jpg'
  },
  {
    name: 'Губаха',
    link: './images/gubaha.jpg'
  },
  {
    name: 'Абзаково',
    link: './images/abzakovo.jpg'
  }
];
