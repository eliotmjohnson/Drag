import {
    Directive,
    EventEmitter,
    HostBinding,
    HostListener,
    Output,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[draggable]',
    standalone: true,
})
export class DraggableDirective {
    removeMouseMoveListener!: () => void;
    removeMouseUpListener!: () => void;
    translateX: number = 0;
    translateY: number = 0;

    constructor(private renderer: Renderer2) {}

    @Output() mouseUpData: EventEmitter<any> = new EventEmitter<any>();

    @HostBinding('style.translate') translate: string = '';
    @HostBinding('style.cursor') cursor: string = 'grab';

    @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        const initalMouseX = event.clientX;
        const initalMouseY = event.clientY;

        const prevTranslateX = this.translateX;
        const prevTranslateY = this.translateY;

        this.cursor = 'grabbing';

        this.removeMouseMoveListener = this.renderer.listen(
            'document',
            'mousemove',
            (e: MouseEvent) => {
                const mousePosX = e.clientX;
                const mousePosY = e.clientY;

                this.translateX = mousePosX - initalMouseX + prevTranslateX;
                this.translateY = mousePosY - initalMouseY + prevTranslateY;

                this.translate = `${this.translateX}px ${this.translateY}px`;
            }
        );

        this.removeMouseUpListener = this.renderer.listen(
            'document',
            'mouseup',
            (data: MouseEvent) => {
                this.removeMouseMoveListener();
                this.removeMouseUpListener();

                this.mouseUpData.emit({
                    event: data,
                });

                this.cursor = 'grab';
            }
        );
    }
}
