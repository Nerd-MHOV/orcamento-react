import {FoodSeed} from "./food";
import {CheckSeed} from "./checkinValues";
import {TariffValueSeed} from "./tariffValues";

export const TariffSeed = [{
    name: "Agosto a Setembro 2023 - MDS", product_rd: "64ba93ab386c24000100cff9", active: true,
    food: { create: FoodSeed },
    TariffCheckInValues: {
        createMany: {data: CheckSeed["Agosto a Setembro 2023 - MDS"]}
    },
    TariffValues: {
        createMany: {data: TariffValueSeed["Agosto a Setembro 2023 - MDS"]}
    }
}, {
    name: "Agosto a Setembro 2023 - FDS", product_rd: "64ba93ab386c24000100cff8", active: true,
    food: { create: FoodSeed },
    TariffCheckInValues: {
        createMany: {data: CheckSeed["Agosto a Setembro 2023 - FDS"]}
    },
    TariffValues: {
        createMany: {data: TariffValueSeed["Agosto a Setembro 2023 - FDS"]}
    }
}, {
    name: "Independência 2023", product_rd: "64ba93ab386c24000100cfff", active: true,
    food: { create: FoodSeed },
    TariffCheckInValues: {
        createMany: {data: CheckSeed["Independência 2023"]}
    },
    TariffValues: {
        createMany: {data: TariffValueSeed["Independência 2023"]}
    }
}];
