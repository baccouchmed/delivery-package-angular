import { Country } from './country';
import { Delegation } from './delegation';

export class City {
  id?: string;
  // tslint:disable-next-line:variable-name
  _id?: string;
  code?: string;
  countryId?: Country;
  delegationId?: Delegation;
  cityName?: string;
}
