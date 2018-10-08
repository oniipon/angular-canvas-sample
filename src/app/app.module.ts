import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CanvasModule } from './pages/canvas/canvas.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CanvasModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
