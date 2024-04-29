import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { ComponentType, Dialog, DialogConfig } from './dialog';
import { TestDialogComponent } from './dialog-components/test-dialog/test-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialog$ = new Subject<Dialog>();
  private _afterClosed$ = new Subject<unknown>();

  public dialog$ = this._dialog$.asObservable();
  public afterClosed$ = this._afterClosed$.asObservable().pipe(take(1));

  public openTestDialog(data: unknown): void {
    this._openDialog(TestDialogComponent, { data });
  }

  public closeCurrentModal(data?: unknown): void {
    this._dialog$.next({} as Dialog);
    this._afterClosed$.next(data);
  }

  private _openDialog<T>(
    component: ComponentType<T>,
    config?: DialogConfig
  ): void {
    this._dialog$.next({
      component,
      config,
    });
  }
}
