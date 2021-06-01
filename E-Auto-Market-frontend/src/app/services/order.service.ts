import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {

  userInfo: any = {};

  constructor(private http: HttpClient) {}

  createOrder(userId: string, carId: string, sellerId): Observable<any> {
    return this.http.post('/api/order/', {
      user: userId,
      car: carId,
      seller: sellerId
    });
  }

  getOrders(userId?: string, sellerId?: string): Observable<any> {
    const params: any = {};
    if (userId) {
      params.userId = userId;
    }
    if (sellerId) {
      params.sellerId = sellerId;
    }
    return this.http.get('/api/order/', {
      params
    });
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete('/api/order/' + orderId + '/');
  }

  updateOrderStatus(orderId: string): Observable<any> {
    return this.http.patch('/api/order/' + orderId + '/', {});
  }
}
