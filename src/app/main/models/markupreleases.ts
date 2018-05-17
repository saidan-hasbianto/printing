import { Markupreleasejoborders } from './markupreleasejoborders';
import { Joborders } from './joborders';

export class Markupreleases {
  id: number;
  markupReleaseJobOrders: Markupreleasejoborders[];
  markupNo: string;
  releaseDate: string;
  remarks: string;
  payTo: string;
  customer: string;
}

export class Markupreleases2 {
  constructor(
    public id?: string,
    public markupNo?: string,
    public releaseDate?: string,
    public remarks?: string,
    public customer?: string,
    public payTo?: string,
    public markupReleaseJobOrders: MarkupreleaseDtls[] = []
  ){}
}

export class MarkupreleaseDtls {
  constructor(
    public id?: string,
    public amount?: number,
    public jobOrder?: number,
    public jobOrder_data?: Joborders,
    public receipt?: number
  ){}
}
