import { RefList } from '../models/ref-list';

export enum TypeCompany {
  clinic = 'clinic',
  veterinary = 'veterinary',
  veterinaries = 'veterinaries',
}

export const listTypeCompany: RefList<TypeCompany>[] = [
  { key: TypeCompany.clinic, value: 'Clinique' },
  { key: TypeCompany.veterinary, value: 'Vétérinaire' },
  { key: TypeCompany.veterinaries, value: 'Vétérinaires' },
];
