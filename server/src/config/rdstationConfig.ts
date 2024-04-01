import dotenv from "dotenv";

dotenv.config();
export const rdstationConfig = {
    token: process.env.RD_TOKEN,
    apiUrl: process.env.RD_API_URL,
    fields: {
        check_in: "64ff4e1f2ab269001b8bb10f",
        check_out: "64ff4e32966cc10022693bc2",
        budget_status: "64b94d33862444000e56696e",
        cpf: "651721fb187bc40018c3f345",
        adt: '64b7e57ec69b74000c0dfffc',
        chd: '64b7ed74bfabcc002b264818',
        chd_amount: '64b7e553c69b74001c0e0048',
        pet: '64b7edb9f217510019a64bc5',
        pet_amount: '64b7eda36ea9c8000c03efa8',
        points_validate: '65e21781b2c1430014fb3ea2',
        points: '65e21753dc5dfc000dc0aa5e',
    }
}