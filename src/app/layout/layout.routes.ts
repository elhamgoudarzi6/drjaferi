import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './reserve/user/user.component';
export const routes: Route[] = [{
  path: '', pathMatch: 'prefix',
  providers: [LayoutComponent],
  children: [
    { path: '', component: HomeComponent },
    { path: 'auth', component: LoginComponent },
    {
      path: 'reserve',
      component: ReserveComponent,
      // children: [
      //   { path: '', redirectTo: 'user', pathMatch: 'full' },
      //   { path: 'info', component: UserComponent },
      //   { path: 'user', component: UserComponent },
      // ],
    }
  ],
}];







