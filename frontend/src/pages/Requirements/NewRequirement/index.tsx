import { FormNewRequirement } from "../../../components/FormNewRequirement";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import "./style.scss";

export const NewRequirementPage = () => {
  return (
    <div className="new-user">
      <Sidebar />
      <div className="new-user-bx">
        <Navbar />

        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Cadastrar Requerimento</div>
            </div>
            <div className="form">
              <FormNewRequirement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
