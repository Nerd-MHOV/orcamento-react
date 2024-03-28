import { ReactNode, createContext, useContext } from "react";
import GenerateTariffContextProps from "./interfaces/generateTariffContextProps";
import GenerateTariffCorporateContextProps from "./interfaces/generateTariffCorporateContextProps";
import AccommodadtionProvider from "./accommodationProvider";
import CorporateProvider from "./corporateProvider";

export const GenerateTariffContext = createContext<GenerateTariffContextProps | null>(null);
export const GenerateTariffCorporateContext = createContext<GenerateTariffCorporateContextProps | null>(null);
export const GenerateTariffProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => <AccommodadtionProvider>{children}</AccommodadtionProvider>;
export const GenerateTariffCorporateProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => <CorporateProvider>{children}</CorporateProvider>;


export const useGenerateTariff = () => {
  const context = useContext(GenerateTariffContext)
  if (!context) {
    throw new Error(
      "useGenerateTariff must be used within a GenerateTariffProvider"
    )
  }
  return context  
}

export const useGenerateTariffCorporate = () => {
  const context = useContext(GenerateTariffCorporateContext)
  if (!context) {
    throw new Error(
      "useGenerateTariffCorporate must be used within a GenerateTariffCorporateProvider"
    )
  }
  return context  
}
