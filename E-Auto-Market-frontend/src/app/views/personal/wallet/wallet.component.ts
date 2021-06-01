import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  user: any = {};
  price = '';
  isVisible = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
  ) {
    const user = sessionStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const price = Number(this.price);
    if (Number.isInteger(price)) {
      this.user.balance += price;
      this.userService.updateUser(this.user).subscribe(resp => {
        this.message.success('top up success!');
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.isVisible = false;
      }, error => {
        this.message.error('top up error!');
      });
    } else {
      this.message.warning('Please enter a positive integer!');
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
