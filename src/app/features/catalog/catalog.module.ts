import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, CatalogRoutingModule],
  exports: [CatalogComponent],
})
export class CatalogModule {}
