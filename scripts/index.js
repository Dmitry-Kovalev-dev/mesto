import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

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
const formsArr = Array.from(document.forms);

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-input-btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//---------------------opening-popups--------------------
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handlePressEsc);
  document.addEventListener('mousedown', handleClickOverlayPopupClose);
}

editBtn.addEventListener('click', function () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

addPostBtn.addEventListener('click', function () {
  openPopup(popupAddPost);
  fomrAddElement.reset();
  new FormValidator(selectors, fomrAddElement).enableValidation();
});

//-------------------closing-popups---------------------
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_open');
  hideErrorByClosePopup(popupElement);
  document.removeEventListener('keydown', handlePressEsc);
  document.removeEventListener('mousedown', handleClickOverlayPopupClose);
};

const handleClickClosePopup = (evt) => {
  closePopup(evt.target.closest('.popup'));
};

closeButtons.forEach(button => {
  button.addEventListener('click', handleClickClosePopup);
});

const handlePressEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_open'));
  }
};

const handleClickOverlayPopupClose = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

//-------------------editing-profile-submit--------------
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  handleClickClosePopup(evt);
};

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

//----------------opening-popup-zoom-img-----------------
export const openPopupImage = (link, title) => {
  openPopup(popupZoomImage);
  imageInPopup.src = link;
  imageInPopup.alt = title;
  captionInPopup.textContent = title;
};

//-----------------------rendering-initial-cards---------
initialCards.forEach((item) => {
  const card = new Card(item, '#post');
  const cardElement = card.createPostCard();
  photoFeed.append(cardElement);
});

//----------------------adding-new-post-----------------
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const inputValue = {
    name: inputPlaceName.value,
    link: inputLink.value,
  };
  const cardByPopup = new Card(inputValue, '#post');
  const cardElementByPopup = cardByPopup.createPostCard();
  photoFeed.prepend(cardElementByPopup);
  handleClickClosePopup(evt);
  fomrAddElement.reset();
};

fomrAddElement.addEventListener('submit', handleFormAddSubmit);

//------------enableValidationAllForms------------------
formsArr.forEach((form) => {
  const validation = new FormValidator(selectors, form)
  validation.enableValidation();
});

//------------hiding-error-after-closing-popup----------
const hideErrorByClosePopup = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  const errorList = Array.from(popupElement.querySelectorAll('.popup__input-error'))
  inputList.forEach(input => {
    if (input.classList.contains('popup__input_type_error')) {
      input.classList.remove('popup__input_type_error');
    }
  });
  errorList.forEach(error => {
    if (error.classList.contains('popup__input-error_active')) {
      error.classList.remove('popup__input-error_active');
      error.textContent = ''
    }
  });
}
