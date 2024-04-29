import 'zone.js/dist/zone';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogService } from './dialog.service';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, DialogContainerComponent],
  template: `
    <app-dialog-container />

    <button (click)="dialogService.openTestDialog('Hello dialog!')">Open test dialog</button>
  `,
})
export class App {
  public dialogService = inject(DialogService);
}

bootstrapApplication(App);
