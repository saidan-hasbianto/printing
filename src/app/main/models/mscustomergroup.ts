import { Pricelevel } from './pricelevel';
import { Msmarketing } from './msmarketing';
import { Msdeliveryaddr } from './msdeliveryaddr';
export interface Mscustomer {
  id: number;
  customerCd: string;
  name: string;
  level: Pricelevel[];
  marketing: Msmarketing[];
  address: string;
  cp: string;
  email: string;
  telp: string;
  fax: string;
  mobile: string;
  deliveryAddresses: Msdeliveryaddr[];
}
