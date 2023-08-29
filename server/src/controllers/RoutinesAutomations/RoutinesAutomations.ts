import {Request, Response} from "express";
import {assistOpportunity} from "../../helpers/assistOpportunity";
import {rdGetDeals} from "../../services/rdstation/getDeals";

export class RoutinesAutomations {
    async getOpportunities (request: Request, response: Response) {
        const opportunities = await rdGetDeals({});
        return response.json(opportunities);
    }

    async assistOpportunities (request: Request, response: Response) {
        const {has_change} = await assistOpportunity()
        return response.json(has_change ? "I found changes" : "All is ok")
    }
}