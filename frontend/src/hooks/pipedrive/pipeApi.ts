import axios from "axios";

const pipeApi = axios.create({
  baseURL: "https://grupoperaltas.pipedrive.com/api/v1",
});

export const usePipe = () => ({
  addFile: async (token: string, deal_id: number, file: any, name: string) => {
    let formData = new FormData();
    formData.append("deal_id", `${deal_id}`);
    formData.append("file", file, name);
    const response = await pipeApi.post("/files?api_token=" + token, formData);
    return response.data;
  },
  addProduct: async (
    token: string,
    deal_id: number,
    product_id: number,
    item_price: number
  ) => {
    const response = await pipeApi.post(
      `/deals/${deal_id}/products?api_token=${token}`,
      {
        product_id,
        item_price,
        quantity: 1,
      }
    );
    return response.data;
  },
  changePipeline: async (token: string, deal_id: number, user_id: number) => {
    const response = await pipeApi.put(`/deals/${deal_id}?api_token=${token}`, {
      stage_id: 242,
      user_id,
    });

    return response.data;
  },
});
