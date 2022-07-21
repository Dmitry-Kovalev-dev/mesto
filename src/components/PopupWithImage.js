import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popupElement.querySelector('.popup__zoom-img');
    this._caption = this._popupElement.querySelector('.popup__caption');
  }

  open(link, name) {
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
