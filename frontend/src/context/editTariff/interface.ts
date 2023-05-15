import {
  AllTariffsProps,
  CheckInValuesProps,
  CommonTariffProps,
  FoodProps,
  GroupValuesProps,
  SpecificTariffProps,
  TariffValuesProps,
} from "../../hooks/api/interfaces";

export interface EditTariffContextProps {
  tariff: AllTariffsProps;
  getTariffType: () => "specific" | "mds" | "fds";
  getDates: () => string[];
  setDates: (dates: string[]) => void;
  next(active: boolean): void;
  activeStep(step: number): void;
  getValue: (category: keyUH) => TariffValuesProps | undefined;
  getFoodValue: () => FoodProps | undefined;
  setUHValue: (category: keyUH, group: keyGroup, value: number) => void;
  setFoodValue: (group: keyGroup, value: number) => void;
  setAllFoodValue: (values: GroupValuesProps) => void;
  setEarlyEntryValue: (
    time: "10h" | "12h",
    group: keyGroup,
    value: number
  ) => void;
  getEarlyValue: (time: "10h" | "12h") => CheckInValuesProps | undefined;
  getFoodID: () => number | undefined;
}

export interface EditTariffContextProviderProps {
  children: JSX.Element;
  tariff: AllTariffsProps | undefined;
  next(active: boolean): void;
  activeStep(step: number): void;
}

export type keyGroup = "adt" | "adtex" | "chd0" | "chd4" | "chd8";
export type keyUH = "PAD" | "PADV" | "LUX" | "LUXC" | "LUXH";
