import { ApiService } from './../service/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  estadoList = ["Novo", "Usado", "Remodelado"]
  productForm !: FormGroup;
  actionBtn : string = "Salvar"

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productname : ['', Validators.required],
      categoria : ['', Validators.required],
      estado : ['', Validators.required],
      price : ['', Validators.required],
      comentario : ['', Validators.required],
      data : ['', Validators.required]
    });
    
    if(this.editData){
      this.actionBtn = "Atualizar";
      this.productForm.controls['productname'].setValue(this.editData.productname);
      this.productForm.controls['categoria'].setValue(this.editData.categoria);
      this.productForm.controls['estado'].setValue(this.editData.estado);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comentario'].setValue(this.editData.comentario);
      this.productForm.controls['data'].setValue(this.editData.data);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            this.api.showMessage('Produto adicionado com suceeso!')
            this.productForm.reset();
            this.dialogRef.close('salvar');
            this.updateProduct();
          },
          error:()=>{
            this.api.showMessage('Erro ao adicionar o produto!')
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }
  
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        this.api.showMessage('Produto atualizado com sucesso!')
        this.productForm.reset();
        this.dialogRef.close("Atualizar");
      },
      error:()=>{
        this.api.showMessage('Erro ao atualizar o produto!')
      }
    })
  }
}
