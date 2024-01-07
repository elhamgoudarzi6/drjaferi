import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimengListModule } from '../../primeng-list.module';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
})
export class ReserveComponent implements OnInit {

  items: MenuItem[] | any;
  activeIndex = 0;

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: ' مشاوره حقوقی',
        icon: 'pi pi-user',
        routerLink: 'orderinfo'
      },
      {
        label: 'وقت ملاقات',
        icon: 'pi pi-shopping',
        routerLink: 'time'
      },
      {
        label: 'تکمیل مشخصات',
        icon: 'pi pi-user',
        routerLink: 'userinfo'
      },
      {
        label: ' پرداخت انلاین',
        icon: 'pi pi-user',
        routerLink: 'payment'
      },
    ];
  }

}
