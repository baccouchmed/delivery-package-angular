import { RefList } from '../models/ref-list';

export enum TypeVisit {
  others = 'others',
  coaching = 'coaching',
  leave = 'leave',
  holiday = 'holiday',
  training = 'training',
  sickness = 'sickness',
  officeMeeting = 'officeMeeting',
  rp = 'rp',
  seminar = 'seminar',
  administrativeTask = 'administrativeTask',
  doubleVisit = 'doubleVisit',
  medicalVisit = 'medicalVisit',
}

export const listTypeVisit: RefList<TypeVisit>[] = [
  { key: TypeVisit.medicalVisit, value: 'visite médicale' },
  { key: TypeVisit.coaching, value: 'coaching' },
  { key: TypeVisit.training, value: 'formation' },
  { key: TypeVisit.officeMeeting, value: 'réunion bureau' },
  { key: TypeVisit.holiday, value: 'congrés' },
  { key: TypeVisit.rp, value: 'RP' },
  { key: TypeVisit.seminar, value: 'Séminaire' },
  { key: TypeVisit.administrativeTask, value: 'Tache administrative' },
  { key: TypeVisit.doubleVisit, value: 'visite en double' },
  { key: TypeVisit.leave, value: 'congé' },
  { key: TypeVisit.sickness, value: 'maladie' },
  { key: TypeVisit.others, value: 'autres' },
];
