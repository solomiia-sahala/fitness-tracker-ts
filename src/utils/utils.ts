import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants/dateFormat.config';

export function formatDate(date: dayjs.Dayjs): string {
return date.format(DATE_FORMAT);
}
