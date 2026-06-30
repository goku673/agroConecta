import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './components/card/card';
import { ButtonComponent } from './components/button/button';

@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    CardComponent,
    ButtonComponent
  ]
})
export class SharedModule {}
