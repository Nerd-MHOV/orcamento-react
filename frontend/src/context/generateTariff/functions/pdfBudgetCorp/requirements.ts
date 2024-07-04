import { CorporateBodyResponseBudget } from "../../../../hooks/api/interfaces";
import { applyBoder } from "./applyBorder";
export const doBodyRequirements = (budget: CorporateBodyResponseBudget) => {
  const requirements = budget.rowsValues.rows.filter( row => row.type === "requirement");
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
      "TOTAL REQUERIMENTOS",
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