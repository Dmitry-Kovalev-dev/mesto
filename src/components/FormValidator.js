export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorActiveClass = validationConfig.errorActiveClass;
    this._errorSelector = validationConfig.errorSelector;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._errorList = Array.from(this._formElement.querySelectorAll(this._errorSelector))
    this._buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);
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
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(this._errorElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._errorElement, inputElement);
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
    this._setSubmitButtonState(this._inputList, this._buttonSubmitElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this._setSubmitButtonState(this._inputList, this._buttonSubmitElement);
      });
    });
  };

  hideInputErrors() {
    this._inputList.forEach((input) => {
      if (input.classList.contains(this._inputErrorClass)) {
        input.classList.remove(this._inputErrorClass);
      }
    });
    this._errorList.forEach((error) => {
      if (error.classList.contains(this._errorActiveClass)) {
        error.classList.remove(this._errorActiveClass);
      }
    });
  };

  disableSubmitButton() {
    this._buttonSubmitElement.disabled = true;
  };

  enableValidation() {
    this._setEventListeners();
  };
}
