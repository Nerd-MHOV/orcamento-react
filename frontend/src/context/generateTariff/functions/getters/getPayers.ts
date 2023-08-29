import { DataContentProps } from "../../interfaces";

export function getPayers(dataContent: DataContentProps) {
  let payers: number = 0;

  dataContent.rows.map((row) => {
    if (row.id < 300 && row.values[0] > 90) {
      payers++;
    }
  });
  return payers;
}
