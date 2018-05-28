import { Joborders, JobOrderDtls } from './joborders';

export class Deliveryorder {
  id: string;
  deliveryOrderDetails: DeliveryorderDtls [];
  doNo: string;
  doDate: string;
  jobOrder: Joborders;
  jobOrder_data?: Joborders[];

}

export class DeliveryorderDtls {
  id?: number;
  qty: number;
  qtyJO?: number;
  joDtl: string;
}

export class Deliveryorder2 {
  constructor(
  public id?: string,
  public deliveryOrderDetails: DeliveryorderDtls2 [] = [],
  public doNo?: string,
  public doDate?: string,
  public jobOrder?: Joborders,
  public jobOrder_data: Joborders[] = []
  ){}
}

export class DeliveryorderDtls2 {
  constructor(
  public id?: number,
  public qty?: number,
  public qtyJO?: number,
  public joDtl?: string
  ){}
}
