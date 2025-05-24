import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../home/interfaces/Post';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayModalComponent } from '../../shared/components/pay-modal/pay-modal.component';

@Component({
  selector: 'video-card',
  imports: [DatePipe],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
    post = input.required<Post>();

    #router = inject(Router);
    #ngbModal = inject(NgbModal);

    goToWatch(id: string) {
        this.#router.navigate(['/watch', id], { queryParams: { collapse: true }})
    }

    goToAuthor(id: string) {
        this.#router.navigate(['/profile', id])
    }
    
    payModal(videoTitle: string, author: string) {
        const modalRef = this.#ngbModal.open(PayModalComponent);

        modalRef.componentInstance.title = 'Paying video';
        modalRef.componentInstance.body = `You are buying ${videoTitle} from ${author}.`;

        modalRef.result
        .then((result) => {
           
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
