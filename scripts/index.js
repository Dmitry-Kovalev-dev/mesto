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
const formAddElement = popupAddPost.querySelector('.popup__form_type_add-post');
const inputPlaceName = formAddElement.querySelector('.popup__input_type_place');
const inputLink = formAddElement.querySelector('.popup__input_type_link');

const popupZoomImage = document.querySelector('.popup_type_img');
const imageInPopup = popupZoomImage.querySelector('.popup__zoom-img');
const captionInPopup = popupZoomImage.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close-btn');
const photoFeed = document.querySelector('.photo-feed');
const formsArr = Array.from(document.forms);


const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-input-btn',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__input-error',
  errorActiveClass: 'popup__input-error_active'
};

/** Openinig popups */
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handlePressEsc);
  document.addEventListener('mousedown', handleClickOverlayPopupClose);
}

editBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  editFormValidator.hideInputErrors();
});

addPostBtn.addEventListener('click', () => {
  openPopup(popupAddPost);
  formAddElement.reset();
  addFormValidator.hideInputErrors();
});

/** Closing popups */
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_open');
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

/** Editing profile inputs */
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

/** Opening popup zoom image */
export const openPopupImage = (link, title) => {
  openPopup(popupZoomImage);
  imageInPopup.src = link;
  imageInPopup.alt = title;
  captionInPopup.textContent = title;
};

/** Rendering initial cards */
initialCards.forEach((item) => {
  const card = new Card(item, '#post');
  const cardElement = card.createPostCard();
  photoFeed.append(cardElement);
});

/** Adding new post */
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const inputsValues = {
    name: inputPlaceName.value,
    link: inputLink.value,
  };
  const cardByPopup = new Card(inputsValues, '#post');
  const cardElementByPopup = cardByPopup.createPostCard();
  photoFeed.prepend(cardElementByPopup);
  closePopup(popupAddPost);
  formAddElement.reset();
  addFormValidator.disableSubmitButton();
};

formAddElement.addEventListener('submit', handleFormAddSubmit);

/** Enable validation */
const editFormValidator = new FormValidator(validationConfig, formProfileElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, formAddElement);
addFormValidator.enableValidation();
