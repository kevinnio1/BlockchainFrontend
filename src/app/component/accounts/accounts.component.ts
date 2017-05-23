/**
 * Created by KeLe on 28/04/2017.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {CookieUtils} from "../../util/utils";
import {BlockchainService} from "../../service/blockchain.service";

@Component({
  selector: 'accounts-component',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [CookieUtils]
})

export class AccountsComponent implements OnInit{
  private accounts:String[]=[];
  @Input() isAdminAccount:boolean;
  constructor(private http:Http, private blockchainService: BlockchainService){}



  ngOnInit(){
    this.blockchainService.getAccounts().subscribe(
      result => {
        //console.log(result);
        this.accounts = result;
        //console.log(this.accounts);
      },
      error =>  {console.log(error as string);}
    );
  }
}
