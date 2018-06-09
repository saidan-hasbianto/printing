import { Mscustomer } from './mscustomergroup';
import { Msdeliveryaddr } from './msdeliveryaddr';
import { Msoperator } from './msoperator';
import { Msproduct } from './msproduct';
import { FileUpload } from 'primeng/primeng';

export class Joborders2 {
  constructor(
    public id: number,
    public jobOrderNo: string,
    public customer: string,
    public refNo?: string,
    public orderDate?: string,
    public completionDate?: string,
    public deliveryAddress?: string,
    public remarks?: string,
    public operator?: string,
    public status?: string,
    public ischecked?: boolean,
    public receipt?: number,
    // OrderDetails: JobOrderDtls[];
    public product: string[] = [],
    public type: string[] = [],
    public qty: number[] = [],
    public price: number[] = [],
    public markup: number[] = [],
    public fileSource: string[] = [],
    public fileName: File[] = [],
  ) {}
}

export class JobOrderDtls {
  id: number;
  type: string;
  qty: number;
  price: number;
  markup: number;
  fileSource: string;
  fileName: any;
  product: string;
  productName: string;
  qtyDO?: number;
}

export interface Joborders {

    id?: number;
    jobOrderNo?: string;
    customer?: string;
    refNo?: string;
    orderDate?: string;
    completionDate?: string;
    deliveryAddress?: string;
    remarks?: string;
    operator?: string;
    status?: string;
    ischecked?: boolean;
    receipt?: number;
    OrderDetails: JobOrderDtls[];


}
