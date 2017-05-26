import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormGroup, Validators, FormControl, FormBuilder} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {User} from "../../model/user/user";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private registerSubscription;
  public registerForm: FormGroup;
  loading = false;
  error = undefined;

  password = new FormControl("", Validators.required);
  passwordAgain = new FormControl("", Validators.required);

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: new FormControl('', [<any>Validators.required]),
      "password": this.password,
      "passwordAgain": this.passwordAgain
    }, {validator: this.matchingPasswords('password', 'passwordAgain')});

  
  }

  ngOnDestroy() {
    if (this.registerSubscription != null)
      this.registerSubscription.unsubscribe();
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }

  submitLogin(model: User, valid:boolean){
    //todo: check username already exists
    if(!valid) return;
    this.loading = true;
    console.log(model.username);
    console.log(model.password);

    this.registerSubscription = this.authenticationService.register(model.username, model.password, model.walletID).subscribe(result => {
      console.log("Registration successful!");
      this.error = undefined;
      this.router.navigate(['/login']);
    }, error =>{
      this.error = error._body;
      console.log(error);
      this.loading = false;
    });
  }

}
