import { Paymentreceipts } from "./paymentreceipts";
import { Mscustomer } from "./mscustomergroup";

export class PaymentreceiptsList {
    id: number;
    customerName: string;
    paymentNo: string;
    paymentDate: string;
    remarks: string;
    amount: number;
    receipt: number;
    customer: number;
}
