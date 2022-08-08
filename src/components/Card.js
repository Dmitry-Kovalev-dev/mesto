export default class Card {
  constructor({ name, link, owner, _id }, handleCardClick, handleTrashButtonClick, handleClickLikeButton, selector, userId) {
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._id = _id;
    this._userId = userId;
    this._cardSelector = selector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleClickLikeButton = handleClickLikeButton;
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
    if (this._userId != this._owner._id) {
      this._element.querySelector('.post__trash-btn').style.display = 'none';
    };
    this._setEventListeners();
    this._likeBtn = this._element.querySelector('.post__like-btn');
    return this._element;
  };

  setLikeCount({ likes }) {
    this._likes = likes;
    this._element.querySelector('.post__like-count').textContent = this._likes.length;
    this._idLikes = [];
    this._likes.forEach(like => {
      this._idLikes.push(like._id);
    })
    if (this._idLikes.includes(this._userId)) {
      this._likeBtn.classList.add('post__like-btn_active')
    }
  }

  _setLikeStatus() {
    if (this._likeBtn.classList.contains('post__like-btn_active')) {
      this._handleClickLikeButton(this._id, 'DELETE');
    } else {
      this._handleClickLikeButton(this._id, 'PUT');
    }
    this._likeBtn.classList.toggle('post__like-btn_active');
  };

  _setEventListeners() {
    this._element.querySelector('.post__like-btn').addEventListener('click', () => {
      this._setLikeStatus();
    });

    this._element.querySelector('.post__trash-btn').addEventListener('click', () => {
      this._handleTrashButtonClick(this._element, this._id);
    });

    this._postImg.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  };
}
