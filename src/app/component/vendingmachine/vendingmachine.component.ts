/**
 * Created by KeLe on 28/04/2017.
 */

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Http} from "@angular/http";
import {CookieUtils, SubscribeResultHandler} from "../../util/utils";
import {BlockchainService} from "../../service/blockchain.service";




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
  
  //todo: empty fields after submit




  submitMin(){
    if(this.amountMinStock>0){
      //this.loadingRefill = true;
      this.loading = true;
      this.blockchainService.submitMin(this.amountMinStock).subscribe(
        result => {
          console.log(result);
          this.minStock = result;
          //this.loadingRefill = false;
          this.loading = false;
        },
        error => {console.log(error as string);
        this.loading=false;
      }

      );
    }else {
      console.log("niets ingevuld!");
    }
  }
  submitMax(){
    if(this.amountMaxStock>0){
      //this.loadingRefill = true;
      this.loading=true;
      this.blockchainService.submitMax(this.amountMaxStock).subscribe(
        result => {
          console.log(result);
          this.maxStock = result;
          this.loading=false;
        },
        error => {console.log(error as string);
        this.loading=false;}

      );
    }else {
      console.log("niets ingevuld!");
    }
  }


  submitRefill(){
    if(this.amount>0){
      //this.loadingRefill = true;
      this.loading=true;
    this.blockchainService.submitRefill(this.amount).subscribe(
      result => {
        console.log(result);
        this.stock = result;
        //this.loadingRefill = false;
        this.loading=false;
      },
      error => {console.log(error as string);
      this.loading=false;}

    );
    }else {
      console.log("niets ingevuld!");
    }
  }

  submitBuyOne() {
    //this.loadingBuyOne = true;
    this.loading=true;
    this.blockchainService.buyOne().subscribe(
      result => {
        //this.loadingBuyOne = false;
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
        //console.log("Resultaat get Stock: ");
        //console.log(result);
        this.stock = result;
        //console.log(this.stock);
        //this.loadingRefill = false;
        this.loading=false;

      },
      error =>  {console.log(error as string);}
    );
    this.blockchainService.getMaxStock().subscribe(
      result => {
        //console.log("Resultaat get MAX Stock: ");
        //console.log(result);
        this.maxStock = result;
        //console.log(this.stock);
        //this.loadingRefill = false;
        this.loading=false;

      },
      error =>  {console.log(error as string);}
    );
    this.blockchainService.getMinStock().subscribe(
      result => {this.minStock = result;
     // this.loadingRefill = false;
      this.loading=false;  
  },
      error => {
        console.log(error as string);
      }
    );
  }
}
