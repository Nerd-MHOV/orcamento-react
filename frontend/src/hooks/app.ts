import axios from "axios";
import serialize from "form-serialize";
import { RequirementSubmitProps } from "../components/FormOrc";
import { selectionRange } from "../pages/Home/functions/handleForm";

const storageData = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "https://servicesapp.brotasecoresort.com.br:8009",
});

export const useAppApi = () => ({
  getHousingUnitsUsing: async (check_in: String, check_out: String) => {
    const response = await api.get(
      `/testes/get_uhs.php?check_in=${check_in}&check_out=${check_out}`
    );
    return response.data;
  },
});
