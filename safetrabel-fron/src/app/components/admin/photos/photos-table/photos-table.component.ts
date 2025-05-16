import { ChangeDetectorRef, Component } from '@angular/core';
import { PhotosModalComponent } from '../photos-modal/photos-modal.component';
import { PhotosService } from '../photos.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-photos-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [PhotosService],

  templateUrl: './photos-table.component.html',
  styleUrl: './photos-table.component.scss'
})
export class PhotosTableComponent {
  photos: any[] = [];
  filteredUsers: any[] = [];
  displayedUsers: any[] = [];
  searchTerm: string = '';
  pageSize: number = 8;
  currentPage: number = 0;

  constructor(
    private dialog: MatDialog,
    private _photosService: PhotosService,
    private toastService: ToastService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getlistPhotos();
  }
  getlistPhotos() {
    this._photosService.getlisPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.filteredUsers = this.photos;
        this.updateDisplayedUsers();
      },
    });
  }

  applyFilter() {
    this.filteredUsers = this.photos.filter(
      (photo) =>
        photo.location.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      photo.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      photo.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 0;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedUsers();
  }

  deletePhoto(id: any) {
    this._photosService.delete(id).subscribe({
      next: (data) => {},
      error: (error) => {
        this.toastService.showToast(
          'Error al borrar la Foto.',
          'error'
        );
        console.log(error);
      },
      complete: () => {
        this._changeDetectorRef.markForCheck();
        this.getlistPhotos();
        this.toastService.showToast('Foto Eliminada', 'success');
      },
    });
  }

  // ... propiedades existentes

  agregarNuevaPhoto() {
    const dialogRef = this.dialog.open(PhotosModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        // Lógica para agregar nuevo usuario
        this.getlistPhotos();
        // Actualizar el array de usuarios y refrescar la tabla
      }
    });
  }

  editarPhoto(usuario: any) {
    const dialogRef = this.dialog.open(PhotosModalComponent, {
      width: '500px',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        // Lógica para editar usuario
        this.getlistPhotos();
        // Actualizar el array de usuarios y refrescar la tabla 
      }
    });
  }

}
