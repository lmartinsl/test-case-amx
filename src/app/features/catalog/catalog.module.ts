import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

import { MenubarModule } from 'primeng/menubar';

const PRIMENG_MODULES = [
  MenubarModule
]

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    ...PRIMENG_MODULES,
    CommonModule,
    CatalogRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CatalogComponent],
  providers: [ProductService, UserService],
})
export class CatalogModule {}
