let editBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let closePopupBtn = popup.querySelector('.popup__close-btn');
let inputName = popup.querySelector('.popup__input_type_name');
let inputJob = popup.querySelector('.popup__input_type_job');
let formElement = popup.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_open');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_open');
}

editBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
