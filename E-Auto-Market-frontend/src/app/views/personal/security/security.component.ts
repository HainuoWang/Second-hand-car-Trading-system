import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      cfmPassword: [null, [Validators.required, this.confirmPwdValidator]]
    });
  }

  ngOnInit(): void {
  }


  confirmPwdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  submit(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      user.password = this.validateForm.value.password;
      this.userService.updateUser(user).subscribe(resp => {
        localStorage.clear();
        this.router.navigate(['/login'], { replaceUrl: true });
      });
    }
  }
}
