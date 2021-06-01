import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css']
})
export class IndexListComponent implements OnInit {
  keyword = '';
  cars = [];
  brands = ['Volkswagen', 'Honda', 'Buick', 'Toyota', 'Ford', 'Nissan', 'BMW',
    'Mercedes-Benz', 'Hyundai', 'Audi', 'Chevrolet', 'Cadillac', 'Jeep'];
  prices = [
    { id: 1, name: '£0-£5,000', start: 0, end: 5000 },
    { id: 2, name: '£5,000-£10000', start: 5000, end: 10000 },
    { id: 3, name: '£10000-£15000', start: 10000, end: 15000 },
    { id: 4, name: '£15000-£20000', start: 15000, end: 20000 },
    { id: 5, name: '£20000-£30000', start: 20000, end: 30000 },
    { id: 6, name: '£30000-£50000', start: 30000, end: 50000 },
    { id: 7, name: '£50000+', start: 50000 },
  ];
  brand = '';
  currentPrice;

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    const { start, end } = this.currentPrice || {};
    this.carService.getCars(this.brand, start, end, this.keyword).subscribe(resp => {
      this.cars = resp;
    });
  }
}
