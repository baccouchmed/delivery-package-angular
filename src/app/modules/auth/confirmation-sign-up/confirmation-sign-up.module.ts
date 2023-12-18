import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfirmationSignUpComponent } from './confirmation-sign-up.component';
import { RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CodeInputModule } from 'angular-code-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { authConfirmationSignUpRoutes } from 'app/modules/auth/confirmation-sign-up/confirmation-sign-up.routing';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  declarations: [AuthConfirmationSignUpComponent],
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    CodeInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslocoModule,
    RouterModule.forChild(authConfirmationSignUpRoutes),
  ],
})
export class ConfirmationSignUpModule {}
