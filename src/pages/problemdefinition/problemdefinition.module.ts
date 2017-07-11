import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemdefinitionPage } from './problemdefinition';
import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [
    ProblemdefinitionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemdefinitionPage),
    ElasticModule,
  ],
  exports: [
    ProblemdefinitionPage
  ]
})
export class ProblemdefinitionPageModule {}