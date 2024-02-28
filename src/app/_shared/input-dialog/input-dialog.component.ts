import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule
  ],
  templateUrl: './input-dialog.component.html',
  styleUrl: './input-dialog.component.css'
})
export class InputDialogComponent {
  dialogTitle: string ='';
  attribute1: string ='';
  inputTitle : string = '';
  inputElement: string=''

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data : {  dialogTitle: string, 
                     inputTitle: string,
                     attribute1: string}
  ){
    console.log(data.attribute1);
    
    this.dialogTitle = data.dialogTitle
    this.inputTitle = data.inputTitle
    this.attribute1 = data.attribute1
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
