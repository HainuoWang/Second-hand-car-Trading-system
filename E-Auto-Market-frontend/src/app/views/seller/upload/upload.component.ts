import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { PictureService } from '../../../services/picture.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  loading = false;
  picture: string;
  subPictures = [];
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pictureService: PictureService,
    private msg: NzMessageService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      year: [null, [Validators.required]],
      price: [null, [Validators.required]],
      mileage: [null, [Validators.required]],
      displacement: [null, [Validators.required]],
      amt: [null, [Validators.required]]
    });
  }

  handlePictureChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.picture = info.file.response;
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  handleSubPictureChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.subPictures.push(info.file.response);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  submitForm(): void {
    if (!this.picture) {
      this.msg.warning('Please upload picture');
      return;
    }
    if (this.subPictures.length === 0) {
      this.msg.warning('Please upload sub pictures');
      return;
    }
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      const { brand, name, year, mileage, displacement, amt, price } = this.validateForm.value;
      const carInfo = {
        user: user.id,
        picture: this.picture,
        sub_pictures: this.subPictures.join(','),
        brand,
        name,
        year: year.getFullYear(),
        mileage,
        displacement,
        amt,
        price
      };
      this.carService.create(carInfo).subscribe(resp => {
        this.msg.success('create success!');
        this.picture = '';
        this.subPictures.length = 0;
        this.validateForm.reset();
      });
    }
  }
}
