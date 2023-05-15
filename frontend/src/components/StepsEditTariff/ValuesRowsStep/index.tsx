import { TableBody, TableCell, TableRow } from "@mui/material";
import { useContext, useEffect } from "react";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
import { EditTariffContext } from "../../../context/editTariff/editTariff";
import { CurrencyFormat } from "../../CurrencyFormat";

export const ValuesRowsStep = ({
  type,
}: {
  type: "midweek" | "weekend" | "specific";
}) => {
  const { setUHValue, getValue } = useContext(EditTariffContext);

  return (
    <TableBody>
      <TableRow>
        <TableCell>Padrão</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.adt || 0}
            onValueChange={(value) =>
              setUHValue("PAD", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.adtex || 0}
            onValueChange={(value) =>
              setUHValue("PAD", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.chd0 || 0}
            onValueChange={(value) =>
              setUHValue("PAD", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.chd4 || 0}
            onValueChange={(value) =>
              setUHValue("PAD", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.chd8 || 0}
            onValueChange={(value) =>
              setUHValue("PAD", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Padrão Varanda</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.adt || 0}
            onValueChange={(value) =>
              setUHValue("PADV", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.adtex || 0}
            onValueChange={(value) =>
              setUHValue("PADV", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.chd0 || 0}
            onValueChange={(value) =>
              setUHValue("PADV", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.chd4 || 0}
            onValueChange={(value) =>
              setUHValue("PADV", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.chd8 || 0}
            onValueChange={(value) =>
              setUHValue("PADV", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.adt || 0}
            onValueChange={(value) =>
              setUHValue("LUX", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.adtex || 0}
            onValueChange={(value) =>
              setUHValue("LUX", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.chd0 || 0}
            onValueChange={(value) =>
              setUHValue("LUX", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.chd4 || 0}
            onValueChange={(value) =>
              setUHValue("LUX", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.chd8 || 0}
            onValueChange={(value) =>
              setUHValue("LUX", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo Conjugado</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.adt || 0}
            onValueChange={(value) =>
              setUHValue("LUXC", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.adtex || 0}
            onValueChange={(value) =>
              setUHValue("LUXC", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.chd0 || 0}
            onValueChange={(value) =>
              setUHValue("LUXC", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.chd4 || 0}
            onValueChange={(value) =>
              setUHValue("LUXC", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.chd8 || 0}
            onValueChange={(value) =>
              setUHValue("LUXC", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo c/ Hidro</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.adt || 0}
            onValueChange={(value) =>
              setUHValue("LUXH", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.adtex || 0}
            onValueChange={(value) =>
              setUHValue("LUXH", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.chd0 || 0}
            onValueChange={(value) =>
              setUHValue("LUXH", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.chd4 || 0}
            onValueChange={(value) =>
              setUHValue("LUXH", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.chd8 || 0}
            onValueChange={(value) =>
              setUHValue("LUXH", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
