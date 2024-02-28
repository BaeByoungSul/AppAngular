import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule   
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  dialogTitle: string ='';
  attribute1: string ='';
  confirmMessage : string = '';
  returnMsg: string ="OK";

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data : {  dialogTitle: string, 
                    confirmMessage: string,
                     attribute1: string}

    // @Inject(MAT_DIALOG_DATA) 
    // public data : {  dialogTitle: string, confirmMessage: string, attribute1: string}
  ){
    console.log(data.attribute1);
    
    this.dialogTitle = data.dialogTitle
    this.confirmMessage = data.confirmMessage
    this.attribute1 = data.attribute1
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
