import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseCardModule } from '@fuse/components/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RefListPipe } from './pipes/refList/ref-list.pipe';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { FeaturesDirective } from './directives/features/features.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FuseCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [RefListPipe, SnackBarComponent, FeaturesDirective],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RefListPipe,
    FuseCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SnackBarComponent,
    MatSnackBarModule,
    MatButtonModule,
    FeaturesDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
