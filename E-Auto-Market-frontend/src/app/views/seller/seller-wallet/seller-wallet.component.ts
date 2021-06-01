import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-seller-wallet',
  templateUrl: './seller-wallet.component.html',
  styleUrls: ['./seller-wallet.component.css']
})
export class SellerWalletComponent implements OnInit {
  user: any = {};
  price = '';
  isVisible = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
  ) {
    const user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const price = Number(this.price);
    if (!Number.isNaN(this.price)) {
      this.user.balance += price;
      this.userService.updateUser(this.user).subscribe(resp => {
        this.message.success('top up success!');
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isVisible = false;
      }, error => {
        this.message.error('top up error!');
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
