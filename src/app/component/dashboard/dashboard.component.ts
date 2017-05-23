import {Component, OnInit, OnDestroy} from "@angular/core";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {BlockchainService} from "../../service/blockchain.service";

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public isAdmin:boolean=false;
  public username:string;
  public balance:number;
  public walletID:string="0x00";
  public connectedPeers:number=0;
  constructor(private authService: AuthenticationService, private router: Router, private blockchainService:BlockchainService) {
  }



  onUpdateBalance(emp){
    this.blockchainService.getBalanceCurrUser().subscribe(
      result=>{

        if(result>0){
          this.balance=result;
        }else {
          this.balance=0;
        }
      },
      error => {
        console.log(error as string);
      }
    );
  }

  ngOnInit()
  {

    this.authService.isAdmin().subscribe(
      result => {
        if(result == true){
          this.isAdmin = true;
        }else {
          this.isAdmin = false;
        }
        },
      error => {
        console.log(error as string);
      }
    );
    this.username= this.authService.getCurrentUsername();
    this.onUpdateBalance(null);
    this.blockchainService.getPeerCount().subscribe(
      result=>{
        if(result>=1){
          this.connectedPeers = result+1;
        }else {
          this.connectedPeers = 1;
        }

      },
      error => {
        console.log(error as string);
      }
    );
    this.authService.getWalletID().subscribe(
      result => {this.walletID = result;}
    );
  }


logout(){
  this.authService.logout();
  this.router.navigate(['/login']);
}


}
