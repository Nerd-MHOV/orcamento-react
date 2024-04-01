import {rdstationConfig} from "../../config/rdstationConfig";
import {Contact, CustomField, Deal} from "./rd.types";

export type FieldsKeysRD = keyof typeof rdstationConfig.fields;
export const CustomFieldFilter = (field: FieldsKeysRD, deal: Deal) => {

    const custom_field = deal.deal_custom_fields.find(
        cf => cf.custom_field_id === rdstationConfig.fields[field]
    )

    if(!custom_field) return null;
    return custom_field

};

export const CustomFieldFilterContact = (field: FieldsKeysRD, contact: Contact) => {

    const custom_field = contact.contact_custom_fields.find(
        cf => cf.custom_field_id === rdstationConfig.fields[field]
    )

    if(!custom_field) return null;
    return custom_field

};