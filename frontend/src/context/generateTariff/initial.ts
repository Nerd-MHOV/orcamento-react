import { CorporateBodySendBudget } from "./interfaces/corporateProps";
import GenerateTariffContextProps from "./interfaces/generateTariffContextProps";
import RowModalDiscount from "./interfaces/rowModalDiscount";

export const dataInitial = {
  rows: [],
  columns: [],
};

export const selectionRangeInitial = [{
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
}];

export const occupancyInitial = {
  text: "",
  max: 0,
  min: 0,
  category: "",
};

export const rowDiscountInitial: RowModalDiscount = {
  id: 0,
  name: "",
  discount: 0,
  type: "",
};

export const corporateBodySendBudgetInitial: CorporateBodySendBudget = {
  rooms: [],
  pension: 'completa',
  discount: 0,
  requirements: [],
  dateRange: null,
  idClient: null,
  unitaryDiscount: [],
}