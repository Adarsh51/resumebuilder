import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { getTemplateComponent } from '@/components/resume-templates';
import { ResumeFormData } from '@/hooks/use-resume-form';

export async function generateResumePDF(
  resumeData: ResumeFormData,
  elementId: string = 'resume-preview'
): Promise<Blob> {
  try {
    // Get the resume element to convert to PDF
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Calculate PDF dimensions (A4 format)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    
    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      position,
      imgWidth,
      imgHeight
    );
    
    // If the resume is longer than one page, add additional pages
    let heightLeft = imgHeight;
    
    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        -position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }
    
    // Convert to blob for download
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

export function downloadPDF(blob: Blob, filename: string = 'resume.pdf'): void {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append to the document, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

// Server-side PDF generation for public URLs
export async function generatePDFOnServer(): Promise<Buffer> {
  // This would be implemented in a server-side API route
  // For now, we'll return a placeholder implementation
  throw new Error('Server-side PDF generation not implemented yet');
}
