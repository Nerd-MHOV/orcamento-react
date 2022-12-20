import bcrypt from "bcrypt";

export const UserSeed = [
  {
    id: 1,
    email: "matheus.henrique4245@gmail.com",
    phone: "14 991578451",
    name: "Matheus Henrique",
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
    token_pipe: "0b89d278f9d3debfe30b08cb441f295f84832371",
    user_pipe: "3183119",
  },
];
