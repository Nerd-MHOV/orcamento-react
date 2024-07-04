import { Content } from "pdfmake/interfaces"

export const layoutPageCollaborators = (name: string, numberPhone: string, email: string, now: string, validate: string): Content => {
   return  [
        {
            image: `top`,
            width: 600,
            // pageBreak: 'before',
          },
          {
            image: `bottom`,
            width: 600,
            absolutePosition: {x: 0, y: 740},
            // pageBreak: 'before',
          },
          {
            layout: "noBorders",
            alignment: 'left',
            absolutePosition: {x: 130, y: 760},
            table: {
              body: [
                  [{ text: `${name}`, style: "vendedora_left_title", bold: true }],
                  [{ text: `Consultor(a) de eventos`, style: "vendedora_left", bold: true }],
                  [{ text: `telefone: ${numberPhone}`,style: "vendedora_left" }],
                  [{ text: `e-mail: ${email}`, style: "vendedora_left" }],
              ]
            }
          },
          {
            layout: "noBorders",
            alignment: 'left',
            absolutePosition: {x: 350, y: 745},
            table: {
              body: [
                  [{ text: `DATA DA COTAÇÃO:          ${now}`, style: "vendedora_right", bold: true }],
                  [{ text: `VALIDADE DA COTAÇÃO:  ${validate}`, style: "vendedora_right", bold: true }],
                  [{ text: `Considerar o valor adicional de 5% de taxa de serviço sob a tabela acima.`, style: "vendedora_right_desc" }],
                  [{ text: `Esse orçamento não simboliza pré reserva.`, style: "vendedora_right_desc" }],
                  [{ text: `Valores sujeitos a alteração sem aviso prévio.`, style: "vendedora_right_desc" }],
              ]
            }
          },
    ]
}