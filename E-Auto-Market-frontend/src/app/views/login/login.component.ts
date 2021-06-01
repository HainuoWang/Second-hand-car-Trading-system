import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild ('verifyCode') verifyCode: ElementRef;
  tabIndex = 0;
  signUpping = false;
  loginCode = '';

  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  verifyCodeLine = 8;
  verifyCodeNum = 4;
  verifyCodeWidth = 130;
  verifyCodeHeight = 40;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      cfmPassword: [null, [Validators.required, this.confirmPwdValidator]],
      code: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
    setTimeout(() => {
      this.initVerifyCode();
    }, 100);
  }

  submitSignIn(): void {
    // tslint:disable-next-line:forin
    for (const i in this.signInForm.controls) {
      this.signInForm.controls[i].markAsDirty();
      this.signInForm.controls[i].updateValueAndValidity();
    }
    if (this.signInForm.valid) {
      if (this.signInForm.value.code.toLowerCase() !== this.loginCode.toLowerCase()) {
        this.message.warning('verification code error!');
        return;
      }
      const { email, password } = this.signInForm.value;
      this.userService.login(email, password).subscribe(resp => {
        sessionStorage.setItem('user', JSON.stringify(resp));
        if (resp.roles === 1) {
          this.router.navigate(['/list'], { replaceUrl: true });
        } else {
          this.router.navigate(['/seller'], { replaceUrl: true });
        }
      }, error => {
        if (error.status === 404) {
          this.message.error('invalid email or password!');
        }
      });
    }
  }

  submitSignUp(): void {
    // tslint:disable-next-line:forin
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }
    if (this.signUpForm.valid) {
      const { email, password, code, role } = this.signUpForm.value;
      this.userService.createUser(email, password, code, role).subscribe(resp => {
        this.message.success('sign up success!');
        this.signUpForm.reset();
        this.tabIndex = 0;
      });
    }
  }

  sendCode(): void {
    this.signUpForm.controls.email.markAsDirty();
    this.signUpForm.controls.email.updateValueAndValidity();
    if (this.signUpForm.controls.email.valid) {
      const { email, password } = this.signUpForm.value;
      this.signUpping = true;
      this.userService.signUp(email, password).subscribe(resp => {
        this.message.success('Send successfully, please go to the mailbox to get the verification code!');
      });
    }
  }

  confirmPwdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  randomNum(min, max): number {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  }

  randomCol(min, max): string {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }


  randomStr(): void {
    const randomArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const verifyCodePic = this.verifyCode.nativeElement.getContext('2d');
    for (let i = 0; i < this.verifyCodeNum; i++) {
      const verifyChar = randomArray[this.randomNum(0, randomArray.length - 1)];
      this.loginCode += '' + verifyChar;
      const fontSize = this.randomNum(25, 35);
      const angle = this.randomNum(-30, 30);
      verifyCodePic.font = fontSize + 'px consolas';
      verifyCodePic.textBaseline = 'top';
      verifyCodePic.save();
      verifyCodePic.fillStyle = this.randomCol(50, 150);
      verifyCodePic.translate(30 * i + 15, 15);
      verifyCodePic.rotate(angle * Math.PI / 180);
      verifyCodePic.fillText(verifyChar, -10, -5);
      verifyCodePic.restore();
    }
  }

  randomLine(): void {
    const verifyCodePic = this.verifyCode.nativeElement.getContext('2d');
    for (let i = 0; i < this.verifyCodeLine; i++){
      verifyCodePic.beginPath();
      verifyCodePic.moveTo(this.randomNum(0, this.verifyCodeWidth), this.randomNum(0, this.verifyCodeHeight));
      verifyCodePic.lineTo(this.randomNum(0, this.verifyCodeWidth), this.randomNum(0, this.verifyCodeHeight));
      verifyCodePic.strokeStyle = this.randomCol(50, 230);
      verifyCodePic.closePath();
      verifyCodePic.stroke();
    }
  }

  randomDot(): void {
    const verifyCodePic = this.verifyCode.nativeElement.getContext('2d');
    const verifyCodeDot = 100;
    for (let i = 0; i < verifyCodeDot; i++){
      verifyCodePic.beginPath();
      verifyCodePic.arc(this.randomNum(0, this.verifyCodeWidth), this.randomNum(0, this.verifyCodeHeight), 1, 0, 2 * Math.PI);
      verifyCodePic.closePath();
      verifyCodePic.fillStyle = this.randomCol(50, 200);
      verifyCodePic.fill();
    }
  }

  initVerifyCode(): void {
    this.loginCode = '';
    const verifyCodePic = this.verifyCode.nativeElement.getContext('2d');
    this.verifyCode.nativeElement.setAttribute('width', this.verifyCodeWidth);
    this.verifyCode.nativeElement.setAttribute('height', this.verifyCodeHeight);
    verifyCodePic.fillStyle = this.randomCol(180, 255);
    verifyCodePic.fillRect(0, 0, this.verifyCodeWidth, this.verifyCodeHeight);
    this.randomStr();
    this.randomLine();
    this.randomDot();
  }
}
