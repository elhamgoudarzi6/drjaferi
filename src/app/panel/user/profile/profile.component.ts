import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PrimengListModule } from '../../../primeng-list.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengListModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService]

})
export class ProfileComponent implements OnInit {

  admin: any;
  form: FormGroup | any;

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router,
    private service: UserService,) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.localStorage.userMobile),
      phone: new FormControl(this.localStorage.userPhone),
      email: new FormControl(this.localStorage.userEmail),
      fullName: new FormControl(this.localStorage.userFullName),
      image: new FormControl(this.localStorage.userImage),
    });
    this.form.controls.mobile.disable();

  }


  submitForm(): void {
    this.service.editUser(this.localStorage.userToken, this.localStorage.userID, this.form.value)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ویرایش شد',
          });
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/auth');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت نشد ',
          });
        }
      });
  }

  onFileUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.upload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.path);
        this.messageService.add({
          severity: 'success',
          summary: 'آپلود شد ',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'آپلود نشد',
          detail: response.data,
        });
      }
    });
  }

}
