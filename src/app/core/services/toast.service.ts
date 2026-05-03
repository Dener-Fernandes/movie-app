import { Injectable } from '@angular/core';
import { IToast } from '../interfaces/toast.interface';
import { Observable, Subject } from 'rxjs';
import { ToastType } from '../enums/toast-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<IToast | null>();

  toast$: Observable<IToast | null> = this.toastSubject.asObservable();

  show(message: string, type: ToastType): void {
    this.toastSubject.next({ message, type });
  }

  hide(): void {
    this.toastSubject.next(null);
  }

  showFromHttpError(error: HttpErrorResponse): void {
    const type = this.getTypeFromStatus(error.status);
    this.toastSubject.next({ message: error.error.message, type });
  }

  private getTypeFromStatus(status: number): ToastType {
    if (status >= 500) return ToastType.ERROR;
    if (status === 401) return ToastType.INFO;
    if (status === 400) return ToastType.WARNING;

    return ToastType.WARNING;
  }
}
