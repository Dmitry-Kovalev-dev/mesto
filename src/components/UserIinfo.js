export default class UserInfo {
  constructor({profileName, profileAbout}) {
    this._userNameElement = document.querySelector(profileName);
    this._userAboutElement = document.querySelector(profileAbout);
  }

  getUserInfo() {
    this._profile = {
      name: this._userNameElement.textContent,
      job: this._userAboutElement.textContent
    }
    return this._profile;
  }

  setUserInfo(input) {
    this._userNameElement.textContent = input.name;
    this._userAboutElement.textContent = input.job;
  }
}
