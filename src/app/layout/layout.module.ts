import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { MenuListComponent } from './menu-list/menu-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    NavComponent,
    NavContentComponent,
    FooterComponent,
    MenuListComponent
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    NavContentComponent,
    FooterComponent,
    MenuListComponent
  ]
})
export class LayoutModule { }
