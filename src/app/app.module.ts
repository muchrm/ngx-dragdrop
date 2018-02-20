import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NgxDragdropModule } from './ngx-dragdrop/ngx-dragdrop.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxDragdropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
