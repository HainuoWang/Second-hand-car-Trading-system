import { Component, OnInit } from '@angular/core';
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
  tabIndex = 0;
  signUpping = false;

  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      cfmPassword: [null, [Validators.required, this.confirmPwdValidator]],
      code: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }

  submitSignIn(): void {
    // tslint:disable-next-line:forin
    for (const i in this.signInForm.controls) {
      this.signInForm.controls[i].markAsDirty();
      this.signInForm.controls[i].updateValueAndValidity();
    }
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.userService.login(email, password).subscribe(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        if (resp.roles === 1) {
          this.router.navigate(['/list']);
        } else {
          this.router.navigate(['/seller']);
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
}
