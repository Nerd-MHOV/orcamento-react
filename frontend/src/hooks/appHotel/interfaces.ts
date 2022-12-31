export interface AppHotelProps {
  reservas?: {
    unidade: string;
    [key: string]: any;
  };
  qntdReservas: number;
  processadas: number;
  confirmadas: number;
  bloqueios: number;
  qntdAdt: number;
  qntdChd: number;
}
