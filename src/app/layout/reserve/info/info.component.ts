import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { MessageService, SelectItem } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  providers: [MessageService]
})

export class InfoComponent implements OnInit {
  case!: SelectItem[];
  selectedReason!: string;
  selectedConsultationtype: any
  selectedDoctype: any;
  reasonNames = ['دعاوی مدنی', 'دعاوی کیفری', 'دعاوی خانوادگی', 'دعاوی ثبتی'];
  reason = this.reasonNames.map((val, i, _reasonNames) => {
    return { label: val, value: val }
  });

  caseNames = [
    { reason: 'دعاوی مدنی', case: 'مطالبه سهم الارث' },
    { reason: ' دعاوی مدنی', case: 'مهر و موم ترکه' },
    { reason: 'دعاوی مدنی', case: 'تحریر ترکه' },
    { reason: 'دعاوی مدنی', case: 'تفسیر ترکه' },
    { reason: 'دعاوی مدنی', case: 'اثبات مالکیت' },
    { reason: 'دعاوی مدنی', case: 'خلع ید' },
    { reason: 'دعاوی مدنی', case: 'رفع تصرف عدوانی' },
    { reason: 'دعاوی مدنی', case: 'مطالبه اجرت المثل ایام تصرف' },
    { reason: 'دعاوی مدنی', case: 'رفع مزاحمت' },
    { reason: 'دعاوی مدنی', case: 'ممانت از حق' },
    { reason: 'دعاوی مدنی', case: 'ابطال سند رسمی' },
    { reason: 'دعاوی مدنی', case: 'مطالبه اجاره بها' },
    { reason: 'دعاوی مدنی', case: 'تخلیه ملک' },
    { reason: 'دعاوی مدنی', case: 'اسناد تجاری' },
    { reason: 'دعاوی مدنی', case: 'چک' },
    { reason: 'دعاوی مدنی', case: 'سفته' },
    { reason: 'دعاوی مدنی', case: 'مطالب طلب' },
    { reason: 'دعاوی مدنی', case: 'دعاوی راجب به اسناد تجاری' },
    { reason: 'دعاوی مدنی', case: 'دعاوی شرکتها' },
    { reason: 'دعاوی مدنی', case: 'اعلان ورشکستگی شرکت ها' },
    { reason: 'دعاوی مدنی', case: 'مطالبه سود سهام و...' },
    { reason: 'دعاوی کیفری', case: 'قتل عمد' },
    { reason: 'دعاوی کیفری', case: 'کلاهبرداری' },
    { reason: 'دعاوی کیفری', case: 'مواد مخدر' },
    { reason: 'دعاوی کیفری', case: 'سرقت' },
    { reason: 'دعاوی کیفری', case: 'خیانت در امانت' },
    { reason: 'دعاوی کیفری', case: 'تحصیل مال از طریق نا مشروع' },
    { reason: 'دعاوی کیفری', case: 'جعل و استفاده از سند مجعول' },
    { reason: 'دعاوی کیفری', case: 'تصادفات ' },
    { reason: 'دعاوی کیفری', case: 'مطالبه دیه و...' },
    { reason: 'دعاوی خانوادگی', case: 'مطالبه مهریه' },
    { reason: 'دعاوی خانوادگی', case: 'اجرت المثل ایام زوجیت' },
    { reason: 'دعاوی خانوادگی', case: 'طلاق توافقی' },
    { reason: 'دعاوی خانوادگی', case: 'طلاق به درخواست زوجه' },
    { reason: 'دعاوی خانوادگی', case: 'اثبات زوجیت' },
    { reason: 'دعاوی خانوادگی', case: 'اثبات نسب' },
    { reason: 'دعاوی خانوادگی', case: 'تمکین' },
    { reason: 'دعاوی خانوادگی', case: 'مطالبه نفقه و ...' },
    { reason: 'دعاوی ثبتی', case: 'ابطال سند رسمی' },
    { reason: 'دعاوی ثبتی', case: 'ابطال اجراییه ثبتی' },
    { reason: 'دعاوی ثبتی', case: 'اعتراض به عملیات ثبتی' },
    { reason: 'دعاوی ثبتی', case: 'اعتراض به اجراییه صادره از طریق بانک ها و ابطال عملیات ثبتی آن' },
    { reason: 'دعاوی ثبتی', case: 'اعتراض به عملیات تحدید و حدود' },
    { reason: 'دعاوی ثبتی', case: 'حقوق ارفاقی و ...' },
  ];

  kind = [
    { title: "مشاوره انلاین" },
    { title: "مشاوره تلفنی" },
    { title: "مشاوره حضوری" },
  ];

  constructor(
    private router: Router,
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser('current')) {
      this.getCases(this.selectedReason);
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/auth', { state: { route: 'reserve' } });
    }
  }

  getCases(state: string): any[] {
    return this.case = this.caseNames
      .filter((el) => { return el.reason === state; })
      .map((el) => { return { label: el.case, value: el.case }; });
  }

  sendInfo(): void {
    if (this.selectedDoctype == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'نوع پرونده را انتخاب کنید.',
      });
    }
    else if (this.selectedReason == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'علت مراجعه به وکیل را انتخاب کنید.',
      });
    }
    else if (this.selectedConsultationtype == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'نوع مشاوره را انتخاب کنید.',
      });
    }
    else {
      let data = {
        userID: this.localStorage.userID,
        reason: this.selectedReason,
        consultationType: this.selectedConsultationtype,
        docType: this.selectedDoctype,
      }
      this.service.addReserve(this.localStorage.userToken, data).subscribe((response: any) => {
        if (response.success === true) {
          this.router.navigateByUrl('/reserve/time',{state:{id:response.id}});
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