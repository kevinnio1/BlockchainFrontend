/**
 * Created by KeLe on 28/04/2017.
 */

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Http} from "@angular/http";
import {CookieUtils, SubscribeResultHandler} from "../../util/utils";
import {BlockchainService} from "../../service/blockchain.service";
import { FormGroup } from "@angular/forms/forms";




@Component({
  selector: 'vendingmachine-component',
  templateUrl: './vendingmachine.component.html',
  styleUrls: ['./vendingmachine.component.css'],
  providers: [CookieUtils,BlockchainService,SubscribeResultHandler]
})

export class VendingmachineComponent implements OnInit{
  public stock:number=0;
  public maxStock:number=20;
  public minStock:number;
  @Input() isAdminVending:boolean;
  private amount:number;
  private amountMinStock:number;
  private amountMaxStock:number;
  private loadingRefill:boolean = true;
  private loadingBuyOne:boolean = false;
  private loading:boolean=true;
  @Output() updateBalance = new EventEmitter();
  constructor(private http:Http, private blockchainService: BlockchainService){}
  




  submitMin(){
    if(this.amountMinStock>0){
      this.loading = true;
      this.blockchainService.submitMin(this.amountMinStock).subscribe(
        result => {
          console.log(result);
          this.minStock = result;
          this.loading = false;
          this.amountMinStock=null;
        },
        error => {console.log(error as string);
        this.loading=false;
        this.amountMinStock=null;
      }

      );
    }else {
      console.log("niets ingevuld!");
    }
  }
  submitMax(){
    if(this.amountMaxStock>0){
      this.loading=true;
      this.blockchainService.submitMax(this.amountMaxStock).subscribe(
        result => {
          console.log(result);
          this.maxStock = result;
          this.loading=false;
          this.amountMaxStock=null;
        },
        error => {console.log(error as string);
        this.loading=false;
        this.amountMaxStock=null;
    }

      );
    }else {
      console.log("niets ingevuld!");
    }
  }


  submitRefill(){
    if(this.amount>0){
      this.loading=true;
    this.blockchainService.submitRefill(this.amount).subscribe(
      result => {
        console.log(result);
        this.stock = result;
        this.loading=false;
        this.amount = null;
      },
      error => {console.log(error as string);
      this.loading=false;
      this.amount = null;
  }

    );
    }else {
      console.log("niets ingevuld!");
    }
  }

  submitBuyOne() {
    this.loading=true;
    this.blockchainService.buyOne().subscribe(
      result => {
        this.loading=false;
        this.stock = result;
        this.updateBalance.emit(null);
      },
      error => {console.log(error as string);
      this.loading=false;}
    );

  }


  ngOnInit(){
   this.blockchainService.getStock().subscribe(
      result => {
        this.stock = result;
        this.loading=false;

      },
      error =>  {console.log(error as string);}
    );
    this.blockchainService.getMaxStock().subscribe(
      result => {
        this.maxStock = result;
        this.loading=false;

      },
      error =>  {console.log(error as string);}
    );
    this.blockchainService.getMinStock().subscribe(
      result => {this.minStock = result;
      this.loading=false;  
  },
      error => {
        console.log(error as string);
      }
    );
  }
}
