import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AccountsComponent} from './component/accounts/accounts.component'
import {VendingmachineComponent} from './component/vendingmachine/vendingmachine.component'
import{ LoginComponent } from './component/login/login.component'
import{ RegisterComponent } from './component/register/register.component'
import {AuthGuard} from "./guards/auth.guard";
import {AppRoutingModule} from '../app/app-routing.modules';
import {CookieUtils, SubscribeResultHandler} from "./util/utils";
import {AuthenticationService} from "./service/authentication.service";
import {DashboardComponent} from "./component/dashboard/dashboard.component"
import {BlockchainService} from "./service/blockchain.service";
import {ProgressbarComponent} from "./component/progressbar/progressbar.component"
import {ContractComponent} from "./component/contract/contract.component";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MdInputModule, MdToolbarModule,MdMenuModule,MdProgressBarModule,MdProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContractComponent,
    AccountsComponent,
    LoginComponent,
    RegisterComponent,
    VendingmachineComponent,
    ProgressbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdToolbarModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule
  ],
  providers: [AuthGuard,CookieUtils,AuthenticationService,BlockchainService,SubscribeResultHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
