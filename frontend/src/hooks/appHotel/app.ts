import axios from "axios";
import { AppHotelProps } from "./interfaces";

const api = axios.create({
  baseURL: "https://servicesapp.brotasecoresort.com.br:8009",
});

export const useAppApi = () => ({
  getHousingUnitsUsing: async (
    check_in: String,
    check_out: String
  ): Promise<AppHotelProps> => {
    const response = await api.get(
      `/testes/get_uhs.php?check_in=${check_in}&check_out=${check_out}`
    );
    return response.data;
  },
});
