import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ProductService} from '../../services/crud/product.service';
import {ImgSecuredDirective} from '../../components/img-secured/img-secured.directive';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    RouterLink,
    NgStyle,
    ImgSecuredDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  auth = inject(AuthService)
  productService = inject(ProductService)
  products: Product[] = [];

  ngOnInit() {
    this.productService.getAll()
    this.productService.products$.subscribe(products => this.products = products)
  }
}

//service avec un objet observable de produit qui recharge
