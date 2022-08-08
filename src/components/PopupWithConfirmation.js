import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitDelete) {
    super(popupSelector);
    this._handleSubmitDelete = handleSubmitDelete;
  }

  setCardInfo(card, id) {
    this._card = card;
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitDelete(this._card, this._id);
    })
  }
}
