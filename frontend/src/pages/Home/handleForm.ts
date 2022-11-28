import serialize from "form-serialize";

interface selectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export function handleForm(
  childValue: any[],
  petValue: any[],
  selectionRange: selectionRange,
  addRows: (rows: any[]) => void
) {
  const formup: HTMLFormElement | any = document.querySelector("#form");
  const responseForm = serialize(formup, { hash: true });

  const oneDay = 24 * 60 * 60 * 1000; // horas*minutos*segundos*milisegundos

  const checkin = selectionRange.startDate;

  const checkout = selectionRange.endDate;

  const daily = Math.round(
    Math.abs((checkin.getTime() - checkout.getTime()) / oneDay)
  );

  console.log(responseForm);
  console.log(childValue);
  console.log(petValue);

  let adultRows = [];
  let childRows: {
    id: number;
    desc: string;
    values: number[];
    total: number;
  }[] = [];
  let petRows: {
    id: number;
    desc: string;
    values: number[];
    total: number;
  }[] = [];
  let totallastRows = [];
  let totalValues: Array<number[]> = [];

  if (!responseForm.category) {
    return;
  }

  const valueRs = 100;

  if (responseForm.adult) {
    let count = Number(responseForm.adult);
    let countDaily = daily;
    let value = [];
    let total = 0;
    while (count > 0) {
      while (countDaily >= 0) {
        value.push(valueRs);
        total += Number(valueRs);
        countDaily--;
      }

      totalValues.push(value)
      adultRows.push({
        id: 100 + count,
        desc: "ADT " + count,
        values: value,
        total: total,
      });
      console.log("ok");
      count--;
    }
  }

  if (childValue.length > 0) {
    childValue.map((child, index) => {
      let countDaily = daily;
      let value = [];
      let total = 0;

      while (countDaily >= 0) {
        value.push(valueRs);
        total += Number(valueRs);
        countDaily--;
      }

      totalValues.push(value)
      childRows.push({
        id: 200 + index,
        desc: "CHD com " + child + " anos",
        values: value,
        total: total,
      });
    });
  }

  if (petValue.length > 0) {
    petValue.map((pet, index) => {
      let countDaily = daily;
      let value = [];
      let total = 0;

      while (countDaily >= 0) {
        value.push(valueRs);
        total += Number(valueRs);
        countDaily--;
      }

      totalValues.push(value)
      childRows.push({
        id: 300 + index,
        desc: "PET porte " + pet,
        values: value,
        total: total,
      });
    });
  }


  console.log('TOTAL', totalValues)
  let totaldosTotaisTotalizador: number[]= [];
  totalValues.map((indicesValues) => {
    indicesValues.map((values, index) => {
        console.log('deplay', values)
        totaldosTotaisTotalizador[index] = totaldosTotaisTotalizador[index] ? totaldosTotaisTotalizador[index] + values : values;
    })
  })

  console.log('nan', totaldosTotaisTotalizador)

  totallastRows.push({
    id: 400,
    desc: 'TOTAL',
    values: totaldosTotaisTotalizador,
    total: totaldosTotaisTotalizador.some((element) => {
        return element;
      }),
  });

  console.log([...adultRows]);

  addRows([...adultRows, ...childRows, ...petRows, ...totallastRows]);
}
