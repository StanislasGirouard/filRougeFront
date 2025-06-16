import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-validation-email',
  imports: [],
  templateUrl: './validation-email.component.html',
  styleUrl: './validation-email.component.scss'
})
export class ValidationEmailComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute)
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  token?: string;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(parametres => {
      if (parametres["token"]) {
        this.token = parametres["token"]
      }
    })
  }

  onValidateSignin() {
    if (this.token) {
    this.http
      .post<{
        token: string,
        consent: boolean
      }>(environment.apiUrl + "validate-email/", {token : this.token, consent : true})
      .subscribe({
        next : result => {
          this.notification.show("Votre inscription est finalisé, vous pouvez vous connecter", "valid")
          this.router.navigateByUrl("/login")
        }
      })
    }
  }
}
