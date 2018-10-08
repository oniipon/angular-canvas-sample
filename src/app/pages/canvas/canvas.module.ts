import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasSelectComponent } from './canvas-select/canvas-select.component';
import { CanvasWriteComponent } from './canvas-write/canvas-write.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CanvasComponent, CanvasSelectComponent, CanvasWriteComponent],
  exports: [CanvasComponent]
})
export class CanvasModule {}
