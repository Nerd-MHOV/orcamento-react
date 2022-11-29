import { prismaClient } from "../../database/prismaClient";

export async function getTariff(specificDay: string, commonDay: string) {
  const responseSpecific = await prismaClient.specificDates.findFirst({
    where: {
      date: specificDay,
    },
    include: {
      tariffs: {
        include: {
          food: true,
          TariffValues: true,
        },
      },
    },
  });

  console.log(responseSpecific);
  if (responseSpecific) {
    return {
      type: "specific",
      tariff_mw: responseSpecific.tariffs,
      tariff_we: responseSpecific.tariffs,
    };
  }

  const responseCommon = await prismaClient.commonDates.findFirst({
    where: {
      date: commonDay,
    },
    include: {
      tariff_to_midweek: {
        include: {
          food: true,
          TariffValues: true,
        },
      },
      tariff_to_weekend: {
        include: {
          food: true,
          TariffValues: true,
        },
      },
    },
  });

  if (responseCommon) {
    return {
      type: "common",
      tariff_mw: responseCommon.tariff_to_midweek,
      tariff_we: responseCommon.tariff_to_weekend,
    };
  }

  return {
    type: "Not Found Tariff",
  };
}
