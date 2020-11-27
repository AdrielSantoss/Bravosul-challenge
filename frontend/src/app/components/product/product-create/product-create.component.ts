import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {



  product: Product = {
    name: '',
    description: null
  }

  constructor(private productService: ProductService,
      private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if(!user){
      this.productService.showMessage('Necessário efetuar login', true)
      this.router.navigate(['/login'])
    }
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
