import { Markupreleases } from "./markupreleases";
import { Joborders } from "./joborders";

export interface Markupreleasejoborders {
  id: number;
  amount: number;
  jobOrder: Joborders;
}
