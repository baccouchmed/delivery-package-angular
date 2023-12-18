import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FuseAlertType } from '../../../../@fuse/components/alert';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CodeInputComponent } from 'angular-code-input';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { FuseValidators } from '../../../../@fuse/validators';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { CompanyService } from '../../../shared/services/company.service';

@Component({
  selector: 'app-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  animations: fuseAnimations,
})
export class AuthConfirmationRequiredComponent implements OnInit {
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
  type: 'forgot';

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
      if (params?.type) {
        this.type = params.type;
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

  login(resetPasswordNgForm: FormGroupDirective) {
    if (resetPasswordNgForm.valid && this.code?.length === 6) {
      this.loadingSubmit = true;
      if (this.type === 'forgot') {
        this._authService
          .resetPasswordByEmail(this.email, this.resetPasswordForm.value.password, this.code)
          .subscribe(
            () => {
              this.afterLogin();
            },
            () => {
              this.loadingSubmit = false;
            },
          );
      } else {
        this._authService
          .signInWithNewPass(this.email, this.resetPasswordForm.value.password, this.code)
          .subscribe(
            () => {
              this.afterLogin();
            },
            () => {
              this.loadingSubmit = false;
            },
          );
      }
    }
  }

  afterLogin() {
    this.userService.get().subscribe((user: User) => {
      this.user = user;
      this.companyService._company.next(user.companyId);
    });
    this.loadingSubmit = false;
    const redirectURL = '/signed-in-redirect';
    this._router.navigateByUrl(redirectURL);
  }

  onCodeChanged(code: string) {
    this.code = code;
  }
}
