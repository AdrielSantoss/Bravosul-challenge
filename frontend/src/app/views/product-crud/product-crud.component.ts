import { Product } from './../../components/product/product.model';
import { ProductService } from './../../components/product/product.service';
import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  count: Product[]

  constructor(private router: Router, private headerService: HeaderService, private productService: ProductService) {
    headerService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
    this.productService.count().subscribe(count => {
      this.count = count
    })
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/products/create'])
  }

}
