import { prisma, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
async function main() {
  const adminUser = await prismaClient.user.upsert({
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

  console.log("Created User", adminUser);

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

  console.log("created price food", food);

  const categoriesPAD = await prismaClient.categories.upsert({
    where: { id: 1 },
    update: {},
    create: {
      initials: "PAD",
      name: "padrão",
    },
  });

  console.log("created cat. Pad", categoriesPAD);

  const categoriesPADV = await prismaClient.categories.upsert({
    where: { id: 2 },
    update: {},
    create: {
      initials: "PADV",
      name: "padrão varanda",
    },
  });
  console.log("created PADV", categoriesPADV);

  const categoriesLUX = await prismaClient.categories.upsert({
    where: { id: 3 },
    update: {},
    create: {
      initials: "LUX",
      name: "luxo",
    },
  });
  console.log("created LUX", categoriesLUX);

  const categoriesLUXC = await prismaClient.categories.upsert({
    where: { id: 4 },
    update: {},
    create: {
      initials: "LUXC",
      name: "luxo conjugado",
    },
  });
  console.log("created LUXC", categoriesLUXC);

  const categoriesLUXH = await prismaClient.categories.upsert({
    where: { id: 5 },
    update: {},
    create: {
      initials: "LUXH",
      name: "luxo com hidro",
    },
  });
  console.log("created LUXH", categoriesLUXH);

  const commonDatesAGOaSET = await prismaClient.commonDates.upsert({
    where: { id: 1 },
    update: {},
    create: {
      date: "2023-08",
      tariff_to_weekend: {
        connectOrCreate: {
          where: { id: 1 },
          create: {
            name: "Agosto a Setembro 2023 - FDS",
            product_pipe: "203",
            active: true,
            food_id: 1,
            TariffValues: {
              createMany: {
                data: [
                  {
                    category_id: 1,
                    adt: 479,
                    adtex: 259,
                    chd0: 0,
                    chd4: 140,
                    chd8: 165,
                  },
                  {
                    category_id: 2,
                    adt: 525,
                    adtex: 284,
                    chd0: 0,
                    chd4: 140,
                    chd8: 165,
                  },
                  {
                    category_id: 3,
                    adt: 583,
                    adtex: 409,
                    chd0: 0,
                    chd4: 140,
                    chd8: 165,
                  },
                  {
                    category_id: 4,
                    adt: 618,
                    adtex: 433,
                    chd0: 0,
                    chd4: 140,
                    chd8: 165,
                  },
                  {
                    category_id: 5,
                    adt: 618,
                    adtex: 433,
                    chd0: 0,
                    chd4: 140,
                    chd8: 165,
                  },
                ],
              },
            },
          },
        },
      },
      tariff_to_midweek: {
        connectOrCreate: {
          where: { id: 2 },
          create: {
            name: "Agosto a Setembro 2023 - MDS",
            product_pipe: "204",
            active: true,
            food_id: 1,
            TariffValues: {
              createMany: {
                data: [
                  {
                    category_id: 1,
                    adt: 340,
                    adtex: 184,
                    chd0: 0,
                    chd4: 130,
                    chd8: 144,
                  },
                  {
                    category_id: 2,
                    adt: 373,
                    adtex: 202,
                    chd0: 0,
                    chd4: 130,
                    chd8: 144,
                  },
                  {
                    category_id: 3,
                    adt: 414,
                    adtex: 290,
                    chd0: 0,
                    chd4: 130,
                    chd8: 144,
                  },
                  {
                    category_id: 4,
                    adt: 439,
                    adtex: 308,
                    chd0: 0,
                    chd4: 130,
                    chd8: 144,
                  },
                  {
                    category_id: 5,
                    adt: 439,
                    adtex: 308,
                    chd0: 0,
                    chd4: 130,
                    chd8: 144,
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
  const commonDatesSet = await prismaClient.commonDates.upsert({
    where: { id: 2 },
    update: {},
    create: {
      date: "2023-09",
      tariff_to_midweek_id: 2,
      tariff_to_weekend_id: 1,
    },
  });
  console.log("created Tariff August a September 2023", commonDatesAGOaSET);

  const small_pet_price = await prismaClient.pet.upsert({
    where: { id: 1 },
    update: {},
    create: {
      carrying: "pequeno",
      daily_price: 70,
    },
  });

  const medium_pet_price = await prismaClient.pet.upsert({
    where: { id: 2 },
    update: {},
    create: {
      carrying: "médio",
      daily_price: 90,
    },
  });

  const big_pet_price = await prismaClient.pet.upsert({
    where: { id: 3 },
    update: {},
    create: {
      carrying: "grande",
      daily_price: 120,
    },
  });

  console.log(
    "created pet prices",
    small_pet_price,
    medium_pet_price,
    big_pet_price
  );
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
