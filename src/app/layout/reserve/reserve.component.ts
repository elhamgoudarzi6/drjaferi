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
        routerLink: 'info'
      },
      {
        label: 'وقت ملاقات',
        routerLink: 'time'
      },
      {
        label: 'تکمیل مشخصات',
        routerLink: 'user'
      },
      {
        label: ' پرداخت انلاین',
        routerLink: 'payment'
      },
      {
        label: 'تایید نهایی',
        routerLink: 'result'
      },
    ];
  }

}
