import {Router, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../service/authentication.service";
/**
 * Created by Yves on 3/1/2017.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.authenticated) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
