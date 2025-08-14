import axios from "axios";

export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5002/api/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error;
  }
};