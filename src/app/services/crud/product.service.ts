import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient)
  readonly products$ = new BehaviorSubject<Product[]>([])

  getAll() {
    return this.http.get<Product[]>(environment.apiUrl + "products")
      .subscribe(products => this.products$.next(products))
  }

  save(product: any) {
    return this.http
      .post(environment.apiUrl + "product/", product)
      .pipe(tap(() => this.getAll()),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  update(id: number, product: any) {
    return this.http
      .put(environment.apiUrl + "product/" + id, product)
      .pipe(tap(() => this.getAll()), catchError(error => {
        return throwError(error);
      })
    );
  }
}
