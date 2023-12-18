import { Pipe, PipeTransform } from '@angular/core';
import { RefList } from '../../models/ref-list';
import { StatusEnum } from '../../enums/status';
import { SortEnum } from '../../enums/sort';
import { Roles } from '../../enums/roles';
import { StateEnum } from '../../enums/state';
import { Identifiers } from '../../enums/identifiers';
import { TypeVisit } from '../../enums/type-visit';
import { FeatureStatus } from '../../enums/featureStatus';
import { StatusPackage } from '../../enums/status-package';
import { TransactionsEnum } from '../../enums/transactions';
import { Applications } from '../../enums/applications';

@Pipe({
  name: 'refList',
})
export class RefListPipe implements PipeTransform {
  transform(
    value:
      | SortEnum
      | StatusEnum
      | StatusPackage
      | Roles
      | FeatureStatus
      | StateEnum
      | Identifiers
      | TransactionsEnum
      | Applications
      | TypeVisit,
    list: RefList<
      | SortEnum
      | StatusEnum
      | StatusPackage
      | FeatureStatus
      | Roles
      | StateEnum
      | TransactionsEnum
      | Identifiers
      | Applications
      | TypeVisit
    >[],
    valueType?: 'value' | 'subValue',
  ): string {
    const myRef = list.find((refValue) => refValue.key === value);
    if (valueType) {
      return myRef[valueType];
    }
    return myRef.value;
  }
}
