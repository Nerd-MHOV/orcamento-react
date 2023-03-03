import { FormNewCollaborator } from "../../components/FormNewCollaborator";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./style.scss";

export const NewUsersPage = () => {
  return (
    <div className="new-user">
      <Sidebar />
      <div className="new-user-bx">
        <Navbar />

        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Cadastrar Colaborador</div>
            </div>
            <div className="form">
              <FormNewCollaborator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
