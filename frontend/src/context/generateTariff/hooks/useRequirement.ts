import { useEffect, useState } from "react";
import RequirementSubmitProps, { RequirementSubmitValuesProps } from "../interfaces/requirementSubmitProps";
import { TypeModalProps } from "../interfaces/generateTariffContextProps";
import { getListRequirements } from "../functions/getters/getListRequirements";
import { ApiRequirementsProps } from "../../../hooks/api/interfaces";

const useRequirement = () => {
    const [openModalRequirement, setOpenModalRequirement] = useState(false);
    const [requirementSubmit, setRequirementSubmit] = useState<RequirementSubmitProps[]>([]);
    const [requirementsModal, setRequirementsModal] = useState<ApiRequirementsProps[]>([]);
    const [requirementValue, setRequirementValue] = useState<string[]>([]);
    const [typeModal, setTypeModal] = useState<TypeModalProps | "">("");
    const [listRequirements, setListRequirements] = useState<ApiRequirementsProps[]>([]);

    const [locationValue, setLocationValue] = useState<string[]>([]);

    const handleCloseModalRequirement = () => {
        setOpenModalRequirement(false);
    };

    const handleClickOpenModalRequirement = (requirement: ApiRequirementsProps[], isLocation = false) => {
        const safe = requirementSubmit.filter(req => isLocation ? req.type !== 'location' : req.type === 'location')
        if ((requirement.length + safe.length) < requirementSubmit.length) {
            setRequirementSubmit((old) => {
                const excluded =  old.filter((arr) => requirement.some( req => req.name.includes(arr.requirement) ));
                console.log('safe:', safe)
                console.log('exluded: ', excluded)
                console.log('submit: ', requirementSubmit)
                console.log('requiremnts: ', requirement)
                return [
                    ...excluded,
                    ...safe
                ]
            });
            return;
        }
        let lastRequirement = requirement[requirement.length - 1];
        setTypeModal(lastRequirement.typeModal);
        setRequirementsModal(requirement);
        setOpenModalRequirement(true);
    };

    const handleSaveModalRequirement = (
        requirement: string,
        typeModal: 'ticket' | 'person' | 'amount' | 'participant',
        type: "accommodation" | 'corporate' | 'both' | 'location',
        values: RequirementSubmitValuesProps
    ) => {
        setOpenModalRequirement(false);
        setRequirementSubmit((old) => {
            return [...old, { requirement, type, typeModal, values }];
        });
    };

    const changeRequirementValue = () => {
        setRequirementValue(requirementSubmit.filter(req => req.type !== 'location').map(req => req.requirement));
        setLocationValue(requirementSubmit.filter(req => req.type === 'location').map(req => req.requirement))
    }

    async function getVariables() {
        setListRequirements(await getListRequirements());
    }

    useEffect(() => {
        changeRequirementValue();
    }, [requirementSubmit]);

    useEffect(() => {
      getVariables();
    }, [])
    
    return ({
        requirementSubmit,
        requirementValue,
        locationValue,
        openModalRequirement,
        handleClickOpenModalRequirement,
        handleCloseModalRequirement,
        handleSaveModalRequirement,
        typeModal,
        requirementsModal,
        listRequirements,
    })
}

export default useRequirement