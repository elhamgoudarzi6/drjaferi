import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PrimengListModule } from '../../../../primeng-list.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';


@Component({
  selector: 'app-edit-plan',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengListModule, NgPersianDatepickerModule],
  templateUrl: './edit-plan.component.html',
  styleUrl: './edit-plan.component.scss',
  providers: [MessageService]

})
export class EditPlanComponent {
  form: FormGroup | any;
  times: any[] = [];
  plan: any;


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
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.plan = this.config.data.plan;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      date: new FormControl(this.plan.date),
      times: new FormControl(this.plan.times),
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
      this.service.editPlan(this.localStorage.userToken,this.plan._id, this.form.value).subscribe((response: { success: boolean; data: any; }) => {
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