export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('mousedown', this._handleClickOverlayPopupClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener('mousedown', this._handleClickOverlayPopupClose.bind(this));
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
