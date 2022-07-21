export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorActiveClass = validationConfig.errorActiveClass;
    this._errorSelector = validationConfig.errorSelector;
    this._formElement = formElement;
  };

  _showInputError(errorEl, inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorActiveClass);
  };

  _hideInputError(errorEl, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorEl.textContent = '';
    errorEl.classList.remove(this._errorActiveClass);
  };

  _isValid(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
  };

  _setSubmitButtonState(inputList, buttonSubmitElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonSubmitElement.disabled = true;
    } else {
      buttonSubmitElement.disabled = false;
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);
    this._setSubmitButtonState(inputList, buttonSubmitElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this._setSubmitButtonState(inputList, buttonSubmitElement);
      });
    });
  };

  hideInputErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const errorList = Array.from(this._formElement.querySelectorAll(this._errorSelector))
    inputList.forEach((input) => {
      if (input.classList.contains(this._inputErrorClass)) {
        input.classList.remove(this._inputErrorClass);
      }
    });
    errorList.forEach((error) => {
      if (error.classList.contains(this._errorActiveClass)) {
        error.classList.remove(this._errorActiveClass);
      }
    });
  };

  disableSubmitButton() {
    this._formElement.querySelector(this._submitButtonSelector).disabled = true;
  };

  enableValidation() {
    this._setEventListeners();
  };
}
