import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'delete-modal',
    imports: [],
    templateUrl: './delete-modal.component.html',
    styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
    title!: string;
    body!: string;

    activeModal = inject(NgbActiveModal);
}
