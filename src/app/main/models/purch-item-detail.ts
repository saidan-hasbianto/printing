import { Msitem } from './msitem';

export class PurchItemDetail {
  id: number;
  itemName: string;
  qty: string;
  amount: string;
  amountDariPurchItem?: number;
  item: string;
  minQty?: number;
}
