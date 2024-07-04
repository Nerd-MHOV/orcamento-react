import { TableBody, TableCell, TableRow } from "@mui/material";
import { useContext, useEffect } from "react";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
import { CurrencyFormat } from "../../CurrencyFormat";

export const ValuesRowsStep = ({
  type,
}: {
  type: "midweek" | "weekend" | "specific";
}) => {
  const { setUHValues, getValues, arrTariffs } =
    useContext(CreateTariffContext);

  return (
    <TableBody>
      <TableRow>
        <TableCell >Padrão</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PAD.adt}
            onValueChange={(value) =>
              setUHValues(type, "adt", "PAD", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PAD.adtex}
            onValueChange={(value) =>
              setUHValues(type, "adtex", "PAD", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PAD.chd0}
            onValueChange={(value) =>
              setUHValues(type, "chd0", "PAD", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PAD.chd4}
            onValueChange={(value) =>
              setUHValues(type, "chd4", "PAD", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PAD.chd8}
            onValueChange={(value) =>
              setUHValues(type, "chd8", "PAD", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Padrão Varanda</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PADV.adt}
            onValueChange={(value) =>
              setUHValues(type, "adt", "PADV", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PADV.adtex}
            onValueChange={(value) =>
              setUHValues(type, "adtex", "PADV", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PADV.chd0}
            onValueChange={(value) =>
              setUHValues(type, "chd0", "PADV", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PADV.chd4}
            onValueChange={(value) =>
              setUHValues(type, "chd4", "PADV", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.PADV.chd8}
            onValueChange={(value) =>
              setUHValues(type, "chd8", "PADV", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUX.adt}
            onValueChange={(value) =>
              setUHValues(type, "adt", "LUX", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUX.adtex}
            onValueChange={(value) =>
              setUHValues(type, "adtex", "LUX", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUX.chd0}
            onValueChange={(value) =>
              setUHValues(type, "chd0", "LUX", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUX.chd4}
            onValueChange={(value) =>
              setUHValues(type, "chd4", "LUX", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUX.chd8}
            onValueChange={(value) =>
              setUHValues(type, "chd8", "LUX", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo Conjugado</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXC.adt}
            onValueChange={(value) =>
              setUHValues(type, "adt", "LUXC", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXC.adtex}
            onValueChange={(value) =>
              setUHValues(type, "adtex", "LUXC", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXC.chd0}
            onValueChange={(value) =>
              setUHValues(type, "chd0", "LUXC", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXC.chd4}
            onValueChange={(value) =>
              setUHValues(type, "chd4", "LUXC", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXC.chd8}
            onValueChange={(value) =>
              setUHValues(type, "chd8", "LUXC", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo c/ Hidro</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXH.adt}
            onValueChange={(value) =>
              setUHValues(type, "adt", "LUXH", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXH.adtex}
            onValueChange={(value) =>
              setUHValues(type, "adtex", "LUXH", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXH.chd0}
            onValueChange={(value) =>
              setUHValues(type, "chd0", "LUXH", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXH.chd4}
            onValueChange={(value) =>
              setUHValues(type, "chd4", "LUXH", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValues(type).UHsValues.LUXH.chd8}
            onValueChange={(value) =>
              setUHValues(type, "chd8", "LUXH", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
