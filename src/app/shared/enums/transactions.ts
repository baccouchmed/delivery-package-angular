import { RefList } from '../models/ref-list';

export enum TransactionsEnum {
  pending = 'pending',
  validated = 'validated',
}

export const listTransactionsEnum: RefList<TransactionsEnum>[] = [
  { key: TransactionsEnum.pending, value: 'pending' },
  { key: TransactionsEnum.validated, value: 'validated' },
];
