import { Company } from './company';
import { Animal } from './animal';

export class CareBook {
  id?: string;
  _id?: string;
  name?: string;
  gender?: string;
  companyId: Company;
  animalId: Animal;
  avatar?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  dateOfBirth?: string;
}
export class Visit {
  companyId?: Company;
  careBookId?: CareBook;
  date?: string;
  weight?: string;
  description?: string;

  descriptionRows?: number;
  age?: string;
}
