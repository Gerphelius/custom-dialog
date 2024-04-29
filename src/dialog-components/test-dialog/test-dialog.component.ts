import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TestDialogComponent {
  @Input() data!: string;

  private _dialogService = inject(DialogService);

  public closeDialog() {
    this._dialogService.closeCurrentModal();
  }
}
