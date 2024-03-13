import DataContentProps from "../interfaces/tableBudgetDataContentProps";

export const calcTotal = (data: DataContentProps) => {
  let totalPerRow: {
    total: number;
    noDiscount: number;
  }[] = [];
  let total = {
    total: 0,
    noDiscount: 0,
  };
  if (data.rows)
    data.rows.map((row, rowIndex) => {
      if (row.values)
        row.values.map((value, index) => {
          if (totalPerRow[index]) {
            totalPerRow[index].total += value;
            totalPerRow[index].noDiscount +=
              data.rows[rowIndex].noDiscount[index];
          } else {
            totalPerRow[index] = {
              total: value,
              noDiscount: data.rows[rowIndex].noDiscount[index],
            };
          }
        });
    });

  total.noDiscount = totalPerRow.reduce(
    (total, arr) => total + arr.noDiscount,
    0
  );
  total.total = totalPerRow.reduce((total, arr) => total + arr.total, 0);

  return {
    total,
    totalPerRow,
  };
};
