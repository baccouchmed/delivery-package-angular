import { RefList } from '../models/ref-list';

export enum Applications {
  sso = 'sso',
  i18n = 'i18n',
  delivery = 'delivery',
}

export const listApplications: RefList<Applications>[] = [
  { key: Applications.sso, value: 'Single Sign On' },
  { key: Applications.delivery, value: 'Delivery package' },
  { key: Applications.i18n, value: 'Internationalisation' },
];
