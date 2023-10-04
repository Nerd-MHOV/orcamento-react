import dotenv from "dotenv";

dotenv.config();
export const rdstationConfig = {
    token: process.env.RD_TOKEN,
    apiUrl: process.env.RD_API_URL,
    fields: {
        check_in: "64ff4e1f2ab269001b8bb10f",
        check_out: "64ff4e32966cc10022693bc2",
        budget_status: "64b94d33862444000e56696e",
    }
}