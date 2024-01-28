import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [CommonModule, MatrialListModule, PrimengListModule]
})
export class AdminComponent implements OnInit {
  mobile: any;
  fullName: any;
  image: any;
  items: MenuItem[];
  screenWidth: number;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset).pipe(map((result) => result.matches), shareReplay());

  constructor(
    private localStorage: LocalStorageService,
    private breakpointObserver: BreakpointObserver,
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
        routerLink: '/admin',
      },
      {
        label: 'وقت مشاوره',
        icon: 'pi pi-clock',
        routerLink: '/admin/plan',
      },
      {
        label: 'لیست رزرو',
        icon: 'pi pi-list',
        routerLink: '/admin/reserve',
      },
      {
        label: 'لیست تراکنش',
        icon: 'pi pi-dollar',
        routerLink: '/admin/payment',
      },
      {
        label: 'مدیریت تعرفه',
        icon: 'pi pi-euro',
        routerLink: '/admin/price',
      },
      {
        label: 'مدیریت کاربران',
        icon: 'pi pi-users',
        routerLink: '/admin/user',
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-question-circle',
        routerLink: '/admin/faq',
      },
      {
        label: 'مدیریت گالری',
        icon: 'pi pi-images',
        routerLink: '/admin/gallery',
      },
      {
        label: 'مدیریت پیام',
        icon: 'pi pi-comments',
        routerLink: '/admin/contact',
      },
      {
        label: 'تنظیمات',
        icon: 'pi pi-cog pi-spin',
        routerLink: '/admin/config',
      },
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser('current') || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('admin/login');
    }
    this.image = this.localStorage.userImage;
    this.mobile = this.localStorage.userMobile;
    this.fullName = this.localStorage.userFullName;
  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/admin/login');
  }
}
