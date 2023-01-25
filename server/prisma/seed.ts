import { prisma, PrismaClient } from "@prisma/client";
import { CategorySeed } from "./seeds/categories";
import { CheckSeed } from "./seeds/checkinValues";
import { CommonDateSeed } from "./seeds/commonDates";
import { DUtariffSeed } from "./seeds/duTariff";
import { DUtariffValuesSeed } from "./seeds/duTariffValues";
import { FoodSeed } from "./seeds/food";
import { HUsSeed } from "./seeds/housingUnits";
import { PetSeed } from "./seeds/pets";
import { RequirementSeed } from "./seeds/requirements";
import { SpecificDateSeed } from "./seeds/specificDates";
import { TariffValueSeed } from "./seeds/tariffValues";
import { TariffSeed } from "./seeds/tarrifs";
import { UserSeed } from "./seeds/users";

const prismaClient = new PrismaClient();

async function main() {
  for (let user of UserSeed) {
    const createdUsers = await prismaClient.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
    console.log("created user:" + user.name);
  }

  for (let food of FoodSeed) {
    const createdFood = await prismaClient.foods.upsert({
      where: {
        id: food.id,
      },
      update: food,
      create: food,
    });

    console.log("created price food", food);
  }

  for (let category of CategorySeed) {
    const createdCategory = await prismaClient.categories.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
    console.log("created category " + category.id);
  }

  for (let tariff of TariffSeed) {
    const createdTariff = await prismaClient.tariff.upsert({
      where: { name: tariff.name },
      update: tariff,
      create: tariff,
    });
  }

  for (let checkIn of CheckSeed) {
    const createdCheckIn = await prismaClient.tariffCheckInValues.upsert({
      where: { id: checkIn.id },
      update: checkIn,
      create: checkIn,
    });
    console.log("created tariff for" + checkIn.type + checkIn.tariffs_id);
  }

  for (let tariffValue of TariffValueSeed) {
    const { id: tariffId, ...restTariff } = tariffValue;
    const createdValue = await prismaClient.tariffValues.upsert({
      where: { id: tariffId },
      update: restTariff,
      create: restTariff,
    });
  }

  for (let commonDate of CommonDateSeed) {
    const createdDate = await prismaClient.commonDates.upsert({
      where: { date: commonDate.date },
      update: commonDate,
      create: commonDate,
    });
    console.log("created common Tariff ", commonDate.date);
  }

  for (let specificDate of SpecificDateSeed) {
    const createdDate = await prismaClient.specificDates.upsert({
      where: { date: specificDate.date },
      update: specificDate,
      create: specificDate,
    });
  }

  for (let pet of PetSeed) {
    const createdPet = await prismaClient.pet.upsert({
      where: { carrying: pet.carrying },
      update: pet,
      create: pet,
    });
    console.log("created price for pet " + pet.carrying);
  }

  for (let requirement of RequirementSeed) {
    const createdRequirement = await prismaClient.requirement.upsert({
      where: { name: requirement.name },
      update: requirement,
      create: requirement,
    });
  }

  for (let unit of HUsSeed) {
    const createdHU = await prismaClient.hUs.upsert({
      where: { id: unit.id },
      update: unit,
      create: unit,
    });
    console.log("Housing unit created: " + unit.id);
  }

  for (let dUTariff of DUtariffSeed) {
    const createdTariff = await prismaClient.dUTariff.upsert({
      where: { name: dUTariff.name },
      update: dUTariff,
      create: dUTariff,
    });
    console.log("tariff Day Use" + dUTariff.name + " created");
  }

  for (let duTariffValue of DUtariffValuesSeed) {
    const createdValue = await prismaClient.dUTariffValues.upsert({
      where: { id: duTariffValue.id },
      update: duTariffValue,
      create: duTariffValue,
    });

    console.log("value for " + createdValue.tariff_id + " created");
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
