import { RefList } from '../models/ref-list';

export enum StatusPackage {
  created = 'created',
  readyPickUp = 'readyPickUp',
  pickedUp = 'pickedUp',
  inStock = 'inStock',
  deliveryPending = 'deliveryPending',
  returned = 'returned',
  delivered = 'delivered',
  closed = 'closed',
  returnProvider = 'returnProvider',
  archived = 'archived',
}

export const listStatusPackage: RefList<StatusPackage>[] = [
  { key: StatusPackage.created, value: 'Created' },
  { key: StatusPackage.readyPickUp, value: 'Ready for pick-up' },
  { key: StatusPackage.pickedUp, value: 'Picked Up' },
  { key: StatusPackage.deliveryPending, value: 'Delivery Pending' },
  { key: StatusPackage.delivered, value: 'Delivered' },
  { key: StatusPackage.inStock, value: 'In stock' },
  { key: StatusPackage.closed, value: 'Closed' },
  { key: StatusPackage.archived, value: 'Archived' },
  { key: StatusPackage.returned, value: 'Returned' },
  { key: StatusPackage.returnProvider, value: 'Return Provider' },
];
