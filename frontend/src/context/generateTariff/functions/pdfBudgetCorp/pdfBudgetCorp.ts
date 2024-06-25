import { TDocumentDefinitions } from "pdfmake/interfaces";

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { addDays, format } from "date-fns";
(<any>pdfMake).vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

const slideImagesPath = 'http://localhost:5173/budgetCorpImages/';

async function pdfBudgetCorp(
  name: string,
  email: string,
  numberPhone: string,
) {
  const now = format(new Date(), "dd/MM/yyyy HH:mm");
  const validate = format(addDays(new Date(), 3), "dd/MM/yyyy");
  const slidesContent = []
  for (let index = 1; index <= 10; index++) {
    slidesContent.push({
      image: `slide${index}`,
      width: 600,
      // margin: [0, 0, 0, 0],
    })
  }

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      //   font: "Helvetica",
      alignment: "center",
    },
    // pageSize: {
    //   width: 595.28,
    //   height: "auto",
    // },
    pageSize: 'A4',
    info: {
      title: "PDF Orçamento cliente",
      author: "Matheus Henrique"
    },
    pageMargins: [0, 0, 0, 0],
    images: {
      slide1: { url: `${slideImagesPath}Slide1.JPG` },
      slide2: { url: `${slideImagesPath}Slide2.JPG` },
      slide3: { url: `${slideImagesPath}Slide3.JPG` },
      slide4: { url: `${slideImagesPath}Slide4.JPG` },
      slide5: { url: `${slideImagesPath}Slide5.JPG` },
      slide6: { url: `${slideImagesPath}Slide6.JPG` },
      slide7: { url: `${slideImagesPath}Slide7.JPG` },
      slide8: { url: `${slideImagesPath}Slide8.JPG` },
      slide9: { url: `${slideImagesPath}Slide9.JPG` },
      slide10: { url: `${slideImagesPath}Slide10.JPG` },
      slide14: { url: `${slideImagesPath}Slide14.JPG` },
      top: { url: `${slideImagesPath}top.JPG` },
      bottom: { url: `${slideImagesPath}bottom.JPG` },
    },
    content: [
      // ...slidesContent,
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
      {
        text: ``,
        style: "vendedora",
        bold: true,
      },
      
      {
        image: `slide14`,
        width: 600,
        // pageBreak: 'before',
      }
    ],
    styles: {
      vendedora_left: {
        fontSize: 9,
        color: "#ffffff",
        marginTop: 2.4,
      },
      vendedora_left_title: {
        fontSize: 15,
        color: "#ffffff",
        marginTop: 2.4,
      },
      vendedora_right: {
        fontSize: 9,
        color: "#646464",
        marginBottom: 2.4,
      },
      vendedora_right_desc: {
        fontSize: 8,
        color: "#646464",
      }
    },
  };

  const pdf = pdfMake.createPdf(docDefinitions);
  //pdf.open();

  pdf.getBlob((blob) => {
    // Converte o blob em uma URL de dados
    const url = URL.createObjectURL(blob);
    // Define o tamanho e posição da janela pop-up
    const width = 1000; // Largura da janela em pixels
    const height = 650; // Altura da janela em pixels
    const left = (window.innerWidth - width) / 2; // Centraliza a janela horizontalmente
    const top = (window.innerHeight - height) / 2; // Centraliza a janela verticalmente
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    // Abre a janela pop-up com o PDF
    window.open(url, '_blank', features);
  });
}

export default pdfBudgetCorp;
