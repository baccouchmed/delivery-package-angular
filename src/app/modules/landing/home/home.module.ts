import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [LandingHomeComponent],
  imports: [
    RouterModule.forChild(landingHomeRoutes),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatInputModule,
    MatExpansionModule,
  ],
})
export class LandingHomeModule {}
