import { Joborders, JobOrderDtls } from './joborders';

export class Deliveryorder {
  id: number;
  deliveryOrderDetails: DeliveryorderDtls [] = [];
  doNo: string;
  doDate: string;
  jobOrder: Joborders;
  jobOrder_data: Joborders[];

}

export class DeliveryorderDtls {
  id: number;
  qty: number;
  joDtl: JobOrderDtls;
}
