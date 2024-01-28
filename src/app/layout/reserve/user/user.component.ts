import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../auth/token.service';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
import { MatrialListModule } from '../../../matrial-list.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [PrimengListModule, FormsModule, ReactiveFormsModule, MatrialListModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  form: FormGroup | any;
  constructor(
    private router: Router,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.localStorage.userMobile),
      fullName: new FormControl(this.localStorage.userFullName),
      phone: new FormControl(this.localStorage.userPhone),
      email: new FormControl(this.localStorage.userEmail),
    });
    this.form.controls.mobile.disable();
  }

  submitForm() {
    if (this.form.controls.fullName.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'نام و نام خانوادگی را وارد کنید'
      });
    } else {
      this.service.editUser(this.localStorage.userToken, this.localStorage.userID, this.form.value)
        .subscribe((response: any) => {
          if (response.success === true) {
            this.router.navigateByUrl('/reserve/payment',{state:{id:window.history.state.id}});
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



