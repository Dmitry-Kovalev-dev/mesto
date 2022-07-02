export class FormValidator {
  constructor(selectors, formElement) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;
  };

  _showInputError(errorEl, inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorClass);
  };

  _hideInputError(errorEl, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorEl.textContent = '';
    errorEl.classList.remove(this._errorClass);
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

  enableValidation() {
    this._setEventListeners();
  };
}
