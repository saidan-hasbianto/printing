import { Markupreleases } from "./markupreleases";
import { Joborders } from "./joborders";

export interface Markupreleasejoborders {
  id: number;
  amount: number;
  markupRelease: Markupreleases[];
  jobOrder: Joborders[];
}
