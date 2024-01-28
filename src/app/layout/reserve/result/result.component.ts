import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { PrimengListModule } from '../../../primeng-list.module';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  status: any;
  result: any;
  authority: any;
  price: any;
  constructor(
    private route: ActivatedRoute,
    private service: LayoutService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.localStorage.getCurrentUser('current');
    this.route.queryParamMap.subscribe(params => this.status = params.get('Status'));
    this.route.queryParamMap.subscribe(params => this.authority = params.get('Authority'));
    this.route.queryParamMap.subscribe(params => this.price = params.get('price'));
    this.verifyPayment();
  }

  verifyPayment() {
    let data = {
      price: this.price,
      authority: this.authority
    }
    this.service.verifyPayment(this.localStorage.userToken, data).subscribe((response: any) => {
      if (response.success === true) {
        if (response.data.data.code === 100 || response.data.data.code === 101) {
          this.result = true;
        }
      }
      else {
        this.result = false;
      }
    });
  }
}



