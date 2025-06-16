import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formBuilder = inject(FormBuilder)
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  auth = inject(AuthService)

  form = this.formBuilder.group({
    email: ["c@pt.com", [Validators.required, Validators.email]],
    password: ["1234", [Validators.required]],
  })

  onConnection() {
    if (this.form.valid) {
      this.http.post(environment.apiUrl + "login", this.form.value, {responseType: "text"})
        .subscribe({
          next: jwt => {
            this.router.navigateByUrl("/home")
            this.auth.jwtExtract(jwt)
          },
          error: error => {
            if (error.status === 401) {
              this.notification.show("mauvais login / mot de passe", "error")
            }
          }
        })
      }
    }
  }
