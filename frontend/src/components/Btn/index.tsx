import "./style.scss";

const Btn = ({
  color,
  action,
  onClick = function () {
    return null;
  },
}: BtnProps) => {
  return (
    <button onClick={onClick} className={`btn ${color}`}>
      {action}
    </button>
  );
};

interface BtnProps {
  color:
    | "green"
    | "blue"
    | "darkBlue"
    | "whiteBlue"
    | "orange"
    | "red"
    | "dashboard"
    | "";
  action: string;
  onClick: any;
}

export default Btn;
