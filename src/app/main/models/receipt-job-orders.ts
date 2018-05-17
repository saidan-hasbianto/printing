import { ReceiptingList } from './receipting-list';
import { Joborders } from './joborders';

export interface ReceiptJobOrders {
  id: number;
  amount: number;
  jobOrder: Joborders[];
}
