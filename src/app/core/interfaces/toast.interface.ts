import { ToastType } from '../enums/toast-type.enum';

export interface IToast {
  message: string;
  type: ToastType;
}
