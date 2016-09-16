export interface IAuthConfig {
  apiUrl: string;
  signUpPath: string;
  signInPath: string;
  signOutPath: string;
  tokenName: string;
  emailName: string;
  globalHeaders: {[key: string]: any};
  authHeaders: Array<string>;
}

export class AuthConfig {
  public apiUrl: string;
  public signUpPath: string;
  public signInPath: string;
  public signOutPath: string;

  public tokenName: string;
  public emailName: string;
  public authHeaders: Array<string>;
  public globalHeaders: Object;

  constructor(config: any = {}) {
    this.apiUrl = config.apiUrl || window.location.origin;
    this.signUpPath = config.signUpPath || '/user';
    this.signInPath = config.signInPath || '/user/sign_in';
    this.signOutPath = config.signOutPath || '/user/sign_out';

    this.tokenName = config.tokenName || 'X-USER-TOKEN';
    this.emailName = config.emailName || 'X-USER-EMAIL';
    this.globalHeaders = config.globalHeaders || {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.authHeaders = [
      this.tokenName,
      this.emailName
    ];
  }

  public getConfig(): IAuthConfig {
    return {
      apiUrl: this.apiUrl,
      signUpPath: this.signUpPath,
      signInPath: this.signInPath,
      signOutPath: this.signOutPath,
      tokenName: this.tokenName,
      emailName: this.emailName,
      globalHeaders: this.globalHeaders,
      authHeaders: this.authHeaders
    };
  }

}
