import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsermodalComponent } from '../usermodal/usermodal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
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
  selector: 'app-user-table',
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
  providers: [UserService],

  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  displayedUsers: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  constructor(
    private dialog: MatDialog,
    private _userService: UserService,
    private toastService: ToastService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getlistuser();
  }

  getlistuser() {
    this._userService.getlistUser().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = this.users;
        this.updateDisplayedUsers();
      },
    });
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  addNewUser() {
    // Implementar lógica para agregar nuevo usuario
    console.log('Agregar nuevo usuario');
  }

  editUser(user: User) {
    // Implementar lógica para editar usuario
    console.log('Editar usuario', user);
  }

  deleteUser(id: any) {
    this._userService.delete(id).subscribe({
      next: (data) => {},
      error: (error) => {
        this.toastService.showToast(
          'Error al borrar el usuario.' + error,
          'error'
        );
      },
      complete: () => {
        this._changeDetectorRef.markForCheck();
        this.getlistuser();
        this.toastService.showToast('Usuario Eliminado', 'success');
      },
    });
  }

  // ... propiedades existentes

  agregarNuevoUsuario() {
    const dialogRef = this.dialog.open(UsermodalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        this.getlistuser();
      }
    });
  }

  editarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(UsermodalComponent, {
      width: '500px',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        this.getlistuser();

      }
    });
  }
}
