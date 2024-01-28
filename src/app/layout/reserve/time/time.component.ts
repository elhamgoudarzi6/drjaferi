import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [PrimengListModule, ReactiveFormsModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
  providers: [MessageService]

})
export class TimeComponent implements OnInit {
  plans: any[] = [];
  selectedTime: string | undefined;
  selectedTimes: any
  selectedDate: any;
  selectedDay: any;

  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPlans();
  }

  onChangeDate(e: any) {
    if (e.value === null) {
      this.selectedDate = this.plans[0].date;
    } else {
      this.selectedDate = e.value.date;
      this.selectedTimes = e.value.times;
      this.selectedDay = new Date(e.value.date).toLocaleString("fa", { weekday: "long" })
    }
  }

  getPlans() {
    this.service.getPlans().subscribe((response: any) => {
      if (response.success === true) {
        this.plans = response.data;
        this.selectedDate = this.plans[0].date;
        this.selectedTimes = this.plans[0].times;
        this.selectedDay = new Date(this.selectedDate).toLocaleString("fa", { weekday: "long" })
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  sendTime() {
    if (this.selectedDate == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'تاریخ مشاوره را انتخاب کنید',
      });
    } else if (this.selectedTime == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'ساعت مشاوره را انتخاب کنید',
      });
    }
    else {
      let data = {
        visitDate: this.selectedDate,
        visitTime: this.selectedTime,
      }
      this.service.editReserve(this.localStorage.userToken, window.history.state.id, data).subscribe((response: any) => {
        if (response.success === true) {
          this.router.navigateByUrl('/reserve/user',{state:{id:window.history.state.id}});
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا در ثبت اطلاعات',
          });
        }
      });
    }
  }

}
