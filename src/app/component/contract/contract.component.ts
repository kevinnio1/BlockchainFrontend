/**
 * Created by KeLe on 28/04/2017.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {CookieUtils} from "../../util/utils";
import {BlockchainService} from "../../service/blockchain.service";

@Component({
  selector: 'contract-component',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  providers: [CookieUtils]
})

export class ContractComponent{
  @Input() isAdminContract:boolean;
  private supplierID:string;
  private adminID:string;
  private removeAdminID:string;
  private loadingContract:boolean = false;
  constructor(private http:Http, private blockchainService: BlockchainService){}


  submitNewAdmin(){
    this.loadingContract=true;
    if(this.adminID!=null){
      this.blockchainService.submitnewAdmin(this.adminID).subscribe(
        result=>{
          this.loadingContract=false;
        },
        error => {
          console.log(error as string);
          this.loadingContract=false;
        }
      );


    }else {
      console.log("vul eens wat in!");
      this.loadingContract=false;
    }

  }
  submitRemoveAdmin(){
    this.loadingContract=true;
    if(this.removeAdminID!=null){
      this.blockchainService.submitRemoveAdmin(this.removeAdminID).subscribe(
        result=>{
          this.loadingContract=false;
        },
        error => {
          console.log(error as string);
          this.loadingContract=false;
        }
      );


    }else {
      console.log("vul eens wat in!");
      this.loadingContract=false;
    }

  }


  submitSupplier(){
    this.loadingContract=true;
    if(this.supplierID!=null){
      this.blockchainService.submitSupplier(this.supplierID).subscribe(
        result=>{
          this.loadingContract=false;
        },
        error => {
          console.log(error as string);
          this.loadingContract=false;
        }
      );


    }else {
      console.log("vul eens wat in!");
      this.loadingContract=false;
    }
  }

}
