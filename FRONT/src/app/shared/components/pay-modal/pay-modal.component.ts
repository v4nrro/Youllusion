import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pay-modal',
  imports: [],
  templateUrl: './pay-modal.component.html',
  styleUrl: './pay-modal.component.css'
})
export class PayModalComponent {
    title!: string;
    body!: string;

    activeModal = inject(NgbActiveModal);
}
