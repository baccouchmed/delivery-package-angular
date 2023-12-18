import { Country, Governorate, Municipality } from './country';
import { StatusContract } from '../enums/status-contract';

export class Company {
  id?: string;
  _id?: string;
  code?: string;
  name?: string;
  address?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  logo?: string;
  createdAt?: string;
  status?: string;
  governorateId?: Governorate;
  municipalityId?: Municipality;
  countryId?: Country;
  statusContract?: StatusContract;
  moderatorEmail?: string;
  moderatorName?: string;
}
