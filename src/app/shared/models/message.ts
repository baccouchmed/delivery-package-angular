import { Company } from './company';
import { User } from './user';
import { Package } from './new-package';

export class Message {
  id?: string;
  // tslint:disable-next-line:variable-name
  _id?: string;
  companyId?: Company;
  packageId?: Package;
  userId?: User;
  description?: string;
  createdAt?: string;
  background?: string;
  justify?: string;
  flex?: string;
}
