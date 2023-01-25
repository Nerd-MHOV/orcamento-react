import axios from "axios";
import serialize from "form-serialize";
import { RequirementSubmitProps } from "../../components/FormOrc/Interfaces";
import { selectionRange } from "../../pages/Home/functions/handleForm";
import {
  AllTariffsProps,
  FindHolidaysProps,
  FindMonthWithTariffProps,
} from "./interfaces";

const storageData = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${storageData}`,
  },
});

export const useApi = () => ({
  validateToken: async () => {
    const response = await api.get("/validate");
    return response.data;
  },

  login: async (username: string, password: string) => {
    const response = await api.post("/login", { username, password });
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get("/user");
    return response.data;
  },

  getBudget: async (
    arrForm: any,
    arrChild: string[],
    arrPet: string[],
    arrRequirement: RequirementSubmitProps[],
    rangeDate: selectionRange
  ) => {
    const response = await api.post("/budget", {
      arrForm,
      arrChild,
      arrPet,
      arrRequirement,
      rangeDate,
    });
    return response.data;
  },

  getBudgetDU: async (
    arrForm: any,
    arrChild: string[],
    arrPet: string[],
    arrRequirement: RequirementSubmitProps[],
    rangeDate: selectionRange
  ) => {
    const response = await api.post("/budget-du", {
      arrForm,
      arrChild,
      arrPet,
      arrRequirement,
      rangeDate,
    });
    return response.data;
  },

  getRequirements: async () => {
    const response = await api.get("/requirement");
    return response.data;
  },

  getTariffPipe: async (date_in: Date, date_out: Date) => {
    const response = await api.post("/tariff_pipe", {
      date_in,
      date_out,
    });

    return response.data;
  },

  getAllTariffs: async (): Promise<AllTariffsProps[]> => {
    const response = await api.get("/tariff");
    return response.data;
  },

  findUniqueUser: async (id: number) => {
    const response = await api.post("/unique-user", { id });
    return response.data;
  },

  findAllHousingUnits: async () => {
    const response = await api.get("/housing-units");
    return response.data;
  },

  findHolidays: async (): Promise<FindHolidaysProps[]> => {
    const response = await api.get("/specific-date");
    return response.data;
  },

  findMonthWithTariff: async (): Promise<FindMonthWithTariffProps[]> => {
    const response = await api.get("/common-date");
    return response.data;
  },

  createCommonTariff: async (
    tariffs: AllTariffsProps[]
  ): Promise<"success" | "error"> => {
    const response = await api.post("/common-date", { tariffs: tariffs });
    return response.data.msg;
  },

  createSpecificTariff: async (
    tariffs: AllTariffsProps[]
  ): Promise<"success" | "error"> => {
    const response = await api.post("/specific-date", { tariffs: tariffs });
    return response.data.msg;
  },

  deleteTariff: async (tariffs: string[]): Promise<"success" | "error"> => {
    const response = await api.post("/tariff/delete", { tariffs: tariffs });
    return response.data;
  },

  changeOrderTariff: async (order_id: number, side: string) => {
    const response = await api.post("/tariff/order", { order_id, side });
    return response.data;
  },

  toggleActiveTariff: async (name: string, active: boolean) => {
    const response = await api.post("/tariff/active", {
      name,
      active,
    });
    return response.data;
  },
});
