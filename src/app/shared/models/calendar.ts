import { TypeVisit } from '../enums/type-visit';
import { CareBook } from './care-book';

export class CalendarEvent {
  id?: string;
  // tslint:disable-next-line:variable-name
  _id?: string;
  title?: TypeVisit;
  calendarId?: Calendar;
  description?: string;
  start?: Date;
  end?: Date;
  careBookId?: CareBook;
  el?: any;
}
export class Calendar {
  id?: string;
  _id?: string;
  title?: string;
  color?: string;
  visible?: boolean;
}

export type CalendarDrawerMode = 'over' | 'side';

export class CalendarEventException {
  id?: string;
  _id?: string;
  eventId?: string;
  exdate?: string;
}

export type CalendarEventPanelMode = 'view' | 'add' | 'edit';
export type CalendarEventEditMode = 'single' | 'future' | 'all';

export class CalendarSettings {
  id?: string;
  _id?: string;
  dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'll';
  timeFormat?: '12' | '24';
  startWeekOn?: 6 | 0 | 1;
}

export class CalendarWeekday {
  id?: string;
  _id?: string;
  abbr?: string;
  label?: string;
  value?: string;
}
