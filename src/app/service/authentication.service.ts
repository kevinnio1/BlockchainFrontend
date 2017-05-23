import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Http, RequestOptions,Headers, Response} from "@angular/http";
import {CookieUtils, SubscribeResultHandler} from "../util/utils";
import {combineAll} from "rxjs/operator/combineAll";

@Injectable()
export class AuthenticationService {
  public authenticated;
  private currentUsername: string;
  private TOKEN_IDENTIFIER = "Authorization";
  constructor(private http: Http, private cookieUtils: CookieUtils, private subscribeResultHandler: SubscribeResultHandler) {
    this.checkAuthentication();
  }

  login(username: string, password: string): Observable<boolean> {

    return this.http.post('/api/login', JSON.stringify({ "username": username, "password": password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.headers.get(this.TOKEN_IDENTIFIER);
        console.log("Token nu: ");
        console.log(token);
        if (token) {
          this.authenticated = true;
          this.cookieUtils.createCookie(this.TOKEN_IDENTIFIER,token,100);
          this.setLocalStorageUsername(username);
          // return true to indicate successful login
          return true;
        } else {
          this.setLocalStorageUsername("");
          // return false to indicate failed login
          return false;

        }
      });
  }

  checkAuthentication(){
    this.authenticated = this.cookieUtils.getCookie(this.TOKEN_IDENTIFIER)!=null;
  }

  getToken(){
    return this.cookieUtils.getCookie(this.TOKEN_IDENTIFIER);
  }

  public makeHeaderWithToken():RequestOptions{
    let options = new RequestOptions();
    options.headers = new Headers({ 'Authorization': this.cookieUtils.getCookie('Authorization'),'Content-Type' :'application/json','X-Requested-With': 'XMLHttpRequest'});
    return options;
  }

  isAdmin(): Observable<boolean>{
    return this.http.get('/api/users/isAdmin',this.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }



  register(username: string, password: string, walletID:string): Observable<any> {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' :'application/json','X-Requested-With': 'XMLHttpRequest'});
    return this.http.post('/api/users/register', JSON.stringify({ "username": username, "password": password, "walletID" : walletID}),options);

  }

  private setLocalStorageUsername(username: string): void {
    localStorage.setItem("username", username);
  }

  getCurrentUsername(): string {
    return localStorage.getItem("username") || "";
  }

  getWalletID():Observable<string>{
    return this.http.get('/api/users/getWalletID',this.makeHeaderWithToken())
      .map(result => result.json()['walletID'])
      .catch(this.subscribeResultHandler.handleError);;
  }

  logout(): void {
    // clear cookie to log user out
    this.authenticated = false;
    this.cookieUtils.deleteCookie(this.TOKEN_IDENTIFIER);
    this.setLocalStorageUsername("");
  }
}
