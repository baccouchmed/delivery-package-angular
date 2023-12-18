import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceComponent {
  /**
   * Constructor
   */
  constructor(private _router: Router) {}

  return() {
    this._router.navigateByUrl('/home');
  }
}
