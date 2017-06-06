import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Http, RequestOptions,Headers, Response} from "@angular/http";
import { SubscribeResultHandler, CookieUtils} from "../util/utils";
import {AuthenticationService} from "./authentication.service";
import { User } from "app/model/user/user";

@Injectable()
export class BlockchainService {

  constructor(private http: Http,
              private subscribeResultHandler: SubscribeResultHandler,
              private authService: AuthenticationService) {

  }

  public getStock(): Observable<number> {
    return this.http.get("/api/blockchain/getStock", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public getPercentValueOfStock():Observable<number>{
    return this.http.get("/api/blockchain/getPercentStock", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  /*public getAccounts(): Observable<String[]> {
    return this.http.get("/api/blockchain/getAccounts", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }*/
  public getAccounts(): Observable<User[]> {
    return this.http.get("/api/blockchain/getAccountsWithUsername", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public submitRefill(amount:number ){
    var url = "/api/blockchain/stockRefill/" + amount;
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public submitMin(amount:number ){
    var url = "/api/blockchain/setMinStock/" + amount;
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }
  public submitMax(amount:number ){
    var url = "/api/blockchain/setMaxStock/" + amount;
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public buyOne(){
    var url = "/api/blockchain/buyOne/";
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public getMaxStock(): Observable<number> {
    return this.http.get("/api/blockchain/getMaxStock",this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }
  public getMinStock(): Observable<number> {
    return this.http.get("/api/blockchain/getMinStock", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public getBalanceCurrUser(): Observable<number> {
    return this.http.get("/api/blockchain/getBalanceCurrUser", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }


  public getPeerCount(): Observable<number> {
    return this.http.get("/api/blockchain/getPeerCount", this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public submitSupplier(supplierID:string ){
    var url = "/api/blockchain/setSupplier/" + supplierID;
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public submitnewAdmin(adminID:string){
    var url = "/api/blockchain/addAdmin/" + adminID;
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

  public submitRemoveAdmin(adminID:string){
    var url = "/api/blockchain/removeAdmin/" + adminID;
    return this.http.post(url,{}, this.authService.makeHeaderWithToken())
      .map(this.subscribeResultHandler.handleResponse)
      .catch(this.subscribeResultHandler.handleError);
  }

}
