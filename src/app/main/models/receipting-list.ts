import { ReceiptJobOrders } from './receipt-job-orders';
import { Mscustomer } from './mscustomergroup';

export interface ReceiptingList {
  id: number;
  receiptJobOrders: ReceiptJobOrders[];
  customerName: string;
  receiptNo: string;
  receiptDate: string;
  remarks: string;
  customer: Mscustomer[];

}
