import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { Directive, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dialog } from '../dialog';
import { DialogService } from '../dialog.service';

@Directive({
  selector: '[dialogHost]',
  standalone: true,
})
export class DialogDirective {
  public viewContainerRef = inject(ViewContainerRef);
}

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css'],
  standalone: true,
  imports: [CommonModule, DialogDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainerComponent implements AfterViewInit {
  @ViewChild(DialogDirective, { static: true }) dialogHost!: DialogDirective;
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  private _dialogService = inject(DialogService);
  private _cdRef = inject(ChangeDetectorRef);

  private _subscription!: Subscription;

  ngAfterViewInit(): void {
    this._subscription = this._dialogService.dialog$.subscribe((component) =>
      this._loadComponent(component)
    );
  }

  public onBackdropClick(target: EventTarget | null): void {
    if (target === this.dialog.nativeElement) {
      this._dialogService.closeCurrentModal();
    }
  }

  private _loadComponent(dialog: Dialog): void {
    const viewContainerRef = this.dialogHost.viewContainerRef;

    if (dialog.component) {
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(dialog.component);

      componentRef.instance.data = dialog.config?.data;

      this._cdRef.detectChanges();
      this.dialog.nativeElement.showModal();
    } else {
      this.dialog.nativeElement.close();
      viewContainerRef.clear();
    }
  }

  ngOnDestroy(): void {
    this._subscription && this._subscription.unsubscribe();
  }
}
