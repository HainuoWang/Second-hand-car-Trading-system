import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders = [];
  user: any = {};

  constructor(
    private orderService: OrderService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {
    const user = sessionStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    let user: any = sessionStorage.getItem('user');
    user = JSON.parse(user);
    this.orderService.getOrders(user.id).subscribe(resp => {
      this.orders = resp;
    });
  }

  showConfirmDelete(order: any): void {
    this.modal.confirm({
      nzTitle: 'Do you Want to Delete the order?',
      nzContent: 'After deletion, the relevant data will be deleted accordingly',
      nzOnOk: () => {
        this.orderService.deleteOrder(order.id).subscribe(resp => {
          this.message.success('delete success');
          this.getAllOrders();
        }, error => {
          this.message.error('delete error');
        });
      }
    });
  }

  showConfirm(order): void {
    this.modal.confirm({
      nzTitle: 'Do you Want to Confirm the order?',
      nzContent: 'After Confirm, your wallet will be deducted',
      nzOnOk: () => {
        this.orderService.updateOrderStatus(order.id).subscribe(resp => {
          this.message.success('confirm success');
          this.getAllOrders();
        }, error => {
          this.message.error('confirm error');
        });
      }
    });
  }
}
