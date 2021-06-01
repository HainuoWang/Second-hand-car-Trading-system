import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-seller-order',
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent implements OnInit {

  orders = [];

  constructor(
    private orderService: OrderService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getSellCars();
  }

  getSellCars(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    this.orderService.getOrders(null, user.id).subscribe(resp => {
      this.orders = resp;
    });
  }

  showConfirm(order: any): void {
    this.modal.confirm({
      nzTitle: 'Do you Want to Delete the order?',
      nzContent: 'After deletion, the relevant data will be deleted accordingly',
      nzOnOk: () => {
        this.orderService.deleteOrder(order.id).subscribe(resp => {
          this.message.success('delete success');
          this.getSellCars();
        }, error => {
          this.message.error('delete error');
        });
      }
    });
  }
}
