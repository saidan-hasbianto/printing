import { Mscustomer } from './mscustomergroup';
import { Msdeliveryaddr } from './msdeliveryaddr';
import { Msoperator } from './msoperator';
import { Msproduct } from './msproduct';
import { FileUpload } from 'primeng/primeng';

export interface Joborders {
  id: number;
  customerName: string;
  addressOfDelivery: string;
  operatorName: string;
  productName: string;
  jobOrderNo: string;
  refNo: string;
  orderDate: string;
  completionDate: string;
  remarks: string;
  status: string;
  qty: number;
  price: number;
  markup: number;
  fileSource: string;
  fileName: any;
  customer: Mscustomer;
  deliveryAddress: Msdeliveryaddr;
  operator: Msoperator;
  product: Msproduct;
  ischecked?: boolean;
  receipt?: number;
}

