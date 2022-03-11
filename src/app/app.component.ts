import { ApiService } from './service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'formulario';
  displayedColumns: string[] = ['productname', 'categoria', 'data', 'estado', 'price', 'comentario', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, 
    private api : ApiService) { }

  ngOnInit(): void {
   this.getAllProduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='salvar')
      this.getAllProduct();
    })
  }

  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
         this.api.showMessage('Erro ao buscar o produto!')
      }
    })
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=='Atualizar'){
        this.getAllProduct();
      }
    })
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        this.api.showMessage('Produto deletado com suceeso!')
      this.getAllProduct();
      },
      error:()=>{
        this.api.showMessage('Erro ao deletar o produto!')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
