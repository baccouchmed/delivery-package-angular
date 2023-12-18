import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { ClassyLayoutModule } from 'app/layout/layouts/vertical/classy/classy.module';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QrScannerComponent } from './common/qr-scanner/qr-scanner.component';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QrScannerModule } from './common/qr-scanner/qr-scanner.module';
import { CommonModule } from '@angular/common';
const layoutModules = [
  // Empty
  EmptyLayoutModule,
  // Vertical navigation
  ClassyLayoutModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, FuseDrawerModule, ...layoutModules],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
