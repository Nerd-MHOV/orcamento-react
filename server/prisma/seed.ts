import { prismaClient } from "../src/database/prismaClient";

async function main() {
  const matheus = await prismaClient.user.upsert({
    where: { email: "matheus.henrique4245@gmail.com" },
    update: {},
    create: {
      email: "matheus.henrique4245@gmail.com",
      name: "Matheus Henrique",
      password: "admin",
      username: "admin",
      phone: "14 991578451",
    },
  });

  const food = await prismaClient.foods.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      adt: 87,
      adtex: 87,
      chd0: 0,
      chd4: 43,
      chd8: 52,
    },
  });

  const categoriesPAD = await prismaClient.categories.upsert({
    where: { id: 1 },
    update: {},
    create: {
      initials: "PAD",
      name: "padrão",
    },
  });

  const categoriesPADV = await prismaClient.categories.upsert({
    where: { id: 2 },
    update: {},
    create: {
      initials: "PADV",
      name: "padrão varanda",
    },
  });

  const categoriesLUX = await prismaClient.categories.upsert({
    where: { id: 3 },
    update: {},
    create: {
      initials: "LUX",
      name: "luxo",
    },
  });

  const categoriesLUXC = await prismaClient.categories.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 1,
      initials: "LUXC",
      name: "luxo conjugado",
    },
  });

  const categoriesLUXH = await prismaClient.categories.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 1,
      initials: "LUXH",
      name: "luxo com hidro",
    },
  });
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
