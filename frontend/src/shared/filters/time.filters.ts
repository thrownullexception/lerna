import dateformat from 'dateformat';
import moment from 'moment';

export class TimeFilters {
  static formatTime(time: string, type?: string): string {
    if (!time) {
      return 'N/A';
    }
    if (type === 'L') {
      return dateformat(time, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    }
    if (type === 'G') {
      return dateformat(time, 'dS mmm, hh:MM');
    }
    return dateformat(time, 'mmmm dS, yyyy');
  }

  static timeAgo(time: string): string {
    return moment(time).fromNow();
  }
}
