import { useEffect, useState } from "react";
import RequirementSubmitProps, { RequirementSubmitValuesProps } from "../interfaces/requirementSubmitProps";
import { TypeModalProps } from "../interfaces/generateTariffContextProps";
import { getListRequirements } from "../functions/getters/getListRequirements";

const useRequirement = () => {
    const [openModalRequirement, setOpenModalRequirement] = useState(false);
    const [requirementSubmit, setRequirementSubmit] = useState<
        RequirementSubmitProps[]
    >([]);
    const [requirementsModal, setRequirementsModal] = useState<string[]>([]);
    const [requirementValue, setRequirementValue] = useState<string[]>([]);
    const [typeModal, setTypeModal] = useState<TypeModalProps | "">("");
    const [listRequirements, setListRequirements] = useState<string[]>([]);


    const handleCloseModalRequirement = () => {
        setOpenModalRequirement(false);
    };

    const handleClickOpenModalRequirement = (requirement: string[]) => {
        if (requirement.length < requirementSubmit.length) {
            setRequirementSubmit((old) => {
                return old.filter((arr) => requirement.includes(arr.requirement));
            });
            return;
        }
        let lastRequirement = requirement[requirement.length - 1];
        if (lastRequirement.match(/decoração romântica/)) {
            handleSaveModalRequirement(requirement, lastRequirement, "romantic", {
                adult: 0,
                child: [],
                amount: 1,
            });
            return;
        }
        if (lastRequirement.match(/check-in às/)) setTypeModal("person");
        if (lastRequirement.match(/observação C.E.U/)) setTypeModal("ticket");
        if (
            lastRequirement.match(/Território -/) ||
            lastRequirement.match(/Eco A. -/)
        )
            setTypeModal("tourism");

        setRequirementsModal(requirement);
        setOpenModalRequirement(true);
    };

    const handleSaveModalRequirement = (
        requirements: string[],
        requirement: string,
        type: string,
        values: RequirementSubmitValuesProps
    ) => {
        setOpenModalRequirement(false);
        setRequirementSubmit((old) => {
            return [...old, { requirement, type, values }];
        });
        //setRequirementValue(requirements);
    };

    const changeRequirementValue = () => {
        let array: string[] = [];
        requirementSubmit.map((val) => {
            array.push(val.requirement);
        });

        setRequirementValue(array);
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