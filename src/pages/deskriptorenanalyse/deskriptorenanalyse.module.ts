import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeskriptorenanalysePage } from './deskriptorenanalyse';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { CommonModule } from '@angular/common';
 
@NgModule({
  declarations: [
    DeskriptorenanalysePage
  ],
  imports: [
    IonicPageModule.forChild(DeskriptorenanalysePage),
	CanvasWhiteboardModule,
	CommonModule,

  ],
  exports: [
    DeskriptorenanalysePage
  ]
})
export class DeskriptorenanalysePageModule {}