import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderService } from '../../services/order.service';
import { NzMessageService } from 'ng-zorro-antd/message';

declare var Swiper;
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: any = {};

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private orderService: OrderService,
    private message: NzMessageService,
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.getCar(params.params.id);
    });
  }

  ngOnInit(): void {
  }

  autoSlipping(): void {
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      slidesPerView: 4,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    const galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    });
    galleryTop.el.onmouseover = () => {
      galleryTop.autoplay.stop();
    };
    galleryTop.el.onmouseleave = () => {
      galleryTop.autoplay.start();
    };
    galleryThumbs.el.onmouseover = () => {
      galleryTop.autoplay.stop();
    };
    galleryThumbs.el.onmouseleave = () => {
      galleryTop.autoplay.start();
    };
  }

  getCar(id: string): void {
    this.carService.getCarById(id).subscribe(resp => {
      this.car = resp;
      setTimeout(() => {
        this.autoSlipping();
      }, 100);
    });
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Do you Want to Buy the car?',
      nzContent: 'When you buy, please check the results in the shopping list',
      nzOnOk: () => {
        let user: any = localStorage.getItem('user');
        user = JSON.parse(user);
        this.orderService.createOrder(user.id, this.car.id, this.car.user_id).subscribe(resp => {
          this.message.success('buy success!');
        }, error => {
          if (error.status === 406) {
            this.message.error('You don\'t have enough money');
          } else {
            this.message.error('buy error!');
          }
        });
      }
    });
  }
}
