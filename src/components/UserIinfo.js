export default class UserInfo {
  constructor({profileName, profileAbout, profileAvatar}) {
    this._userNameElement = document.querySelector(profileName);
    this._userAboutElement = document.querySelector(profileAbout);
    this._userAvatarElement = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    this._profile = {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent
    }
    return this._profile;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutElement.textContent = data.about;
  }

  getUserAvatar(data) {
    this._userAvatarElement.style.backgroundImage = `url(${data.avatar})`;
  }
}
