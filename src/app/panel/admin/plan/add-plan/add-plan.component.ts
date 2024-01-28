import { Component } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimengListModule } from '../../../../primeng-list.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';



@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengListModule, NgPersianDatepickerModule],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.scss',
  providers: [MessageService]
})
export class AddPlanComponent {
  form: FormGroup | any;
  times: any[] = [];

  timePlan = [
    { time: "8-9", status: true }, { time: "9-10", status: true },
    { time: "10-11", status: true }, { time: "11-12", status: true },
    { time: "12-13", status: true }, { time: "13-14", status: true },
    { time: "14-15", status: true }, { time: "15-16", status: true },
    { time: "16-17", status: true }, { time: "17-18", status: true },
    { time: "18-19", status: true }, { time: "19-20", status: true },
    { time: "20-21", status: true }, { time: "21-22", status: true }
  ];

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      date: new FormControl(null),
      times: new FormControl(null),
    });
  }

  onSelectTime(e: any, item: any) {
    if (e.checked === true) {
      this.times.push(item);
    } else {
      this.times = this.times.filter(res => { return res !== item; });
    }
    this.form.controls.times.setValue(this.times);
  }

  onSelectDate(e: any) {
    this.form.controls.date.setValue(e.shamsi);
  }

  submitForm() {
    console.log(this.form.value);
    if (this.form.controls.date.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'تاریخ را انتخاب کنید',
      });
    } else if (this.form.controls.times.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'ساعات را انتخاب کنید',
      });
    }
    else {
      this.service.addPlan(this.localStorage.userToken, this.form.value).subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'ثبت شد ',
          });
        }
      });
    }
  }


}