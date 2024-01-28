import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { UserService } from '../user.service';
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
    private service: UserService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getReservesByUser();
  }

  getReservesByUser(): any {
    this.service.getReservesByUser(this.localStorage.userToken, this.localStorage.userID).subscribe((response: any) => {
      if (response.success === true) {
        this.reserves = response.data;
        console.log(this.reserves);
      } else {
        this.token.checkTokenExamination(response.data, 'user');
      }
    });
  }



}
