import { ReceiptJobOrders } from './receipt-job-orders';
import { Mscustomer } from './mscustomergroup';
import { Joborders } from './joborders';

export interface ReceiptingList {
  id: number;
  receiptJobOrders: ReceiptJobOrders[];
  customerName: string;
  receiptNo: string;
  receiptDate: string;
  remarks: string;
  customer: Mscustomer[];

}

export class Receipting {
  constructor(
    public id?: string,
    public receiptNo?: string,
    public receiptDate?: string,
    public remarks?: string,
    public customer?: number,
    public receiptJobOrders: ReceiptingDtls[] = [],
    public customerName?: string,
  ){}
}

export class ReceiptingDtls {
  constructor(
    public id?: string,
    public jobOrder_data?: Joborders,
    public amount?: number,
    public jobOrder?: number,
    public receipt?: number
  ){}
}
