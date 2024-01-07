import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: any[] = []
  constructor(private service: LayoutService) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.service.getFaqs()
      .subscribe((response: any) => {
        if (response.success === true) {
          this.faqs = response.data;
        } else {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: ''
          // })
        }
      });
  }

}
