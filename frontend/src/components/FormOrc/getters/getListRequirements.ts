import { useApi } from "../../../hooks/api/api";

export async function getListRequirements() {
  const api = useApi();
  const response = await api.getRequirements();
  let list: string[] = [];
  response.map((res: any) => {
    list.push(res.name);
  });
  return list;
  //   setListRequirements(list);
}
