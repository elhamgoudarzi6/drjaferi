import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { MessageService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
import { LocalStorageService } from '../../../auth/local-storage.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [MessageService]

})
export class PaymentComponent implements OnInit {
  price: any;

  constructor(
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getPrice()
  }

  getPrice() {
    this.service.getPrices().subscribe((response: any) => {
      if (response.success === true) {
        this.price = response.data[0].price;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  onPayment() {
    let data = {
      price: this.price,
      userID: this.localStorage.userID,
      reserveID: window.history.state.id,
      date: new Date().toLocaleDateString('fa-IR-u-nu-latn'),
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" }),
    }
    this.service.onPayment(this.localStorage.userToken, data).subscribe((response: any) => {
      let url = response.data;
      document.location.href = url;
    });
  }
}
