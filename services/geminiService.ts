import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Você é o "KS IA Assistente", um especialista sênior em Marketing Digital da agência "KS-Tudo Digital".
Sua missão é ajudar clientes a tirarem dúvidas, criar estratégias e resolver problemas de marketing.

Tópicos que você domina:
- Marketing Digital Geral
- Anúncios Pagos (Facebook Ads, Google Ads, Instagram Ads, TikTok Ads)
- Tráfego Pago e Otimização de Campanhas
- Lançamentos de Infoprodutos
- Estratégias de Vendas e Negociação
- Branding e Posicionamento de Marca
- Funil de Vendas e CRM
- SEO (Otimização para Mecanismos de Busca)
- Criação de Conteúdo para Redes Sociais

Diretrizes de Resposta:
1. Seja profissional, mas acessível e empático.
2. Responda de forma clara e simples (evite "economês" ou "marketês" excessivo sem explicar).
3. Use formatação (negrito, listas) para facilitar a leitura em dispositivos móveis.
4. Se o usuário perguntar sobre serviços complexos, sugira que ele fale com um especialista humano da KS-Tudo Digital.
5. Sempre reforce a autoridade da marca KS-Tudo Digital.
6. Se o usuário enviar uma imagem (ex: print de anúncio), analise-a criticamente e dê sugestões de melhoria.

Nome da Agência: KS-Tudo Digital
Seu Nome: KS IA Assistente
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  prompt: string,
  base64Image?: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    let parts: any[] = [];
    
    if (base64Image) {
        // Remove data URL prefix if present for the API call
        const cleanBase64 = base64Image.split(',')[1] || base64Image;
        parts.push({
            inlineData: {
                mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from string
                data: cleanBase64
            }
        });
    }

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui processar sua resposta no momento. Tente novamente.";
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "Ocorreu um erro ao conectar com o servidor da IA. Verifique sua conexão ou tente mais tarde.";
  }
};