// src/utils/generatePDF.js
import { jsPDF } from 'jspdf';

export default function generatePDF(data, letter) {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setFontSize(14);
  doc.text(letter.split('\n'), 20, 20);
  doc.save('FIR_CyberCop.pdf');
}
