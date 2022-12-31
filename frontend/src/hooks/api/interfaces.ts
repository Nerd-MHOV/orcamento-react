export interface AllTariffsProps {
  name: string;
  product_pipe: string;
  active: boolean;
  order_id: number;
  food_id: number;
  food?: FoodProps;
  TariffCheckInValues?: CheckInValuesProps[];
  TariffValues?: TariffValuesProps[];
  tariffs_to_midweek?: CommonTariffProps[];
  tariffs_to_weekend?: CommonTariffProps[];
  SpecificDates?: SpecificTariffProps[];
}

export interface FoodProps {
  id: number;
  adt: number;
  adtex: number;
  chd0: number;
  chd4: number;
  chd8: number;
}
export interface CheckInValuesProps {
  id: number;
  tariffs_id: string;
  type: string;
  adt: number;
  adtex: number;
  chd0: number;
  chd4: number;
  chd8: number;
}

export interface TariffValuesProps {
  id: number;
  tariffs_id: string;
  category_id: string;
  adt: number;
  adtex: number;
  chd0: number;
  chd4: number;
  chd8: number;
}

export interface CommonTariffProps {
  date: string;
  tariff_to_midweek_id: string;
  tariff_to_weekend_id: string;
}

export interface SpecificTariffProps {
  date: string;
  tariffs_id: string;
}
