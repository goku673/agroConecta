import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared-module';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
