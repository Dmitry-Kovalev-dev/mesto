const editBtn = document.querySelector('.profile__edit-btn');
const addPostBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

const popupProfile = document.querySelector('.popup_type_edit');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputJob = popupProfile.querySelector('.popup__input_type_job');
const formElement = popupProfile.querySelector('.popup__form_type_profile-edit');

const popupAddPost = document.querySelector('.popup_type_add');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const photoFeed = document.querySelector('.photo-feed');

//---------------------open-popups---------------------------------------
function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
}

editBtn.addEventListener('click', function () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

addPostBtn.addEventListener('click', function () {
  openPopup(popupAddPost);
});

//-------------------close-popups---------------------------------------
const closePopup = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_open');
}

closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(evt);
}

formElement.addEventListener('submit', formSubmitHandler);


//----------------open-popup-zoom-img----------------------------------
const popupImage = document.querySelector('.popup_type_img');

const openPopupImage = (evt) => {
  openPopup(popupImage);
  popupImage.querySelector('.popup__zoom-img').src = evt.target.src;
  popupImage.querySelector('.popup__caption').textContent =
    evt.target.closest('.post').querySelector('.post__title').textContent;
};

//----------------------like-button-active-----------------------------

const clickLikeButton = (evt) => {
  evt.target.classList.toggle('post__like-btn_active');
};

//--------------------deleting-post------------------------------------

const clickTrashButton = (evt) => {
  evt.target.closest('.post').remove();
};

//-----------------------rendering-initial-cards-----------------------
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

const postTemplate = document.querySelector('#post').content;

const createPostCard = item => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  postElement.querySelector('.post__title').textContent = item.name;
  postElement.querySelector('.post__img').src = item.link;
  postElement.querySelector('.post__img').addEventListener('click', openPopupImage);
  postElement.querySelector('.post__like-btn').addEventListener('click', clickLikeButton);
  postElement.querySelector('.post__trash-btn').addEventListener('click', clickTrashButton);
  photoFeed.append(postElement);
};

initialCards.forEach(item => {
  createPostCard(item);
});

//----------------------added-post------------------------------------
const fomrAddElement = document.querySelector('.popup__form_type_add-post');
const inputPlaceName = fomrAddElement.querySelector('.popup__input_type_place');
const inputLink = fomrAddElement.querySelector('.popup__input_type_link');

const formAddSubmitHandler = (evt) => {
  evt.preventDefault();
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  postElement.querySelector('.post__title').textContent = inputPlaceName.value;
  postElement.querySelector('.post__img').src = inputLink.value;
  postElement.querySelector('.post__img').addEventListener('click', openPopupImage);
  postElement.querySelector('.post__like-btn').addEventListener('click', clickLikeButton);
  postElement.querySelector('.post__trash-btn').addEventListener('click', clickTrashButton);
  photoFeed.prepend(postElement);
  closePopup(evt);
  fomrAddElement.reset();
};

fomrAddElement.addEventListener('submit', formAddSubmitHandler);
