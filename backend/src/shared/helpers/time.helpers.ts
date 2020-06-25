import * as moment from 'moment';

export class TimeHelpers {
  static getCurrentHour(): number {
    return new Date().getHours();
  }

  static getCountDownSecondsTo(hourTo: number, tomorrow: boolean): number {
    const hourToString = `${hourTo}`.length === 1 ? `0${hourTo}` : `${hourTo}`;
    let dateTo = moment();
    if (tomorrow) {
      dateTo = dateTo.add(1, 'days');
    }
    const dateToMomentFormat = dateTo.format('YYYY-MM-DD');
    return (
      Number(moment(`${dateToMomentFormat} ${hourToString}`).format('X')) -
      Number(moment().format('X'))
    );
  }

  static getNextDate(date: string) {
    return moment(date)
      .add(1, 'days')
      .format('YYYY-MM-DD');
  }
}
