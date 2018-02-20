import { NgModule } from '@angular/core';

import { NgxDragableDirective } from './ngx-dragable.directive';
import { NgxDropableDirective } from './ngx-dropable.directive';

@NgModule({
  declarations: [
    NgxDragableDirective,
    NgxDropableDirective,
  ],
  exports: [
    NgxDragableDirective,
    NgxDropableDirective,
  ]
})
export class NgxDragdropModule { }
