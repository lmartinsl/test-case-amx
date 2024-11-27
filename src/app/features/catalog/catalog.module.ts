import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { UserService } from 'src/app/core/services/user.service';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';

const PRIMENG_MODULES = [
  MenubarModule,
  DataViewModule,
  ButtonModule,
  DialogModule,
  InputNumberModule,
  FileUploadModule,
  InputTextareaModule,
  DropdownModule
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
  providers: [
    CatalogService,
    UserService
  ],
})
export class CatalogModule {}
