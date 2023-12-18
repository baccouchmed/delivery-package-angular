import { Route } from '@angular/router';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { FeatureCodes } from './shared/enums/feature-codes';
import { IsAuthorizedGuard } from './core/auth/guards/isAuthorized.guard';
// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
  // Redirect empty path to '/example'

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/profile',
  },
  {
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    path: 'home-page',
    loadChildren: () =>
      import('app/modules/landing/home/home.module').then((m) => m.LandingHomeModule),
  },
  // Coming Soon
  {
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    path: 'coming-soon',
    loadChildren: () =>
      import('app/modules/admin/pages/coming-soon/coming-soon.module').then(
        (m) => m.ComingSoonModule,
      ),
  },
  // Redirect signed in user to the '/example'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'home/profile',
  },
  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'reset-password',
        loadChildren: () =>
          import('app/modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule,
          ),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('app/modules/auth/sign-in/sign-in.module').then((m) => m.AuthSignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('app/modules/auth/sign-up/sign-up.module').then((m) => m.AuthSignUpModule),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('app/modules/auth/sign-out/sign-out.module').then((m) => m.AuthSignOutModule),
      },
    ],
  },

  // Admin routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      // home
      {
        path: 'home',
        data: {
          breadcrumb: {
            label: 'Home',
            info: { myData: { icon: 'home', iconType: 'material' } },
          },
        },
        children: [
          {
            path: '',
            pathMatch: 'prefix',
            redirectTo: 'profile',
          },
          {
            path: 'companies',
            canActivate: [IsAuthorizedGuard],
            canActivateChild: [IsAuthorizedGuard],
            data: {
              breadcrumb: 'Companies',
              feature: FeatureCodes.companies,
            },
            loadChildren: () =>
              import('app/modules/admin/modules/companies/companies.module').then(
                (m) => m.CompaniesModule,
              ),
          },
          {
            path: 'groups',
            canActivate: [IsAuthorizedGuard],
            canActivateChild: [IsAuthorizedGuard],
            data: {
              breadcrumb: 'groups',
              feature: FeatureCodes.groups,
            },
            loadChildren: () =>
              import('app/modules/admin/modules/groups/groups.module').then((m) => m.GroupsModule),
          },
          {
            path: 'features',
            canActivate: [IsAuthorizedGuard],
            canActivateChild: [IsAuthorizedGuard],
            data: {
              breadcrumb: 'features',
              feature: FeatureCodes.features,
            },
            loadChildren: () =>
              import('app/modules/admin/modules/features/features.module').then(
                (m) => m.FeaturesModule,
              ),
          },
          {
            canActivate: [IsAuthorizedGuard],
            canActivateChild: [IsAuthorizedGuard],
            data: {
              breadcrumb: 'Profile',
              feature: FeatureCodes.profile,
            },
            path: 'profile',
            loadChildren: () =>
              import('app/modules/admin/pages/settings/settings.module').then(
                (m) => m.SettingsModule,
              ),
          },
          {
            path: 'users',
            canActivate: [IsAuthorizedGuard],
            canActivateChild: [IsAuthorizedGuard],
            data: {
              breadcrumb: 'Users',
              feature: FeatureCodes.users,
            },
            loadChildren: () =>
              import('app/modules/admin/modules/users/users.module').then((m) => m.UsersModule),
          },
          {
            path: 'paramprojects',
            data: {
              breadcrumb: 'ParamProjects',
            },
            loadChildren: () =>
              import('app/modules/admin/modules/paramProjects/paramProjects.module').then(
                (m) => m.ParamProjectsModule,
              ),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
