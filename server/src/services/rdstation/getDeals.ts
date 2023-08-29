import {rdApi} from "./rdApi";
import {Opportunity, OpportunityParams} from "./rd.types";

export function rdGetDeals(params: OpportunityParams): Promise<Opportunity> {
    return new Promise<Opportunity>((resolve, reject) => {
        if(!params.limit) params.limit = 200
        rdApi.get("/deals", { params })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(" [ ERROR ] - error getting negotiations in RD Stations");
                reject(error);
            });
    });
}

