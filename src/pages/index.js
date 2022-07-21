import './index.css';

import {
  editBtn, addPostBtn, formProfileElement,
  formAddElement, cardTemplateId, containerCardsSelector,
  popupAddSelector, popupEditSelector, popupWithImg, validationConfig,
  userProfileConfig, initialCards,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserIinfo.js";

/** Creating popup "Add Card" from class PopupWithForm */
const handleSubmitAddForm = (values) => {
  const card = new Card(values, handleCardClick, cardTemplateId);
  const cardElement = card.createPostCard();
  rendered.addItem(cardElement);
};

const popupFormAddCard = new PopupWithForm(popupAddSelector, handleSubmitAddForm);
popupFormAddCard.setEventListeners();

addPostBtn.addEventListener('click', () => {
  popupFormAddCard.open();
  addFormValidator.hideInputErrors();
  addFormValidator.disableSubmitButton();
});

/** Creating popup "Edit Profile" from class PopupWithForm */
const userInfo = new UserInfo(userProfileConfig);

const handleSubmitProfileForm = (values) => {
  userInfo.setUserInfo(values);
};

const popupFormEditProfile = new PopupWithForm(popupEditSelector, handleSubmitProfileForm);
popupFormEditProfile.setEventListeners();

editBtn.addEventListener('click', () => {
  popupFormEditProfile.open();
  editFormValidator.hideInputErrors();
  const values = userInfo.getUserInfo();
  popupFormEditProfile.setInputValues(values);
  editFormValidator.disableSubmitButton();
});

/** Opening popup zoom image */
const popupWithImage = new PopupWithImage(popupWithImg);
popupWithImage.setEventListeners();

const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

/** Rendering initial cards*/
const rendered = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item, handleCardClick, cardTemplateId);
    const cardElement = card.createPostCard();
    rendered.addItem(cardElement);
  }
}, containerCardsSelector);

rendered.renderItems();

/** Enable validation */
const editFormValidator = new FormValidator(validationConfig, formProfileElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, formAddElement);
addFormValidator.enableValidation();

