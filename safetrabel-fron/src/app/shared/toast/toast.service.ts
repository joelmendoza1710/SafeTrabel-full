import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error';
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toastSubject = new BehaviorSubject<Toast | null>(null);

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastSubject.next({ message, type });
    setTimeout(() => this.toastSubject.next(null), 3000); // Hide after 3 seconds
  }

  getToast(): Observable<Toast | null> {
    return this.toastSubject.asObservable();
  }
}
