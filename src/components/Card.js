export default class Card {
  constructor({name, link}, handleCardClick, selector) {
    this._name = name;
    this._link = link;
    this._cardSelector = selector;
    this._handleCardClick = handleCardClick;
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
    this._element.remove();
  };

  _setEventListeners() {
    this._element.querySelector('.post__like-btn').addEventListener('click', () => {
      this._handleClickLikeButton();
    });

    this._element.querySelector('.post__trash-btn').addEventListener('click', () => {
      this._handleClickTrashButton();
    });

    this._postImg.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  };
}
