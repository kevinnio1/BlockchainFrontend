import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Peer} from "./model/peer";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Title of app-component';

}
