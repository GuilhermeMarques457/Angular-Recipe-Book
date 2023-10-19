export class User {
  constructor(
    email: string,
    id: string,
    token: string,
    tokenExpirationDate: Date
  ) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = tokenExpirationDate;
  }

  private _token;
  private _tokenExpirationDate;
  email: string;
  id: string;

  getToken() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
