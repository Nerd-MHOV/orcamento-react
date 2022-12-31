import { AppHotelProps } from "../../hooks/appHotel/interfaces";

interface InfoAppProps {
  stateApp: AppHotelProps | null;
}
export const InfoApp = ({ stateApp }: InfoAppProps) => (
  <div className="infoApp">
    {stateApp !== null && !!stateApp.qntdReservas && (
      <div className="infoAppBox">
        <div>
          <p>Confirmadas: {stateApp.confirmadas}</p>
          <p>Bloqueios: {stateApp.bloqueios}</p>
        </div>
        <div>
          <p>Processadas: {stateApp.processadas}</p>
          <p>Total Reservas: {stateApp.qntdReservas}</p>
        </div>
      </div>
    )}
  </div>
);
