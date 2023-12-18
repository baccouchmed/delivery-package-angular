import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../../../../../../shared/services/snack-bar.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { FuseConfirmationService } from '../../../../../../../../@fuse/services/confirmation';
import { environment } from '../../../../../../../../environments/environment';
import { TranslocoHttpLoader } from '../../../../../../../transloco/transloco-root.module';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../../../../shared/services/user.service';
import { User } from '../../../../../../../shared/models/user';
import { listTypes, Types } from '../../../../../../../shared/enums/types';
import { CompanyService } from '../../../../../../../shared/services/company.service';
import { Group } from '../../../../../../../shared/models/group';
import { GroupService } from '../../../../../../../shared/services/group.service';
import { FeatureCodes } from '../../../../../../../shared/enums/feature-codes';
import { FeatureActions } from '../../../../../../../shared/enums/feature-actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: string;
  url = `${environment.api}/assets/`;
  readonly Types = Types;
  user = new User();
  loading = false;
  listTypes = listTypes.filter((el) => el.key === 'internal');
  filteredListGroups: any;
  avatar: File = null;
  image: string;
  avatarExist = false;
  isLoading: any;
  urlAvatar = `${environment.api}/public/avatar/`;
  connectedUser: User;
  loadingAvatar: boolean;
  index: number;
  companyId: string;
  group: Group;
  listGroups: Group[];
  filtredListGroup = [];
  touched: boolean = false;
  confirmPassword: string = null;
  featureCodes = FeatureCodes;
  featureActions = FeatureActions;

  constructor(
    private userService: UserService,
    private _router: Router,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private _fuseConfirmationService: FuseConfirmationService,
    private translocoHttpLoader: TranslocoHttpLoader,
    private companyService: CompanyService,
    public groupService: GroupService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.userService.getSingleUserProfile(this.id).subscribe(
          (user) => {
            this.user = { ...this.user, ...user };
            this.groupService.getAllGroups().subscribe((d) => {
              this.listGroups = d;
              this.filteredListGroups = this.listGroups;
            });
            this.group = this.user.groupsId;
            if (this.user.avatar) {
              this.avatarExist = true;
            }
            this.userService.getUserProfile().subscribe(
              (res: User) => {
                this.connectedUser = res;
              },
              () => {},
            );

            this.breadcrumbService.set('home/users/:id', this.user.name);
          },
          () => {},
        );
      }
    });
  }
  deleteUser() {
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
        this.userService.deleteUser(this.user._id).subscribe(() => {
          this._router.navigate(['']);
        });
      }
    });
  }
  cancelEdit() {
    if (!this.touched) {
      this._router.navigate([`../`], { relativeTo: this.route });
    } else {
      // Open the confirmation dialog
      const confirmation = this._fuseConfirmationService.open({
        title: 'Cancel',
        message: 'Would you like to cancel the modification ?',
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
          this._router.navigate([`../`], { relativeTo: this.route });
        }
      });
    }
  }
  updateUser(myForm: NgForm): void {
    if (!this.user.password || this.user.password === '') {
      this.user.password = null;
    }
    if (this.confirmPassword === '') {
      this.confirmPassword = null;
    }
    if (myForm.valid) {
      if (this.user.password && this.user.password !== this.confirmPassword) {
        this.snackBarService.openSnackBar('Confirm password not match', 'error');
      } else {
        this.isLoading = true;
        this.userService.updateUser(this.user).subscribe(
          () => {
            this._router.navigate(['../'], { relativeTo: this.route });
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          },
        );
      }
    }
  }

  onAvatarSelected(event: Event): void {
    if (event.target['files'] && event.target['files'].length > 0) {
      [this.avatar] = event.target['files'];
      this.sendAvatar();
    }
  }
  sendAvatar(): void {
    const data: FormData = new FormData();
    data.append(`avatar`, this.avatar, this.avatar.name);
    this.loadingAvatar = true;
    this.userService.updateAvatar(data, this.user._id).subscribe(
      (user: User) => {
        this.user.avatar = user.avatar;
        this.loadingAvatar = false;
      },
      () => {
        this.loadingAvatar = false;
      },
    );
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  updateGroup(value: any) {
    if (value) {
      this.group = value;
      this.user.groupsId = value;
    } else {
      this.user.groupsId = null;
      this.group = null;
    }
  }
}
