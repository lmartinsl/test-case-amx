import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const PRIMENG_MODULES = [
  ButtonModule,
  InputTextModule,
  PasswordModule,
  TooltipModule
]
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ...PRIMENG_MODULES
  ],
  exports: [LoginComponent],
  providers: [UserService, MessageService],
})
export class LoginModule {}
