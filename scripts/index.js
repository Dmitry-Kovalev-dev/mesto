let editBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let closePopupBtn = popup.querySelector('.popup__close-btn');
let inputName = popup.querySelector('.popup__input_type_name');
let inputJob = popup.querySelector('.popup__input_type_job');

function openClosePopup() {
  popup.classList.toggle('popup-open');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

editBtn.addEventListener('click', openClosePopup);
closePopupBtn.addEventListener('click', openClosePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup-open');
}

popup.addEventListener('submit', formSubmitHandler);
