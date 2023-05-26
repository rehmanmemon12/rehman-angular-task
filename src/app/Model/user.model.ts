export class UserModel {
  constructor(private idToken: string) {
  }

  public getToken(expiration: number)  {
    if (!expiration || expiration <= 0) {
      return null;
    }
    return this.idToken;
  }
}
