import {Injectable} from "@angular/core";
import {BaseRequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
/**
 * Created by KeLe on 27/04/2017.
 */

@Injectable()
export class SubscribeResultHandler {
  handleResponse(res: Response) {
    let body;
    if (res.text()) { // workaround for empty responses
      body = res.json();
    }
    return body || {};
  }

  handleError(error: any) {
    let errMsg: string = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
  @Injectable()
  export class CookieUtils{
  createCookie(name,value,days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value.substring(7) + expires + "; path=/";
  }
  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + "=";
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, "");
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return null;
  }
  deleteCookie(name) {
    this.createCookie(name, "", -1);
  }
}
