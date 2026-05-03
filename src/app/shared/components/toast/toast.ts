import { ToastType } from './../../../core/enums/toast-type.enum';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';
import { IToast } from '../../../core/interfaces/toast.interface';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {
  private toastService = inject(ToastService);
  private subscriptions!: Subscription;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  toast: IToast | null = null;
  visible = false;

  readonly ToastType = ToastType;

  ngOnInit(): void {
    this.listenToToast();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    clearTimeout(this.timeout!);
  }

  private show(toast: IToast): void {
    clearTimeout(this.timeout!);

    this.toast = toast;
    this.visible = true;

    this.timeout = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide(): void {
    const el = document.querySelector('.toast');
    el?.classList.add('hiding');

    setTimeout(() => {
      this.visible = false;
      setTimeout(() => {
        this.toast = null;
      }, 300);
    }, 300);
  }

  getTitle(): string {
    const title: Record<ToastType, string> = {
      [ToastType.SUCCESS]: 'Sucesso',
      [ToastType.WARNING]: 'Dados inválidos',
      [ToastType.INFO]: 'Não autorizado',
      [ToastType.ERROR]: 'Erro interno',
    };

    return title[this.toast!.type];
  }

  private listenToToast() {
    this.subscriptions = this.toastService.toast$.subscribe((toast) => {
      if (toast) {
        this.show(toast);
      } else {
        this.hide();
      }
    });
  }
}
