import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { AdminService } from '../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
  imports: [PrimengListModule],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ReserveComponent implements OnInit {
  reserves: any[] = [];

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getReserves();
  }

  getReserves(): any {
    this.service.getReserves(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.reserves = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }
  
  deleteReserve(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteReserve(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد',
            });
            this.getReserves();
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
