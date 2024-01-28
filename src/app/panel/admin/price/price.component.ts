import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { AdminService } from '../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-price',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengListModule],
  providers: [DialogService, MessageService, ConfirmationService],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss'
})
export class PriceComponent {
  prices: any[] = [];
  form: FormGroup | any;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getprices();
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      price: new FormControl(null),
    });
  }

  getprices(): any {
    this.service.getPrices(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.prices = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

  edit(id:string) {
    this.service.editPrice(this.localStorage.userToken, id, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getprices();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }
  add() {

  }
}