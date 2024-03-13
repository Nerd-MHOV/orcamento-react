import { ReactNode, createContext, useContext } from "react";
import GenerateTariffContextProps from "./interfaces/generateTariffContextProps";
import AccommodadtionProvider from "./accommodationProvider";
import CorporateProvider from "./corporateProvider";

export const GenerateTariffContext = createContext<GenerateTariffContextProps | null>(null);

export const GenerateTariffProvider: React.FC<{ children: ReactNode, corporate?: boolean }> = ({
  children, corporate = false
}) => corporate ?
    <CorporateProvider>{children}</CorporateProvider> :
    <AccommodadtionProvider>{children}</AccommodadtionProvider>;


export const useGenerateTariff = () => {
  const context = useContext(GenerateTariffContext)
  if (!context) {
    throw new Error(
      "useGenerateTariff must be used within a GenerateTariffProvider"
    )
  }

  return context  

}
