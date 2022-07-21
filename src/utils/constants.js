import miass from '../images/miass.jpg';
import abzakovo from '../images/abzakovo.jpg';
import arhyz from '../images/arhyz.jpg';
import gubaha from '../images/gubaha.jpg';
import rosa from '../images/rosa.jpg';
import adzh from '../images/adzh.jpg';

export const editBtn = document.querySelector('.profile__edit-btn');
export const addPostBtn = document.querySelector('.profile__add-btn');

export const formProfileElement = document.querySelector('.popup__form_type_profile-edit');
export const formAddElement = document.querySelector('.popup__form_type_add-post');

export const cardTemplateId = '#post';
export const containerCardsSelector = '.photo-feed';
export const popupAddSelector = '.popup_type_add';
export const popupEditSelector = '.popup_type_edit';
export const popupWithImg = '.popup_type_img';

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-input-btn',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__input-error',
  errorActiveClass: 'popup__input-error_active',
}

export const userProfileConfig = {
  profileName: '.profile__name',
  profileAbout: '.profile__about',
}

export const initialCards = [
  {
    name: 'Сочнечная Долина',
    link: miass
  },
  {
    name: 'Архыз',
    link: arhyz
  },
  {
    name: 'Аджигардак',
    link: adzh
  },
  {
    name: 'Роза Хутор',
    link: rosa
  },
  {
    name: 'Губаха',
    link: gubaha
  },
  {
    name: 'Абзаково',
    link: abzakovo
  }
];
