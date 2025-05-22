import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { VideoCardComponent } from '../../video/video-card/video-card.component';
import { HomeService } from '../services/home.service';
import { Post } from '../interfaces/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home-page',
    imports: [VideoCardComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {
    #homeService = inject(HomeService);
    #route = inject(ActivatedRoute);

    posts = signal<Post[]>([]);

    search = signal<string>('');
    filter = signal<string>('');
    limit = signal<number>(12);
    page = signal<number>(1);

    @HostListener('window:scroll', [])
    onScroll(): void {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (windowHeight + scrollTop >= documentHeight - 200) {
            this.loadMore();
        }
    }

    constructor() {
        this.#route.queryParamMap.subscribe((params) => {
            this.search.set(params.get('search') || '');
            this.filter.set(params.get('filter') || '');
            this.limit.set(+params.get('limit')! || 12);
            this.page.set(+params.get('page')! || 1);
        });

        effect(() => {
            if (this.page() === 1) {
                this.#homeService
                    .getPosts(this.page(), this.limit(), this.search()!, this.filter()!)
                    .subscribe((response) => this.posts.set(response));
            } else {
                this.#homeService
                    .getPosts(this.page(), this.limit(), this.search()!, this.filter()!)
                    .subscribe((response) =>
                        this.posts.update((posts) => [...posts, ...response])
                    );
            }
        });
    }

    loadMore() {
        this.page.set(this.page() + 1);
    }

    filterPosts(filter: string) {
        this.filter.set(filter);
    }
}
