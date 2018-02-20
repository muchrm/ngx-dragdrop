import { Directive, ElementRef, OnInit, EventEmitter, Output, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngxDropable]'
})
export class NgxDropableDirective implements OnInit {
  @Input() ngxDropable: any;

  @Output() dropped: EventEmitter<any> = new EventEmitter();

  private el: any;

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }
  ngOnInit() {
    this.el.classList.add('ngx-dropable');
    this.el.setAttribute('id', this.ngxDropable);
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter() {
    this.el.classList.add('ngx-dragdrop-over');
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: any) {
    this.el.classList.remove('ngx-dragdrop-over');
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e: any) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
  }

  @HostListener('drop', ['$event'])
  onDrop(e: any) {
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    this.el.classList.remove('ngx-dragdrop-over');
    const child = JSON.parse(e.dataTransfer.getData('ngx-data'));
    const oldParent = e.dataTransfer.getData('ngx-parent');
    const newParent = this.ngxDropable;
    this.dropped.emit({ child, oldParent, newParent });
  }
}
