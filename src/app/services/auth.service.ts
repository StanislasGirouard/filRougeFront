import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: string | null = null
  isLogin = false

  constructor() {
    const jwt = localStorage.getItem("jwt")

    if (jwt != null) {
      this.jwtExtract(jwt)
    }
  }

  jwtExtract(jwt: string) {
    localStorage.setItem("jwt", jwt)

    // on découpe le jwt en 3 parties.
    const splitJwt = jwt.split(".");
    // on récupère le body du jwt.
    const jwtBody = splitJwt[1];
    // on découpe la base 64.
    const jsonBody = atob(jwtBody);
    //on transforme le json en objet js.
    const body = JSON.parse(jsonBody)

    this.role = body.role
    this.isLogin = true

  }

  logout() {
    localStorage.removeItem("jwt")
    this.role = null
    this.isLogin = false
  }
}



