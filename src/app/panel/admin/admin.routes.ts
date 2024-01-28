import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { PlanComponent } from './plan/plan.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ConfigComponent } from './config/config.component';
import { ContactComponent } from './contact/contact.component';
import { ReserveComponent } from './reserve/reserve.component';
import { PaymentComponent } from './payment/payment.component';
import { PriceComponent } from './price/price.component';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'plan', component: PlanComponent },
      { path: 'reserve', component: ReserveComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'price', component: PriceComponent },
      { path: 'user', component: UsersComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'config', component: ConfigComponent },
    ],
  }];
