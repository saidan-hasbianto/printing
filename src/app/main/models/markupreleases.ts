import { Markupreleasejoborders } from './markupreleasejoborders';

export interface Markupreleases {
  id: number;
  customerName: string;
  markupReleaseJobOrders: Markupreleasejoborders[];
  markupNo: string;
  releaseDate: string;
  remarks: string;
  payTo: string;
  customer: string;
}
