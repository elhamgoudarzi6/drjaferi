import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { AdminService } from '../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { PrimengListModule } from '../../../primeng-list.module';
@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  imports: [PrimengListModule],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PlanComponent implements OnInit {
  plans: any[] = [];

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(): any {
    this.service.getPlans(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.plans = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

  closePlan(id: string, status: boolean): any {
    let state = status ? "false" :"true";
    let data = { closed:state }
    let msg = !status ? 'تاریخ بسته شد' : 'تاریخ باز شد';
    this.service.editPlan(this.localStorage.userToken, id, data).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: msg,
        });
        this.getPlans();
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

  show() {
    const ref = this.dialogService.open(AddPlanComponent, {
      header: 'افزودن برنامه',
      width: window.innerWidth > 840 ? '50%' : '95%',
      style: { "font-family": "myfont" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getPlans();
      }
    });
  }

  showEdit(id: string): void {
    let plan = this.plans.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(EditPlanComponent, {
      data: {
        plan,
      },
      header: 'ویرایش برنامه',
      width: window.innerWidth > 840 ? '50%' : '95%',
      style: { "font-family": "myfont" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getPlans();
      }
    });
  }

  deletePlan(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deletePlan(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد',
            });
            this.getPlans();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف نشد ',
            });
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }

}
