import { GroupValuesProps, TariffTypesProps } from "../../hooks/api/interfaces";
import { initValuesUHS } from "../../pages/Tariffs/NewTariffs";
export interface CreateTariffProps {
  dates: string[];
  tariffs: TariffsDiscriminated;
  type: TariffTypesProps;
}

export interface TariffsDiscriminated {
  specific: TariffInformationProps;
  midweek: TariffInformationProps;
  weekend: TariffInformationProps;
}

export interface TariffInformationProps {
  values: TariffInformationValuesProps;
  name: string;
  pipeNum: number;
}

export interface TariffInformationValuesProps {
  UHsValues: typeof initValuesUHS;
  foodValue: GroupValuesProps;
  earlyEntryValues: {
    tenHour: GroupValuesProps;
    twentyHour: GroupValuesProps;
  };
}

export type keyGroup = "adt" | "adtex" | "chd0" | "chd4" | "chd8";
export type keyUH = "PAD" | "PADV" | "LUX" | "LUXC" | "LUXH";
