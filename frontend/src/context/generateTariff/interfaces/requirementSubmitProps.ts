
export interface RequirementSubmitValuesProps {
    adult: number;
    child: string[];
    amount: number;
}

interface RequirementSubmitProps {
    requirement: string;
    typeModal: 'ticket' | 'person' | 'amount' | 'participant';
    type: "accommodation" | 'corporate' | 'both' | 'location';
    values: RequirementSubmitValuesProps;
}

export default RequirementSubmitProps