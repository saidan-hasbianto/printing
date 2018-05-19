export class PaymPurchList {
  id: number;
  payNo: string;
  payDate: string;
  vendor: string;
  activityCd?: string;
  paymentDtls: PaymPurchDtls[] = [];
  totalItem?: number;
  totalAmt?: number;
}

export class PaymPurchDtls {
  id: number;
  amount: number;
  purch: string;
  purchItemAmt?: number;
}
