import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './reserve/user/user.component';
import { InfoComponent } from './reserve/info/info.component';
import { TimeComponent } from './reserve/time/time.component';
import { PaymentComponent } from './reserve/payment/payment.component';
import { ResultComponent } from './reserve/result/result.component';

export const routes: Route[] = [{
  path: '', component: LayoutComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: 'auth', component: LoginComponent },
    {
      path: 'reserve', component: ReserveComponent,
      children: [
        { path: '', redirectTo: 'info', pathMatch: 'full' },
        { path: 'info', component: InfoComponent },
        { path: 'user', component: UserComponent },
        { path: 'time', component: TimeComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'result', component: ResultComponent },
      ],
    }
  ],
}];







