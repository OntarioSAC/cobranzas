// pdfGenerator.jsx
import { jsPDF } from 'jspdf';
import logo from '../assests/img/logo.png';

export const generatePDF = (formData, showSpouseFields) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 15; // Margen izquierdo ajustado

    // Dimensiones del logo
    const logoOriginalWidth = 110;
    const logoOriginalHeight = 100;
    const logoMaxWidth = 40;
    const logoScale = logoMaxWidth / logoOriginalWidth;
    const logoWidth = logoOriginalWidth * logoScale;
    const logoHeight = logoOriginalHeight * logoScale;

    // Coloca el logo más arriba en la esquina superior izquierda
    doc.addImage(logo, 'PNG', leftMargin, 2, logoWidth, logoHeight); // Ajustamos la posición vertical del logo a 2

    // Título y cabecera con código en el extremo derecho
    doc.setFontSize(18);
    // doc.text('RECIBO DE SEPARACIÓN', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Código:', pageWidth - 30, 20); // Añade el texto "Código:" en el extremo derecho, dejando espacio para el valor

    // Información principal organizada en un formato limpio
    doc.setFontSize(12);
    doc.text(`Fecha de separación: ${formData.separationDate}`, leftMargin, 50);
    doc.text(`Moneda: ${formData.currency}`, pageWidth - 70, 50); // Moneda alineada a la derecha

    // Información del cliente
    doc.text(`Nombre del Cliente: ${formData.clientName}`, leftMargin, 60);
    doc.text(`DNI: ${formData.dniClient}`, pageWidth - 70, 60); // DNI alineado a la derecha
    doc.text(`Dirección: ${formData.address}`, leftMargin, 70);
    doc.text(`E-mail: ${formData.email}`, pageWidth - 70, 70); // Email alineado a la derecha
    doc.text(`Tel Fijo: ${formData.telFijo}`, leftMargin, 80);
    doc.text(`Celular: ${formData.celular}`, pageWidth - 70, 80); // Celular alineado a la derecha

    // Información de proyectos y lotes
    doc.text(`Proyecto: ${formData.selectedProject}`, leftMargin, 90);
    doc.text(`Lote: ${formData.selectedLot}`, pageWidth - 70, 90); // Lote alineado a la derecha

    // Importe de separación basado en la moneda seleccionada
    const importeLabel = formData.currency === 'Soles' ? `Importe de separación: S/ ${formData.soles}` : `Importe de separación: $ ${formData.dolares}`;
    doc.text(importeLabel, leftMargin, 100);

    // Mostrar información del cónyuge solo si se seleccionó la opción
    if (showSpouseFields) {
        doc.text('Datos del Cónyuge:', leftMargin, 110);
        doc.text(`Nombre del Cónyuge: ${formData.spouseName}`, leftMargin, 120);
        doc.text(`DNI del Cónyuge: ${formData.dniSpouse}`, pageWidth - 70, 120); // DNI del cónyuge alineado a la derecha
    }

    // Declaración Jurada centrada y con fuente más pequeña
    doc.setFontSize(10);
    const declarationText = `
Declaración Jurada: El cliente por el presente declara que ha sido informado verbalmente por la empresa sobre el lote a adquirir: Partida Registral del proyecto, situación del saneamiento (Licencias, Habilitación Urbana) área del inmueble, áreas comunes, acabados y servicios básicos así como los datos de la empresa (RUC, partida, representante).
1. El monto de separación de un lote por la suma mínima de $100.00 (cien con 00/100 dólares americanos).
2. Este documento es único y exclusivamente válido para la separación de un lote y tiene la condición de arras.
3. Este documento tiene la condición de arras de acuerdo al Art 1478 del Código Civil por lo cual el cliente tiene un plazo de 7 días naturales para realizar el depósito correspondiente a la inicial del lote en venta y suscribir el respectivo contrato de compraventa de bien futuro.
4. El Cliente y la Empresa pactan convencionalmente que en caso la suscripción del contrato no se realice por causas injustificadas de la empresa, deberá devolver el monto cancelado por el cliente por concepto de separación.
5. Todos los trámites para la suscripción del contrato de Compraventa, así como información documental referente a anexos, planos y saneamiento del lote a adquirir, deberán efectuarse únicamente en las oficinas de la empresa.
6. Para la validez del documento, deberá estar suscrito (firmado) por el cliente y el asesor comercial.
7. Se deja constancia que el lote a adquirir es un bien futuro de acuerdo a lo estipulado en el Art 1534 del Código Civil.
    `;
    const splitDeclarationText = doc.splitTextToSize(declarationText, pageWidth - 30);
    doc.text(splitDeclarationText, leftMargin, 140);

    // Firmas y líneas para firmas
    const lineYPosition = 260;
    doc.line(leftMargin, lineYPosition - 5, leftMargin + 40, lineYPosition - 5); // Línea para firma de La Empresa
    doc.line(pageWidth - 55, lineYPosition - 5, pageWidth - 15, lineYPosition - 5); // Línea para firma del Cliente
    doc.text('La Empresa', leftMargin + 10, lineYPosition);
    doc.text('El Cliente', pageWidth - 50, lineYPosition);

    // Genera y descarga el PDF
    doc.save('ReciboDeSeparacion.pdf');
};
