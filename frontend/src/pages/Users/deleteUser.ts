import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/api/api";

export async function deleteUser(id: string) {
  // TODO: pergunta de verificação, e tratar erros e att pagina
  const api = useApi();
  await api.deleteUser(id);
  console.log(id);
}
