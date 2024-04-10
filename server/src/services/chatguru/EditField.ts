import axios from "axios";
import config from "../../config/chatGuruConfig"
import {addPrefixToObjectKeys} from "./AddPrefixToObj";
import { resolve } from "path";

export async function EditField(
    number: string,
    fields: {
        [key: string]: any,
    },
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    // &field__email=email;
    const objField = addPrefixToObjectKeys(fields, "field__")
    return new Promise((resolve, rejects) => {
         axios.post(
            base_url, {}, {
                params: {
                    action: "chat_update_custom_fields",
                    key,
                    account_id,
                    phone_id,
                    chat_number: number,
                    ...objField,
                }
            }).then((response) => {
                resolve(response.data)
            }).catch(error => {
                rejects(error)
            })
    });
}
