
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const url = `https://graph.facebook.com/v19.0/${process.env.META_PHONE_ID}/messages`;
const recipient = process.env.META_RECIPIENT;
/**
 * Envía una plantilla de WhatsApp llamada 'pedido' usando la API de Meta.
 * @param recipient Número de WhatsApp en formato internacional (ej: 584125072254)
 * @param templateParams Array de parámetros para la plantilla (opcional)
 */
const sendWhatsAppTemplate = async () => {
  try {
    const data: any = {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'template',
      template: {
        name: 'pedido',
        language: { code: 'es' },
      },
    };
 
    const response = await axios.post(
      url + `?access_token=${process.env.META_TOKEN}`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error enviando plantilla WhatsApp:', error.response?.data || error.message);
    throw new Error('Error al enviar la plantilla de WhatsApp');
  }
};

export default sendWhatsAppTemplate;
