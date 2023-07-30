import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TextsService } from 'src/app/services/texts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string;

  constructor(
    private fb: FormBuilder,
    private ts: TextsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.ts.registerUser(user).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.registerError = 'Please fill in all fields';
    }
  }
}
