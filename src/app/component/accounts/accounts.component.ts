/**
 * Created by KeLe on 28/04/2017.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {CookieUtils} from "../../util/utils";
import {BlockchainService} from "../../service/blockchain.service";
import { User } from "app/model/user/user";

@Component({
  selector: 'accounts-component',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [CookieUtils]
})

export class AccountsComponent implements OnInit{
  private accounts: User[]=[];
  @Input() isAdminAccount:boolean;
  constructor(private http:Http, private blockchainService: BlockchainService){}



  ngOnInit(){
    this.blockchainService.getAccounts().subscribe(
      result => {
        this.accounts = result;
      },
      error =>  {console.log(error as string);}
    );
   
    ;
  }
}
