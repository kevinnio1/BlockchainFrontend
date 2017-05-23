import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {User} from "../../model/user/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription;
  private loginForm: FormGroup;
  loading = false;
  error = undefined;
  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required])
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription != null)
      this.loginSubscription.unsubscribe();
  }

  submitLogin(value:any, valid:boolean){
    console.log(value);
    if(!valid) return;
    this.loading = true;
    /*this.loginSubscription = this.authService.login(model.username, model.password).subscribe(result => {
        this.error = undefined;
        this.router.navigate(['/']);
    },
    error => {
        this.error = 'Username or password is incorrect';
        console.log(error as string);
        this.loading = false;
      });*/
  }
}
