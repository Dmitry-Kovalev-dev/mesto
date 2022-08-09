export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlayPopupClose = this._handleClickOverlayPopupClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleClickOverlayPopupClose);
  }

  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleClickOverlayPopupClose);
  }

  getButton() {
    this._submitButton = this._popupElement.querySelector('.popup__save-input-btn')
    return this._submitButton;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOverlayPopupClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-btn').addEventListener('click', this.close.bind(this));
  }
}
