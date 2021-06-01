import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {

  userInfo: any = {};

  constructor(private http: HttpClient) {}

  create(car: any): Observable<any> {
    return this.http.post('/api/car/', car);
  }

  getCars(brand?: string, startPrice?: number, endPrice?: number,
          keyword?: string, seller?: string, status?: number): Observable<any> {
    const params: any = {};
    if (brand) {
      params.brand = brand;
    }
    if (startPrice != null) {
      params.startPrice = startPrice;
    }
    if (endPrice != null) {
      params.endPrice = endPrice;
    }
    if (keyword) {
      params.keyword = keyword;
    }
    return this.http.get('/api/car/', {
      params
    });
  }

  getCarById(id: string): Observable<any> {
    return this.http.get('/api/car/' + id + '/');
  }
}
