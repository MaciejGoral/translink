import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TextsService } from 'src/app/services/texts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private ts: TextsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.ts.loginUser(username, password).subscribe((user: any) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.user));
        this.router.navigate(['/']);
      } else {
        this.loginError = 'Invalid username or password';
      }
    });
  }
}
