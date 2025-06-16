import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    MatTableModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  http = inject(HttpClient)
  users: User[] = [];
  displayedColumns = [
    "id", "role"
  ]

  ngOnInit() {
    this.http.get<User[]>(environment.apiUrl + "users")
      .subscribe(users => this.users = users)
  }
}

