export default function getPercentAdjustmentCorp(date: Date): number {
    // Verificar se existe uma tratativa especial para esse dia.
    // TODO: tratativa especial para ajuste de tarifario corporativo

    // se não tiver tratativa especial retornar padrão 
    const common = 10;

    return common / 100;
}