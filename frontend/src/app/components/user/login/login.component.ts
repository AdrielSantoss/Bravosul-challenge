import { HeaderService } from './../../template/header/header.service';
import { ProductService } from './../../product/product.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = false;
  public Authenticated: Boolean

  user: User = {
    identifier: '',
    password: ''
   
  }

  constructor(private userService: UserService, private productService: ProductService,private headerService: HeaderService,
    private router: Router) {
      headerService.headerData = {
        title: 'Login',
        icon: 'person',
        routeUrl: '/products'
      }
     }

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if(user){
      this.Authenticated = true
      this.router.navigate(['/'])
    }else {
      this.Authenticated = false
    }

  }

  login(): void{
    this.userService.login(this.user).subscribe(() => {
      this.userService.showMessage('Bem vindo!')
      localStorage.setItem('user',  this.user.identifier) 

      this.router.navigate(['/'])
    })
  }

}
