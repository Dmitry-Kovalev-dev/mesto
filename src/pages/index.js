import './index.css';
import {
  editBtn, addPostBtn, formProfileElement,
  formAddElement, cardTemplateId, containerCardsSelector,
  popupAddSelector, popupEditSelector, popupWithImg, validationConfig,
  userProfileConfig, editAvatarBtn, apiConfig,
  popupEditAvatarSelector, formEditAvatarElement, popupDeleteCardSelector,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserIinfo.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

const api = new Api(apiConfig);
const userInfo = new UserInfo(userProfileConfig);
let userId;

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.value;
  }
};

/** RENDERING INITIAL CARDS FROM SERVER*/
const rendered = new Section({
  renderer: (item) => {
    const postCard = createNewCardElement(item);
    rendered.addItem(postCard);
  }
}, containerCardsSelector);

/** GETTING INITIAL INFO */
Promise.all([api.getProfileInfo(), api.getInitialCard()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.getUserAvatar(user);
    userId = user._id;
    rendered.renderItems(cards);
  })
  .catch(err => console.log(err));

/** CREATING NEW CARD */
const createNewCardElement = (values) => {
  const handleClickLikeButton = (id, method) => {
    return api.setLikeStatus(id, method);
  };

  const card = new Card(values, handleCardClick, handleClickTrashButton, handleClickLikeButton, cardTemplateId, userId);
  const cardElement = card.createPostCard();
  card.setLikeCount(values);
  return cardElement;
};

/** CREATING AND OPENING POPUP ADD CARD */
const handleSubmitAddForm = (values) => {
  renderLoading(true, buttonFormAddCard);
  api.createCard(values)
    .then(res => {
      const postCard = createNewCardElement(res);
      rendered.addItem(postCard);
      popupFormAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonFormAddCard);
    })
};

const popupFormAddCard = new PopupWithForm(popupAddSelector, handleSubmitAddForm);
popupFormAddCard.setEventListeners();
const buttonFormAddCard = popupFormAddCard.getButton();

addPostBtn.addEventListener('click', () => {
  popupFormAddCard.open();
  addFormValidator.hideInputErrors();
  addFormValidator.disableSubmitButton();
});

/** CREATING AND OPENING POPUP EDIT AVATAR */
const handleSubmitEditAvatarForm = (values) => {
  renderLoading(true, buttonFormEditAvatar);
  api.editAvatar(values)
    .then(res => {
      userInfo.getUserAvatar(res);
      popupFormEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonFormEditAvatar);
    })
};

const popupFormEditAvatar = new PopupWithForm(popupEditAvatarSelector, handleSubmitEditAvatarForm);
popupFormEditAvatar.setEventListeners();
const buttonFormEditAvatar = popupFormEditAvatar.getButton();

editAvatarBtn.addEventListener('click', () => {
  popupFormEditAvatar.open();
  editAvatarFormValidator.hideInputErrors();
  editAvatarFormValidator.disableSubmitButton();
});

/** CREATING AND OPENING POPUP EDIT PROFILE */
const handleSubmitProfileForm = (values) => {
  renderLoading(true, buttonFormEditProfile);
  api.editProfile(values)
    .then(res => {
      userInfo.setUserInfo(res);
      popupFormEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonFormEditProfile);
    })
};

const popupFormEditProfile = new PopupWithForm(popupEditSelector, handleSubmitProfileForm);
popupFormEditProfile.setEventListeners();
const buttonFormEditProfile = popupFormEditProfile.getButton();

editBtn.addEventListener('click', () => {
  popupFormEditProfile.open();
  editFormValidator.hideInputErrors();
  const values = userInfo.getUserInfo();
  popupFormEditProfile.setInputValues(values);
  editFormValidator.disableSubmitButton();
});

/** CREATING AND OPENING POPUP ZOOM IMAGE */
const popupWithImage = new PopupWithImage(popupWithImg);
popupWithImage.setEventListeners();

const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

/** CREATING AND OPENING POPUP DELETE CARD */
const handleClickTrashButton = (card, id) => {
  popupDeleteCard.open();
  popupDeleteCard.setCardInfo(card, id);
};

const handleClickDeleteCard = (card, id) => {
  renderLoading(true, buttonDeleteCardSubmit)
  api.deleteCard(id)
    .then(() => {
      card.remove();
      card = null;
      popupDeleteCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonDeleteCardSubmit);
    })
};

const popupDeleteCard = new PopupWithConfirmation(popupDeleteCardSelector, handleClickDeleteCard);
popupDeleteCard.setEventListeners();
const buttonDeleteCardSubmit = popupDeleteCard.getButton();

/** ENABLE VALIDATION */
const editFormValidator = new FormValidator(validationConfig, formProfileElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, formAddElement);
addFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(validationConfig, formEditAvatarElement);
editAvatarFormValidator.enableValidation();
