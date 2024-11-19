import { ChangeDetectorRef, Component } from '@angular/core';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../../../../shared/toast/toast.service';
import { LocationService } from '../location.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-location-table',
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
  providers: [LocationService],

  templateUrl: './location-table.component.html',
  styleUrl: './location-table.component.scss',
})
export class LocationTableComponent {
  location: any[] = [];
  filteredUsers: any[] = [];
  displayedUsers: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(
    private dialog: MatDialog,
    private _LocatitonService: LocationService,
    private toastService: ToastService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getlistlocations();
  }
  getlistlocations() {
    this._LocatitonService.getlislocation().subscribe({
      next: (data) => {
        this.location = data;
        this.filteredUsers = this.location;
        this.updateDisplayedUsers();
      },
    });
  }

  applyFilter() {
    this.filteredUsers = this.location.filter(
      (locations) =>
        locations.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        locations.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        locations.country.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  deletelocation(id: any) {
    this._LocatitonService.delete(id).subscribe({
      next: (data) => {},
      error: (error) => {
        this.toastService.showToast(
          'Error al borrar la localizacion.',
          'error'
        );
        console.log(error);
      },
      complete: () => {
        this._changeDetectorRef.markForCheck();
        this.getlistlocations();
        this.toastService.showToast('localizacion Eliminada', 'success');
      },
    });
  }

  // ... propiedades existentes

  agregarNuevaLocations() {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        // Lógica para agregar nuevo usuario
        this.getlistlocations();
        // Actualizar el array de usuarios y refrescar la tabla
      }
    });
  }

  editarlocation(usuario: any) {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      width: '500px',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        // Lógica para editar usuario
        this.getlistlocations();
        // Actualizar el array de usuarios y refrescar la tabla
      }
    });
  }
}
