import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent {

  formBuilder = inject(FormBuilder)
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  auth = inject(AuthService)

  form = this.formBuilder.group({
    email: ["c@pt.com", [Validators.required, Validators.email]],
    password: ["1234", [Validators.required]],
  })

  onSignin() {
    if (this.form.valid) {
      this.http.post(environment.apiUrl + "signin", this.form.value)
        .subscribe({
          next: jwt => {
            this.router.navigateByUrl("/login")
            this.notification.show("Un lien de confirmation vous à été envoyé sur votre adresse email", "warning")
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
