import { Pricelevel } from './pricelevel';
import { ProductItemMaterial } from './product-item-material';

export interface Msproduct {
  id: number;
  priceLevels: Pricelevel[];
  productItems: ProductItemMaterial[];
  productCd: string;
  name: string;
  descs: string;
  minQty: number;

}
