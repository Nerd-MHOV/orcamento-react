import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import CollapsibleTableTariff from "../../components/TableCollapseTariffs";
import { createData } from "../../components/TableCollapseTariffs/helpers";
import TableUsers, {
  createDataUsers,
  dataUserProps,
} from "../../components/TableUsers";
import { useApi } from "../../hooks/api/api";
import { AllTariffsProps, ApiUserProps } from "../../hooks/api/interfaces";
import "./style.scss";

export const UsersPage = () => {
  const api = useApi();
  const [rows, setRows] = useState<dataUserProps[]>([]);

  const getUsers = async () => {
    const users = await api.getUsers();
    console.log(users);
    makeRows(users);
  };

  const makeRows = (users: ApiUserProps[]) => {
    let lines: dataUserProps[] = [];
    users.map((user) => {
      lines.push(
        createDataUsers(
          user.id,
          user.name,
          user.level,
          Number(user.user_pipe),
          user.active
        )
      );
    });
    setRows(lines);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users">
      <Sidebar />
      <div className="usersBx">
        <Navbar />

        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Usuários Cadastrados</div>
              <Link to="/users/create" className="link">
                <Btn action=" + " color="dashboard" onClick={() => {}} />
              </Link>
            </div>
            <div className="table">
              <TableUsers rows={rows} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
