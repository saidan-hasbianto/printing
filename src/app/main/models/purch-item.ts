import { PurchItemDetail } from './purch-item-detail';
import { Vendor } from './vendor';

export class PurchItem {
  id: number;
  purchNo: string;
  purchDate: string;
  remarks: string;
  poNo: string;
  invoiceNo: string;
  refNo: string;
  vendor: Vendor;
  amount?: number;
  totalamt?: number;
  public purchaseItems: PurchItemDetail[];
}
