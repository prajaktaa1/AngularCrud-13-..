import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef  , MAT_DIALOG_DATA} from '@angular/material/dialog';

export class MaterialModule {}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  FreshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn : string = "save"

  constructor(
    private FormBuilder: FormBuilder,
    private api: ApiService,
    @Inject (MAT_DIALOG_DATA) public editData :any ,

    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      Comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
      this.productForm.controls['date'].setValue(this.editData.date);

    }
  }
  addProduct(){
    if(!this.editData){
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res)=> {
          alert('Product added successfully');
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Error while adding the product');
        },
      });
    }
  }else{
    this.updateproduct()
  }
  }
  updateproduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product updated sucessfylly");
        this.productForm.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error while updating the record!!");
      }
    })

  }
}
