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

    // Ajustamos el tamaño de la fuente para el contenido principal (formulario)
    doc.setFontSize(10); // Reducimos el tamaño de la fuente para el formulario

    // Información principal organizada en un formato limpio
    let currentY = 50; // Coordenada inicial para la primera línea

    // Agregar el código de boleta al PDF
    doc.text(`Código de Boleta: ${formData.boletaCode}`, pageWidth - 80, currentY); // Código de boleta alineado a la derecha
    currentY += 10;

    doc.text(`Fecha de separación: ${formData.fecha_separacion}`, leftMargin, currentY);
    currentY += 6; // Ajuste de espacio entre líneas
    doc.text(`Fecha límite de la separación: ${formData.fecha_limite_separacion}`, leftMargin, currentY);

    doc.text(`Moneda: ${formData.tipo_moneda}`, pageWidth - 80, currentY); // Moneda alineada a la derecha
    currentY += 6; // Ajuste de espacio entre líneas

    // Información del cliente
    doc.text(`Nombre del Cliente: ${formData.nombres} ${formData.apellidos}`, leftMargin, currentY);
    doc.text(`${formData.tipo_documento}: ${formData.num_documento}`, pageWidth - 80, currentY); // Tipo de documento y número alineado a la derecha
    currentY += 6;
    doc.text(`Dirección: ${formData.direccion}`, leftMargin, currentY);
    doc.text(`E-mail: ${formData.correo}`, pageWidth - 80, currentY); // Email alineado a la derecha
    currentY += 6;
    doc.text(`Tel Fijo: ${formData.telefono_fijo}`, leftMargin, currentY);
    doc.text(`Celular: ${formData.celular}`, pageWidth - 80, currentY); // Celular alineado a la derecha
    currentY += 6;

    // Información de proyectos y lotes
    doc.text(`Proyecto: ${formData.selectedProject}`, leftMargin, currentY);
    doc.text(`Lote: ${formData.selectedLot}`, pageWidth - 80, currentY); // Lote alineado a la derecha
    currentY += 6;

    // Importe de separación basado en la moneda seleccionada
    doc.text(`Importe de separación: ${formData.inicial_separacion} ${formData.tipo_moneda}`, leftMargin, currentY);
    currentY += 6;

    // Mostrar información del cónyuge solo si se seleccionó la opción
    if (showSpouseFields) {
        doc.text('Datos del Cónyuge:', leftMargin, currentY);
        currentY += 6;
        doc.text(`Nombre del Cónyuge: ${formData.nombre_conyuge} ${formData.apellidos_conyuge}`, leftMargin, currentY);
        doc.text(`${formData.tipo_documento_conyuge}: ${formData.dni_conyuge}`, pageWidth - 80, currentY); // Tipo de documento y número del cónyuge alineado a la derecha
        currentY += 6;
    }

    // Declaración Jurada
    currentY += 20; // Añadimos más espacio antes de la declaración jurada
    doc.setFontSize(11);

    const declarationText = `
Declaración Jurada: El cliente por el presente declara que ha sido informado verbalmente por la empresa sobre el lote a adquirir: Partida Registral del proyecto, situación del saneamiento (Licencias, Habilitación Urbana) área del inmueble, áreas comunes, acabados y servicios básicos así como los datos de la empresa (RUC, partida, representante).
1. El monto de separación de un lote por la suma mínima de S/. 50.00 (cincuenta con 00/100 soles).
2. Este documento es único y exclusivamente válido para la separación e inicial de un lote, tiene la condición de arras.
3. Este documento tiene la condición de arras de acuerdo al Art 1478 del Código Civil por lo cual el cliente tiene un plazo de 7 días naturales para realizar el depósito correspondiente a la inicial del lote en venta y suscribir el respectivo contrato de compraventa de bien futuro.
4. El Cliente y la Empresa pactan convencionalmente que en caso la suscripción del contrato no se realice por causas injustificadas de la empresa, deberá devolver el monto cancelado por el cliente por concepto de separación.
5. Todos los trámites para la suscripción del contrato de Compraventa, así como información documental referente a anexos, planos y saneamiento del lote a adquirir, deberán efectuarse únicamente en las oficinas de la empresa.
6. Para la validez del documento, deberá estar suscrito (firmado) por el cliente y el asesor comercial.
7. Se deja constancia que el lote a adquirir es un bien futuro de acuerdo a lo estipulado en el Art 1534 del Código Civil.
    `;
    const splitDeclarationText = doc.splitTextToSize(declarationText, pageWidth - 30);
    doc.text(splitDeclarationText, leftMargin, currentY);

    // Firmas y líneas para firmas
    const lineYPosition = 250; // Ajustamos la posición de las líneas de firma
    doc.line(leftMargin, lineYPosition - 5, leftMargin + 40, lineYPosition - 5); // Línea para firma de La Empresa
    doc.line(pageWidth - 55, lineYPosition - 5, pageWidth - 15, lineYPosition - 5); // Línea para firma del Cliente
    doc.text('La Empresa', leftMargin + 10, lineYPosition);
    doc.text('El Cliente', pageWidth - 50, lineYPosition);

    // Genera y descarga el PDF
    doc.save('ReciboDeSeparacion.pdf');
};
