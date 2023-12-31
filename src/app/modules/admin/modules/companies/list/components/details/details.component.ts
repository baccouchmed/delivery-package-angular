import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../../../../shared/models/company';
import { environment } from '../../../../../../../../environments/environment';
import { CompanyService } from '../../../../../../../shared/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../../../../../../shared/services/snack-bar.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { FuseConfirmationService } from '../../../../../../../../@fuse/services/confirmation';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  isLoading: boolean;
  urlLogo = `${environment.api}/public/logo/`;
  company = new Company();
  url = `${environment.api}/assets/`;
  id: string;

  constructor(
    private companyService: CompanyService,
    private _router: Router,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.companyService.getCompany(this.id).subscribe(
          (company) => {
            this.company = { ...this.company, ...company };
            this.breadcrumbService.set('home/companies/:id', this.company.name);
          },
          () => {},
        );
      }
    });
  }

  deleteCompany() {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete',
      message: 'Would you like to confirm the deletion ?',
      actions: {
        confirm: {
          label: 'yes',
        },
        cancel: {
          label: 'no',
        },
      },
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        this.companyService.deleteCompany(this.company._id).subscribe(() => {
          this._router.navigate(['']);
        });
      }
    });
  }

  addCompany() {
    this._router.navigate(['/home/companies/add']);
  }

  editCompany() {
    this._router.navigate([`/home/companies/${this.company._id}/edit`]);
  }
}
