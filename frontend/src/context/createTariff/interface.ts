import {
  CreateTariffProps,
  keyGroup,
  keyUH,
  TariffInformationValuesProps,
} from "../../components/StepsCreateTariff/interfaces";
import { createData } from "../../components/TableCollapseTariffs/helpers";
import { GroupValuesProps, TariffTypesProps } from "../../hooks/api/interfaces";

export interface ContextTariffProps {
  arrTariffs: CreateTariffProps;
  setTypeTariff(type: TariffTypesProps): void;
  typeTariff: TariffTypesProps;
  setDates(dates: string[]): void;
  setFoodValues(
    keyType: "specific" | "midweek" | "weekend",
    keyGroup: keyGroup,
    value: number
  ): void;
  setAllFoodValues(
    keyType: "specific" | "midweek" | "weekend",
    values: GroupValuesProps
  ): void;
  setEarlyEntryValues(
    keyType: "specific" | "midweek" | "weekend",
    keyTypeEarly: "tenHour" | "twentyHour",
    keyGroup: keyGroup,
    value: number
  ): void;
  setUHValues(
    keyType: "specific" | "midweek" | "weekend",
    keyGroup: keyGroup,
    keyUH: keyUH,
    value: number
  ): void;
  getValues(
    keyType: "specific" | "midweek" | "weekend"
  ): TariffInformationValuesProps;
  next(active: boolean): void;
  setRelationTariffs: React.Dispatch<
    React.SetStateAction<ReturnType<typeof createData>[]>
  >;
  relationTariffs: ReturnType<typeof createData>[];
  foodPad: boolean;
  setFoodPad(boolean: boolean): void;
  activeStep(step: number): void;
  specificName: string;
  setSpecificName(name: string): void;
  loading: boolean;
  createTariff(): void;
  stateResponse: "success" | "error";
}
