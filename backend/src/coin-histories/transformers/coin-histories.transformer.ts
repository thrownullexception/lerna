import { CoinHistory } from '../coin-histories.entity';
import {
  TransactionHistorySource,
  TransactionHistoryType,
} from '../coin-histories.types';

export class AdminCoinsHistoryTransformer {
  id: string;
  source: TransactionHistorySource;
  username: string;
  sourceReference: string;
  amount: number;
  type: TransactionHistoryType;
  createdAt: Date;

  constructor(coinHistory: CoinHistory) {
    this.id = coinHistory.id;
    this.source = coinHistory.source;
    this.sourceReference = coinHistory.sourceReference;
    this.amount = coinHistory.amount;
    this.type = coinHistory.type;
    this.createdAt = coinHistory.createdAt;
    if (coinHistory.user) {
      this.username = coinHistory.user.username;
    }
  }
}
