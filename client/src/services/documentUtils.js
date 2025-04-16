import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

// PDF Generation
export const generatePDF = async (contentRef, fileName = 'document') => {
  try {
    // Capture the content as an image using html2canvas
    const canvas = await html2canvas(contentRef, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    // Calculate dimensions to fit the page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName.toLowerCase().replace(/\s+/g, '-')}.pdf`);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Save Draft to MongoDB
export const saveDraft = async (content, type, token) => {
  try {
    // Handle missing token scenario
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const res = await axios.post(
      '/api/resumes/save',
      { content, type },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data.success) {
      return res.data;
    } else {
      throw new Error('Failed to save draft');
    }
  } catch (error) {
    console.error('Error saving draft:', error);
    if (error.response && error.response.status === 401) {
      // Handle token expiry (redirect to login or show alert)
      alert('Session expired. Please log in again.');
      window.location.href = '/login';  // Replace with your login page URL
    } else {
      throw error;
    }
  }
};

// Update Existing Draft
export const updateDraft = async (draftId, content, token) => {
  try {
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const res = await axios.put(
      `/api/resumes/update/${draftId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data.success) {
      return res.data;
    } else {
      throw new Error('Failed to update draft');
    }
  } catch (error) {
    console.error('Error updating draft:', error);
    if (error.response && error.response.status === 401) {
      // Handle token expiry (redirect to login or show alert)
      alert('Session expired. Please log in again.');
      window.location.href = '/login';  // Replace with your login page URL
    } else {
      throw error;
    }
  }
};
