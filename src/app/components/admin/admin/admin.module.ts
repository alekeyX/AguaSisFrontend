import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { MenuComponent } from '../menu/menu.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AdminComponent,
    HomeAdminComponent,
    MenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
