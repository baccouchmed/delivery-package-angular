import { Company } from './company';
import { User } from './user';

export class PickUp {
  id?: string;
  _id?: string;
  companyId?: Company;
  providerId?: User;
  pickUpBy?: User;
  pickUpAgent?: User;
  number?: number;
}
