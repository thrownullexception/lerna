import dateformat from 'dateformat';
import formatDistance from 'date-fns/formatDistance';

export class TimeFilters {
  static formatTime(time: string, type?: 'Expressive' | 'DateAndTime'): string {
    if (!time) {
      return 'N/A';
    }
    if (type === 'Expressive') {
      return dateformat(time, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    }
    if (type === 'DateAndTime') {
      return dateformat(time, 'dS mmm yyyy - hh:MM');
    }
    return dateformat(time, 'mmmm dS, yyyy');
  }

  static timeAgo(time: string): string {
    return formatDistance(new Date(time), new Date(), { addSuffix: true });
  }
}
