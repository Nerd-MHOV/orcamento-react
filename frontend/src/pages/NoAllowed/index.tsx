import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./style.scss";

export const NoAllowed = () => {
  return (
    <div className="no-allowed">
      <Sidebar />
      <div className="no-allowed-bx">
        <Navbar />

        <div className="p20">
          <div className="containerBx">
            <div
              className="titleContainerBx"
              style={{
                textAlign: "center",
                margin: "50px 0",
                color: "#a15656",
              }}
            >
              Você não tem permissão para acessar essa página!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
