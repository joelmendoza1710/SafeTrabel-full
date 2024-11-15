import { Component } from '@angular/core';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}
@Component({
  selector: 'app-location-table',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './location-table.component.html',
  styleUrl: './location-table.component.scss'
})
export class LocationTableComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;

  ngOnInit() {
    // Simular datos de usuario
    this.users = Array(50).fill(0).map((_, index) => ({
      id: index + 1,
      username: `user${index + 1}`,
      email: `user${index + 1}@example.com`,
      password: 'password123',
      role: index % 3 === 0 ? 'Admin' : 'User',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    }));
    this.filteredUsers = [...this.users];
    this.updateDisplayedUsers();
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  addNewUser() {
    // Implementar lógica para agregar nuevo usuario
    console.log('Agregar nuevo usuario');
  }

  editUser(user: User) {
    // Implementar lógica para editar usuario
    console.log('Editar usuario', user);
  }

  deleteUser(user: User) {
    // Implementar lógica para eliminar usuario
    console.log('Eliminar usuario', user);
  }


  // ... propiedades existentes

  constructor(private dialog: MatDialog) {}

 

  agregarNuevoUsuario() {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        // Lógica para agregar nuevo usuario
        console.log('Nuevo usuario:', resultado);
        // Actualizar el array de usuarios y refrescar la tabla
      }
    });
  }

  editarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        // Lógica para editar usuario
        console.log('Usuario actualizado:', resultado);
        // Actualizar el array de usuarios y refrescar la tabla
      }
    });
  }

}
