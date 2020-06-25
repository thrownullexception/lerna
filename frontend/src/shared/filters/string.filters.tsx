import * as React from 'react';

export class StringFilters {
  static formatMoney(money: number, suffix = '&#8358;'): JSX.Element {
    let currency = `${suffix}0.00`;

    if (money) {
      const money$1 = Number(money);
      currency = `${suffix}${money$1.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}`;
    }

    return <span dangerouslySetInnerHTML={{ __html: currency }} />;
  }
}
