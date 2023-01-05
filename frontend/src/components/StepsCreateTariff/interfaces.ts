import { GroupValuesProps } from "../../hooks/api/interfaces";

export interface CreateTariffProps {
  dates: string[];
  tariffs: TariffInformationProps[];
  type: "specific" | "common" | undefined;
}

export interface TariffInformationProps {
  values: TariffInformationValuesProps;
  name: string;
  pipeNum: number;
}

export interface TariffInformationValuesProps {
  UHsValues: GroupValuesProps;
  foodValue: GroupValuesProps;
  earlyEntryValues: EarlyEntryValueProps[];
}

export interface EarlyEntryValueProps {
  values: GroupValuesProps;
  type: "10h" | "12h";
}
