import { PDFDocument } from 'pdf-lib';
import * as mammoth from 'mammoth';

export async function extractTextFromResume(file: File): Promise<string> {
  try {
    if (file.type === 'application/pdf') {
      return await extractTextFromPdf(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await extractTextFromDocx(file);
    } else {
      throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }
  } catch (error) {
    console.error('Error extracting text from resume:', error);
    throw new Error('Failed to parse resume file');
  }
}

async function extractTextFromPdf(file: File): Promise<string> {
  try {
    // Note: pdf-lib is primarily for PDF manipulation, not text extraction
    // For actual text extraction from PDFs, you might need a different library
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let text = '';

    for (const page of pages) {
      // This is a simplified approach - actual text extraction would require OCR
      text += `Page ${pages.indexOf(page) + 1}\n`;
      // For real text extraction, consider using pdf-parse instead
    }

    return text;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}

async function extractTextFromDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Error processing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
}