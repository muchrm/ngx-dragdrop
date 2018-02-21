import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngxDragable]'
})
export class NgxDragableDirective implements OnInit {
  private el: any;
  @Input() ngxDragable: any;

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }
  ngOnInit() {
    if (this.ngxDragable.dragAble) {
      this.el.draggable = 'true';
    }
    if (this.ngxDragable.data) {
      this.el.classList.add('ngx-dragable');
    } else {
      this.el.classList.add('ngx-nulable');
    }
    this.el.style.background = this.ngxDragable.color;

  }

  @HostListener('dragstart', ['$event'])
  onDown(e: any) {
    this.el.classList.add('ngx-dragdrop-src');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('ngx-data', JSON.stringify(this.ngxDragable));
    e.dataTransfer.setData('ngx-parent', this.el.parentElement.getAttribute('id'));
  }

  @HostListener('dragend', ['$event'])
  onUp(e: any) {
    e.preventDefault();
    this.el.classList.remove('ngx-dragdrop-src');
  }
}
