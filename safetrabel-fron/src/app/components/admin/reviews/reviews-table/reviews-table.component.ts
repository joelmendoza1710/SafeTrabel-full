import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ReviewsModalComponent } from '../reviews-modal/reviews-modal.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReviewsService } from '../reviews.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../../../shared/toast/toast.service';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

@Component({
  selector: 'app-reviews-table',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
    providers: [ReviewsService],
  templateUrl: './reviews-table.component.html',
  styleUrl: './reviews-table.component.scss'
})
export class ReviewsTableComponent {
  location: any[] = [];
  filteredUsers: any[] = [];
  displayedUsers: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  constructor(private dialog: MatDialog,private _serviceReviews :ReviewsService,private _changeDetectorRef: ChangeDetectorRef,   private toastService: ToastService,) {}

  ngOnInit() {
   this.getlistreviews()
   

  }

  getlistreviews(){
    this._serviceReviews.getlistReviews().subscribe({
      next:(data)=>{
        this.location=data;
        this.filteredUsers = this.location;
        this.updateDisplayedUsers();

      }
    })

  }

  applyFilter() {
    this.filteredUsers = this.location.filter(location =>
      location.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      location.location.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      location.rating.toLowerCase().includes(this.searchTerm.toLowerCase())||
      location.comment.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
    this.currentPage = 0;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedUsers();
  }

  addNewreviews() {
    // Implementar lógica para agregar nuevo usuario
    console.log('Agregar nuevo usuario');
  }

  editreviews(user: User) {
    // Implementar lógica para editar usuario
    console.log('Editar usuario', user);
  }

  deleteeviews(id: any) {
    this._serviceReviews.delete(id).subscribe({
      next: (data) => {},
      error: (error) => {
        this.toastService.showToast(
          'Error al borrar la opiniones.',
          'error'
        );
      },
      complete: () => {
        this._changeDetectorRef.markForCheck();
        this.getlistreviews();
        this.toastService.showToast('opiniones Eliminado', 'success');
      },
    });
  }

 

  agregareviews() {
    const dialogRef = this.dialog.open(ReviewsModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        this.getlistreviews();

      }
    });
  }

  editareviews(usuario: any) {
    const dialogRef = this.dialog.open(ReviewsModalComponent, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        this.getlistreviews();

      }
    });
  }
}
