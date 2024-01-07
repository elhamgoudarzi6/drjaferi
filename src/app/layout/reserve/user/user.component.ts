import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { TokenService } from 'src/app/auth/token.service';
import { LayoutService } from '../../layout.service';
//import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [PrimengListModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  form: FormGroup | any;
  email: boolean | string | undefined;

  errorMessages = {
    fullName: [{ type: 'required', message: 'وارد کردن نام و  نام خانوادگی ضروری می باشد.' }],
    email: [{ type: 'required', message: ' وارد کردن ایمیل اجباریست.' }],
  };

  constructor(
    private router: Router,
    private service: LayoutService,
    // private token: TokenService,
    // private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    // if (this.localStorage.getCurrentUser()) {
    //   this.createForm();
    // } else {
    //   this.localStorage.removeCurrentUser();
    //   this.router.navigateByUrl('/auth', { state: { route: 'reserve' } });
    // }
  }

  createForm() {
    this.form = new FormGroup({
      // mobile: new FormControl(this.localStorage.userMobile),
      // fullName: new FormControl(this.localStorage.userFullName),
      // phone: new FormControl(this.localStorage.userPhone),
      // email: new FormControl(this.localStorage.userEmail),
    });
    this.form.controls.mobile.disable();
  }

  submitForm(): void {
    // this.service
    //   .editUser(this.localStorage.userToken, this.localStorage.userID, this.form.value)
    //   .subscribe((response: any) => {
    //     if (response.success === true) {
    //       this.router.navigateByUrl('/order/payment');
    //     } else {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'خطا در ثبت اطلاعات',
    //       });
    //     }
    //   });
    this.router.navigateByUrl('/reserve/payment');
  }

}
