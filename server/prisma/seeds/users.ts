import bcrypt from "bcrypt";

export const UserSeed = [
  {
    email: "matheus.henrique4245@gmail.com",
    phone: "14 991578451",
    name: "Matheus Henrique",
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
    token_rd: "649dcc1c48f91a001f09be68",
    user_rd: "649dcc1c48f91a001f09be65",
    level: 3
  },
];
