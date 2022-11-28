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
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
