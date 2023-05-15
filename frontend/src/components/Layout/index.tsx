import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./style.scss";

export const LayoutBudget = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="page">
      <Sidebar />
      <div className="page-bx">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
