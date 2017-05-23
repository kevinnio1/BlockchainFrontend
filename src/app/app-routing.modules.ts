/**
 * Created by KeLe on 5/05/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component"


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];

const dashboardRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [ ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes),
    RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
