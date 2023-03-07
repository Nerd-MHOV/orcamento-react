import axios from "axios";
import serialize from "form-serialize";
import { selectionRange } from "../../context/generateTariff/functions/handleForm";
import {
  RequirementSubmitProps,
  RowModalDiscount,
  DataContentProps,
} from "../../context/generateTariff/interfaces";
import {
  AllTariffsProps,
  ApiRequirementsProps,
  ApiUserProps,
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

  getUsers: async (): Promise<ApiUserProps[]> => {
    const response = await api.get("/user");
    return response.data;
  },

  getaUser: async (id: string) => {
    const response = await api.post("/unique-user", { id });
    return response.data;
  },

  getBudget: async (
    arrForm: any,
    arrChild: string[],
    arrPet: string[],
    arrRequirement: RequirementSubmitProps[],
    rangeDate: selectionRange,
    unitaryDiscount: RowModalDiscount[]
  ) => {
    const response = await api.post("/budget", {
      arrForm,
      arrChild,
      arrPet,
      arrRequirement,
      rangeDate,
      unitaryDiscount,
    });
    return response.data;
  },

  getBudgetDU: async (
    arrForm: any,
    arrChild: string[],
    arrPet: string[],
    arrRequirement: RequirementSubmitProps[],
    rangeDate: selectionRange,
    unitaryDiscount: RowModalDiscount[]
  ) => {
    const response = await api.post("/budget-du", {
      arrForm,
      arrChild,
      arrPet,
      arrRequirement,
      rangeDate,
      unitaryDiscount,
    });
    return response.data;
  },

  getRequirements: async (): Promise<ApiRequirementsProps[]> => {
    const response = await api.get("/requirement");
    return response.data;
  },

  getaRequirement: async (name: string): Promise<ApiRequirementsProps> => {
    const response = await api.post("/requirement/unique", {
      name,
    });

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

  createUser: async (
    name: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    token_pipe: string,
    user_pipe: string
  ) => {
    const response = await api.post("/user", {
      name,
      email,
      phone,
      username,
      password,
      token_pipe,
      user_pipe,
    });

    return response;
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

  createRequirement: async (name: string, price: number) => {
    const response = await api.post("/requirement", {
      name,
      price,
    });
    return response.data;
  },

  deleteTariff: async (tariffs: string[]): Promise<"success" | "error"> => {
    const response = await api.post("/tariff/delete", { tariffs: tariffs });
    return response.data;
  },

  deleteUser: async (id: string): Promise<"success" | "error"> => {
    const response = await api.delete("/user/" + id);
    return response.data;
  },

  deleteRequirement: async (name: string) => {
    const response = await api.delete("/requirement/" + name);
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

  saveBudget: async (user_id: string, budgets: DataContentProps[]) => {
    const response = await api.post("/save-budget", {
      user_id,
      budgets,
    });

    return response.data;
  },

  activeRequirement: async (name: string) => {
    const response = await api.put("/requirement/active/" + name);
    return response.data;
  },

  priceRequirement: async (name: string, price: number) => {
    const response = await api.put("/requirement/price", {
      name,
      price,
    });

    return response.data;
  },
});
