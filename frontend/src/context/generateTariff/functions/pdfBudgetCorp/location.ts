import { CorporateBodyResponseBudget } from "../../../../hooks/api/interfaces";
import { applyBoder } from "./applyBorder";
export const doBodyLocations = (budget: CorporateBodyResponseBudget) => {
  const isLocation = (match: string) => {
    return budget.requirements.some( requirement => match.includes(requirement.requirement) && requirement.type === 'location' )
  }
  const requirements = budget.rowsValues.rows.filter( row => row.type === "requirement" && isLocation(row.desc) );
  const bodyRequirements = requirements.map(requirement => {
    const desc = requirement.desc.split('[');
    const nome = desc[0];
    const amount = desc[1]?.split(']')[0] || "";
    return applyBoder([
      `${nome}`,
      `${amount.replace("x", "")}`,
      "R$ " + requirement.total.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    ])
  })
  const totalRequirements = () => {
    const totalRequirementsValue = requirements.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0)
    return applyBoder([
      "TOTAL LOCAÇÃO",
      "",
      "R$ " + totalRequirementsValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    ], "total_block")
  }
  bodyRequirements.push(totalRequirements())

  return bodyRequirements;
}