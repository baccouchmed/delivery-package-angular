import { Company } from './company';
import { Group } from './group';
import { Package } from './new-package';

export class User {
  id?: string;
  // tslint:disable-next-line:variable-name
  _id?: string;
  companyId?: Company;
  code?: string;
  confirmationDate?: string;
  name?: string;
  email?: string;
  accountStatus?: boolean;
  groupsId?: Group;
  type?: string;
  avatar?: string;
  phone?: string;
  password?: string;
  pickUpAgent?: User;
  usersCreation?: User;
  usersLastUpdate?: User;
  createdAt?: string;
  updatedAt?: string;
  state?: string;
  packages?: string;
  totalTtc?: string;
  list: Package[];
  location?: string;
  deliveryCost?: number;
}

export class ResToken {
  token: string;
}
