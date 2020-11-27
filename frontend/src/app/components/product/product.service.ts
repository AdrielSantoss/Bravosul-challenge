import { UserService } from './../user/user.service';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "https://bravosul-app.herokuapp.com/products";
  public jwt: string
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NDM2MjQ0LCJleHAiOjE2MDkwMjgyNDR9.au6BvGhlJiD27QWliMpHu59hKHQI_Bm1vfoE-A33J2w`
  })

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private userService: UserService) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product> {

    return this.http.post<Product>(this.baseUrl, product, {headers: this.headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    console.log(this.jwt)

    return this.http.get<Product>(url, { headers:this.headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product, {headers: this.headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url, {headers: this.headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  count(): Observable<Product[]> {
    const url = `${this.baseUrl}/count`
    return this.http.get<Product[]>(url, { headers:this.headers} ).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {

    this.showMessage("Ocorreu um erro!", true);
    console.log(e)
    return EMPTY;
  }
}
