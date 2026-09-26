export const WHATSAPP_NUMBER = "201148627137";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "moohamedwahed@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/moohamedwaheed/";

export const whatsappWithText = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
