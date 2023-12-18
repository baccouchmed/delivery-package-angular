import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
  FuseNavigationItem,
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { TranslocoService } from '@ngneat/transloco';
import { User } from '../../../../shared/models/user';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { CompanyService } from '../../../../shared/services/company.service';
import { environment } from '../../../../../environments/environment';
import { MenuService } from '../../../../shared/services/menu.service';
import { Company } from '../../../../shared/models/company';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogService } from '../../../../shared/services/mat-dialog.service';

@Component({
  selector: 'app-classy-layout',
  templateUrl: './classy.component.html',
  styleUrls: ['./classy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  user: User;
  url = `${environment.api}/public/`;
  urlLogo = `${environment.api}/public/logo/`;
  connectedCompany: Company;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  findQrUrl: MatDialogRef<any>;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private userService: UserService,
    private menuService: MenuService,
    private _authService: AuthService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private translateService: TranslocoService,
    private companyService: CompanyService,
    private matDialogService: MatDialogService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    if (
      [
        'https://delivery-nova.tic-nova.com',
        'https://delivery-nova.valid.tic-nova.com',
        'https://delivery-nova.dev.tic-nova.com',
        'http://localhost:4200',
      ].includes(environment.host)
    ) {
      this.isGenerationExpress = false;
    } else {
      this.isGenerationExpress = true;
    }
    // Subscribe to the user service
    this.userService
      .get()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
        this.companyService._company.next(user.companyId);
        this.connectedCompany = user.companyId;
        this.menuService.getMenu().subscribe(
          (data) => {
            this.userService.features = data.features;
            this.navigation = data.menu;
          },
          () => {},
        );
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  isGenerationExpress: any;

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  logout(): void {
    this._router.navigate(['sign-out']);
  }
  refreshCompany(): void {
    this.connectedCompany = this.companyService._company.getValue();
  }
}
