import { TableBody, TableCell, TableRow } from "@mui/material";
import { initValuesUHS } from "../../../pages/NewTariffs";
import { CurrencyFormat } from "../../CurrencyFormat";

export const ValuesRowsStep = ({
  UHsValues,
  handleSetUHsValues,
}: {
  UHsValues: typeof initValuesUHS;
  handleSetUHsValues: React.Dispatch<
    React.SetStateAction<typeof initValuesUHS>
  >;
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>Padrão</TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PAD.adt}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PAD: {
                  ...prev.PAD,
                  adt: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PAD.adtex}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PAD: {
                  ...prev.PAD,
                  adtex: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PAD.chd0}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PAD: {
                  ...prev.PAD,
                  chd0: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PAD.chd4}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PAD: {
                  ...prev.PAD,
                  chd4: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PAD.chd8}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PAD: {
                  ...prev.PAD,
                  chd8: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Padrão Varanda</TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PADV.adt}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PADV: {
                  ...prev.PADV,
                  adt: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PADV.adtex}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PADV: {
                  ...prev.PADV,
                  adtex: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PADV.chd0}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PADV: {
                  ...prev.PADV,
                  chd0: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PADV.chd4}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PADV: {
                  ...prev.PADV,
                  chd4: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.PADV.chd8}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                PADV: {
                  ...prev.PADV,
                  chd8: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo</TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUX.adt}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUX: {
                  ...prev.LUX,
                  adt: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUX.adtex}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUX: {
                  ...prev.LUX,
                  adtex: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUX.chd0}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUX: {
                  ...prev.LUX,
                  chd0: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUX.chd4}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUX: {
                  ...prev.LUX,
                  chd4: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUX.chd8}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUX: {
                  ...prev.LUX,
                  chd8: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo Conjugado</TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXC.adt}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXC: {
                  ...prev.LUXC,
                  adt: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXC.adtex}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXC: {
                  ...prev.LUXC,
                  adtex: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXC.chd0}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXC: {
                  ...prev.LUXC,
                  chd0: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXC.chd4}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXC: {
                  ...prev.LUXC,
                  chd4: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXC.chd8}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXC: {
                  ...prev.LUXC,
                  chd8: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo c/ Hidro</TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXH.adt}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXH: {
                  ...prev.LUXH,
                  adt: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXH.adtex}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXH: {
                  ...prev.LUXH,
                  adtex: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXH.chd0}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXH: {
                  ...prev.LUXH,
                  chd0: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXH.chd4}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXH: {
                  ...prev.LUXH,
                  chd4: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={UHsValues.LUXH.chd8}
            onValueChange={(value) =>
              handleSetUHsValues((prev) => ({
                ...prev,
                LUXH: {
                  ...prev.LUXH,
                  chd8: value.floatValue || 0,
                },
              }))
            }
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
