import { Company } from './company';
import { FeatureStatus } from '../enums/featureStatus';
export class Feature {
  id?: string;
  // tslint:disable-next-line:variable-name
  _id?: string;
  companyId?: Company;
  code?: string;
  title?: string;
  link?: string;
  subtitle?: string;
  order?: number;
  status?: FeatureStatus;
  type: string;
  icon: string;
  divider: boolean;
  featuresIdParent?: Feature;
}
