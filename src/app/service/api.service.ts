import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private snackBar: MatSnackBar, private http : HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  postProduct(data : any) {
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }
  putProduct(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/productList/"+id, data);
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }
}
