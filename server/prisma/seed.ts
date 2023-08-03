import { PrismaClient } from "@prisma/client";
import { CategorySeed } from "./seeds/categories";
import { CommonDateSeed } from "./seeds/commonDates";
import { DUtariffSeed } from "./seeds/duTariff";
import { DUtariffValuesSeed } from "./seeds/duTariffValues";
import { HUsSeed } from "./seeds/housingUnits";
import { PetSeed } from "./seeds/pets";
import { RequirementSeed } from "./seeds/requirements";
import { SpecificDateSeed } from "./seeds/specificDates";
import { TariffSeed } from "./seeds/tarrifs";
import { UserSeed } from "./seeds/users";

const prismaClient = new PrismaClient();

async function main() {
  for (let user of UserSeed) {
    try {
      const createdUsers = await prismaClient.user.create({
        data: user,
      });
      console.log(`Usuario ${user.name}`)
    } catch (err) {console.log(`Usuario ${user.name} ja criado`)}
  }


  for (let category of CategorySeed) {
    try {
      const createdCategory = await prismaClient.categories.create({
        data: category,
      });
      console.log(`categoria ${category.name}`)
    } catch (err) {console.log(`categoria ${category.name} ja criado`)}
  }

  for (let tariff of TariffSeed) {
    try{
      const createdTariff = await prismaClient.tariff.create({
        data: tariff
      });
      console.log( `tarifa ${tariff.name}` )
    } catch ( err ) {console.log( `tarifa ${tariff.name} ja criada`, err ) }
  }

  for (let commonDate of CommonDateSeed) {
    try {
      const createdDate = await prismaClient.commonDates.create({
        data: commonDate,
      });
      console.log(`Common data ${commonDate.date}`)
    }catch (err) {console.log(`Common data ${commonDate.date} ja criada`)}
  }

  for (let specificDate of SpecificDateSeed) {
    try {
      const createdDate = await prismaClient.specificDates.create({
        data: specificDate,
      });
      console.log(`Specific date ${specificDate.date}`)
    } catch (err) {console.log(`Specific date ${specificDate.date} ja criada`)}
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
    try {
      await prismaClient.dUTariff.create({
        data: dUTariff,
      });
      console.log("tariff Day Use" + dUTariff.name + " created");
    } catch (err) {console.log("tariff Day Use" + dUTariff.name + " JA CRIADO");}
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
