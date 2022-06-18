//---------------------open-popups---------------------------------------
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
});

//-------------------close-popups---------------------------------------
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
  if (Array.from(evt.target.classList).some(function (cl) { return cl === 'popup'; })) {
    closePopup(evt.target);
  }
};

//-------------------edit-profile-submit--------------------------------
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  handleClickClosePopup(evt);
};

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

//----------------open-popup-zoom-img----------------------------------
const openPopupImage = (evt) => {
  openPopup(popupZoomImage);
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.closest('.post').querySelector('.post__title').textContent;
  captionInPopup.textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
};

//----------------------like-button-active-----------------------------
const handleClickLikeButton = (evt) => {
  evt.target.classList.toggle('post__like-btn_active');
};

//--------------------deleting-post------------------------------------
const handleClickTrashButton = (evt) => {
  evt.target.closest('.post').remove();
};

//-----------------------rendering-initial-cards-----------------------
const createPostCard = item => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postImg = postElement.querySelector('.post__img');
  postElement.querySelector('.post__title').textContent = item.name;
  postImg.alt = item.name || ' ';
  postImg.src = item.link;
  postImg.addEventListener('click', openPopupImage);
  postElement.querySelector('.post__like-btn').addEventListener('click', handleClickLikeButton);
  postElement.querySelector('.post__trash-btn').addEventListener('click', handleClickTrashButton);
  return postElement;
};

initialCards.forEach(item => {
  const initialCard = createPostCard(item);
  photoFeed.append(initialCard);
});

//----------------------added-new-post------------------------------------
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  const inputValue = {
    name: inputPlaceName.value,
    link: inputLink.value,
  };
  const newCard = createPostCard(inputValue);
  photoFeed.prepend(newCard);
  handleClickClosePopup(evt);
  fomrAddElement.reset();
};

fomrAddElement.addEventListener('submit', handleFormAddSubmit);
