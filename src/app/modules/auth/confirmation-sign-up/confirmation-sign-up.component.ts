import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FuseAlertType } from '../../../../@fuse/components/alert';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CodeInputComponent } from 'angular-code-input';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseValidators } from '../../../../@fuse/validators';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { CompanyService } from '../../../shared/services/company.service';

@Component({
  selector: 'app-confirmation-sign-up',
  templateUrl: './confirmation-sign-up.component.html',
  animations: fuseAnimations,
})
export class AuthConfirmationSignUpComponent implements OnInit {
  @ViewChild('codeInput') codeInput!: CodeInputComponent;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  loading: boolean;
  email: string;
  showAlert: boolean;
  resetPasswordForm: UntypedFormGroup;
  user: User;
  code: string;
  loadingSubmit: boolean;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    private snackBarService: SnackBarService,
    private _formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params?.email) {
        this.email = params.email;
      }
    });
    this.resetPasswordForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
      },
    );
  }

  login() {
    if (this.code?.length === 6) {
      this.loadingSubmit = true;
      this._authService.activateSignUpAccount(this.email, this.code).subscribe(
        () => {
          this.userService.get().subscribe((user: User) => {
            this.user = user;
            this.companyService._company.next(user.companyId);
          });
          this.loadingSubmit = false;
          const redirectURL = '/signed-in-redirect';
          this._router.navigateByUrl(redirectURL);
        },
        () => {
          this.loadingSubmit = false;
        },
      );
    }
  }

  onCodeChanged(code: string) {
    this.code = code;
  }
}
