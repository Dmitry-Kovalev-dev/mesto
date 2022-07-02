import { openPopupImage } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.post')
      .cloneNode(true);

    return this._cardElement;
  };

  createPostCard() {
    this._element = this._getTemplate();
    this._postImg = this._element.querySelector('.post__img');
    this._postImg.src = this._link;
    this._postImg.alt = this._name;
    this._element.querySelector('.post__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  };


  _handleClickLikeButton() {
    this._element.querySelector('.post__like-btn').classList.toggle('post__like-btn_active');
  };

  _handleClickTrashButton = () => {
    this._element.querySelector('.post__trash-btn').closest('.post').remove();
  };

  _setEventListeners() {
    this._element.querySelector('.post__like-btn').addEventListener('click', () => {
      this._handleClickLikeButton();
    });

    this._element.querySelector('.post__trash-btn').addEventListener('click', () => {
      this._handleClickTrashButton();
    });

    this._postImg.addEventListener('click', () => {
      openPopupImage(this._link, this._name);
    });
  };
}
