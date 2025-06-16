import { Routes } from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {LoginComponent} from './page/login/login.component';
import {SignInComponent} from './page/signin/signin.component'
import {Page404Component} from './page/page404/page404.component';
import {EditProductComponent} from './page/edit-product/edit-product.component';
import {UsersComponent} from './page/users/users.component'
import {loggedGuard} from './services/logged.guard';
import {ValidationEmailComponent} from './page/validation-email/validation-email.component';

export const routes: Routes = [
  {path: "home" , component: HomeComponent, canActivate: [loggedGuard]},
  {path: "login", component: LoginComponent},
  {path: "signin", component: SignInComponent},
  {path: "new-product", component: EditProductComponent, canActivate: [loggedGuard]},
  {path: "edit-product/:id", component: EditProductComponent, canActivate: [loggedGuard]},
  {path: "users", component: UsersComponent, canActivate: [loggedGuard]},
  {path: "validate-email/:token", component: ValidationEmailComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", component: Page404Component}
];
