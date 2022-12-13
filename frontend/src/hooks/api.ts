import axios from "axios";
import serialize from "form-serialize";
import { RequirementSubmitProps } from "../components/FormOrc";
import { selectionRange } from "../pages/Home/handleForm";

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

  findUniqueUser: async (id: number) => {
    const response = await api.post("/unique-user", { id });
    return response.data;
  },

  getRequirements: async () => {
    const response = await api.get("/requirement");
    return response.data;
  },
});
