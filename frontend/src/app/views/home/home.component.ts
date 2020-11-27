import { ProductService } from './../../components/product/product.service';
import { Product } from './../../components/product/product.model';
import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Authenticated: Boolean
  public count: Product[]
  public countOff: string

  constructor(private headerService: HeaderService, private productService: ProductService) {
    headerService.headerData = {
      title: 'Início',
      icon: 'home',
      routeUrl: ''
    }
  }

  ngOnInit(): void {
      let user = localStorage.getItem('user')
      if(user){
        this.Authenticated = true
      }else {
        this.Authenticated = false
        this.countOff = "inúmeros"
      }

      this.productService.count().subscribe(count => {
        this.count = count
      })
    
    
  }

}
