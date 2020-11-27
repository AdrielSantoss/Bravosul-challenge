import { ProductService } from './../product/product.service';
import { User } from './user.model';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { EventEmitter } from 'events';

@Injectable({
    providedIn: "root",
  })

export class UserService{
    baseUrl = "https://bravosul-app.herokuapp.com/auth/local";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
      }

    login(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl, user).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
          );
    }

    errorHandler(e: any): Observable<any> {
        this.showMessage("Usuário não encontrado!", true);
        console.log(e)
        return EMPTY;
      }

}



