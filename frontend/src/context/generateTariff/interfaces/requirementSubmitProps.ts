
export interface RequirementSubmitValuesProps {
    adult: number;
    child: string[];
    amount: number;
}

interface RequirementSubmitProps {
    requirement: string;
    type: string;
    values: RequirementSubmitValuesProps;
}


export default RequirementSubmitProps