//-------------------------show-error-----------------------------------
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

//--------------------hide-error----------------------------------
const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectors.errorClass);
};

//-------------------validation-----------------------------------
const isValid = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

//---------------------find-invalid-input-------------------------
const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid);

const setSubmitButtonState = (inputList, buttonSubmitElement) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmitElement.disabled = true;
  } else {
    buttonSubmitElement.disabled = false;
  }
};

//--------------------input-listeners-----------------------------
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonSubmitElement = formElement.querySelector(selectors.submitButtonSelector);
  setSubmitButtonState(inputList, buttonSubmitElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, selectors);
      setSubmitButtonState(inputList, buttonSubmitElement);
    });
  });
};

//----------form-listeners------------------------------------
const enableValidation = (selectors) => {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors);
  });
};

enableValidation(selectors);
