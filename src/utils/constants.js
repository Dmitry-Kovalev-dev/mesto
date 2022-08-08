
export const editBtn = document.querySelector('.profile__edit-btn');
export const addPostBtn = document.querySelector('.profile__add-btn');
export const editAvatarBtn = document.querySelector('.profile__avatar-container');

export const formProfileElement = document.querySelector('.popup__form_type_profile-edit');
export const formAddElement = document.querySelector('.popup__form_type_add-post');
export const formEditAvatarElement = document.querySelector('.popup__form_type_edit-avatar')

export const cardTemplateId = '#post';
export const containerCardsSelector = '.photo-feed';
export const popupAddSelector = '.popup_type_add';
export const popupEditSelector = '.popup_type_edit';
export const popupEditAvatarSelector = '.popup_type_edit-avatar';
export const popupWithImg = '.popup_type_img';
export const popupDeleteCardSelector = '.popup_type_del';

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
  profileAvatar: '.profile__avatar',
}

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-47',
  token: '4b6a8056-03c7-4003-80a9-a26f77782524'
}
