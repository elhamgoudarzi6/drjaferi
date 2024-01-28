import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [MatrialListModule, PrimengListModule]
})

export class UserComponent implements OnInit {
  mobile: any;
  fullName: any;
  image: any;
  items: MenuItem[];
  screenWidth: number;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
  ) {

    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

    this.items = [
      {
        label: 'داشبرد',
        icon: 'pi pi-home',
        routerLink: '/user',
      },
      {
        label: 'وقت مشاوره',
        icon: 'pi pi-clock',
        routerLink: '/user/reserve',
      },

      {
        label: 'لیست تراکنش',
        icon: 'pi pi-dollar',
        routerLink: '/user/payment',
      },
      {
        label: 'حساب کاربری',
        icon: 'pi pi-spin pi-cog',
        routerLink: '/user/profile',
      },
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser('current') || this.localStorage.userType != 'user') {
      this.router.navigateByUrl('/auth');
    }
    this.image = this.localStorage.userImage;
    this.mobile = this.localStorage.userMobile;
    this.fullName = this.localStorage.userFullName;
  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
