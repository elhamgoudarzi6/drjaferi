import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { ReserveComponent } from './reserve/reserve.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Route[] = [{
  path: '', component: UserComponent,
  children: [
    { path: '', component: DashboardComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'profile', component: ProfileComponent },
  ],
}];
