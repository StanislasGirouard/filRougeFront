import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../services/notification.service';
import {ProductService} from '../../services/crud/product.service';
import {FileChooserComponent} from '../../components/file-chooser/file-chooser.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-edit-product',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule, MatSelectModule, FileChooserComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  formBuilder = inject(FormBuilder)
  http =inject(HttpClient)
  activatedRoute = inject(ActivatedRoute)
  notification = inject(NotificationService)
  router = inject(Router)
  productService = inject(ProductService)
  picture: File | null = null;

  form = this.formBuilder.group({
    name: ["test", [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    code: ["ttt", [Validators.required]],
    description: ["un test", []],
    price: [1, [Validators.required, Validators.min(0.1)]],
    state: [{id:1}, [Validators.required]],
    labels: [[] as Label[]]
  })

  states : State[] = []
  labels : Label[] = []
  editedProduct : Product |null = null

  ngOnInit(){
    this.activatedRoute.params.subscribe(parametres => {
      if (parametres["id"]) {
        this.http.get<Product>(environment.apiUrl + "product/" + parametres["id"])
          .subscribe(product => {
            this.form.patchValue(product)
            this.editedProduct = product
          })
      }
    })

    this.http.get<State[]>(environment.apiUrl + "states")
      .subscribe(states => this.states = states)

    this.http.get<Label[]>(environment.apiUrl + "labels")
      .subscribe(labels => this.labels = labels)
  }

  onAddProduct() {
    if(this.form.valid) {
      if (this.editedProduct) {
        this.productService
          .update(this.editedProduct.id, this.form.value)
          .subscribe({
            next: () => this.notification.show("Le produit à bien été modifié", "valid"),
            error: () => this.notification.show("Problème de communication", "error"),
          })
      } else {
        const formData = new FormData();

        formData.set("product", new  Blob([JSON.stringify(this.form.value)], {type: "application/json"}));
        if (this.picture) {
          formData.set("picture", this.picture)
        }

        this.http
          .post(environment.apiUrl + "product", formData)
          .subscribe(product => console.log("OK"))

        // this.productService
        //   .save(this.form.value)
        //   .subscribe({
        //     next: () => this.notification.show("Le produit à bien été ajouté", "valid"),
        //     error: () => this.notification.show("Problème de communication", "error"),
        //   })
      }
      this.router.navigateByUrl("/home");
    }
  }

  compareId(o1: {id: number}, o2 : {id: number}) {
    return o1.id === o2.id
  }

  onSelectedPicture(file : File | null) {
    this.picture = file
  }
}
