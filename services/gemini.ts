import { GoogleGenAI, Tool } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found in environment");
    return new GoogleGenAI({ apiKey });
};

export const generateAnalysis = async (
    grossAmount: number,
    netNomina: number,
    netPrestacion: number,
    target: number
): Promise<string> => {
    const ai = getClient();
    const prompt = `Actúa como un experto en finanzas laborales de Colombia (2026). Analiza esta oferta de $${grossAmount.toLocaleString('es-CO')} COP (monto bruto mensual).
    Datos calculados:
    - Si fuera nómina: Recibe neto mensual de $${netNomina.toLocaleString('es-CO')}.
    - Si fuera prestación de servicios: Recibe neto mensual de $${netPrestacion.toLocaleString('es-CO')}.
    - El punto de equilibrio (honorario objetivo para igualar nómina) es de $${target.toLocaleString('es-CO')}.
    
    ¿Es una oferta competitiva para un rol IT/Tech en 2026? Da una respuesta concisa con pros y contras.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: "Eres un consultor experto en salarios y leyes laborales de Colombia especializado en la industria tech.",
        }
    });

    return response.text || "No se pudo generar el análisis.";
};

export const generateCounterOffer = async (
    grossAmount: number,
    target: number
): Promise<string> => {
    const ai = getClient();
    const prompt = `Redacta una contraoferta profesional y persuasiva para un desarrollador de software que recibió una oferta de $${grossAmount.toLocaleString('es-CO')} COP por Prestación de Servicios.
    Utiliza el argumento de que para igualar los beneficios de nómina, el honorario objetivo debería ser cercano a $${target.toLocaleString('es-CO')}.
    Menciona la carga de seguridad social y la falta de primas/cesantías. Tono: respetuoso y negociador.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: "Eres un coach de negociación salarial.",
        }
    });

    return response.text || "No se pudo generar la contraoferta.";
};

export const checkMarket = async (role: string = "Desarrollador Software"): Promise<{ text: string, sources: Array<{title: string, uri: string}> }> => {
    const ai = getClient();
    
    const tools: Tool[] = [{ googleSearch: {} }];

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Busca salarios actualizados en Colombia para el rol: ${role} en el año 2025-2026. Compara Junior, Mid y Senior.`,
        config: {
            tools: tools,
            systemInstruction: "Responde con datos concretos del mercado laboral colombiano en pesos (COP).",
        }
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
        .map(chunk => chunk.web)
        .filter(web => web !== undefined && web !== null)
        .map(web => ({ title: web.title || 'Fuente', uri: web.uri || '#' }));

    return {
        text: response.text || "No se pudo consultar el mercado.",
        sources: sources
    };
};

export const analyzeLinkedInProfile = async (
    profileText: string,
    targetSalary: number
): Promise<string> => {
    const ai = getClient();
    const prompt = `Analiza el siguiente perfil profesional (extraído de LinkedIn/CV) para una aspiración salarial de $${targetSalary.toLocaleString('es-CO')} COP mensuales en Colombia (Mercado 2026).
    
    Perfil:
    """
    ${profileText.substring(0, 5000)}
    """
    
    Genera 3 secciones cortas:
    1. 🟢 **Fortalezas:** Qué justifica ese salario.
    2. 🔴 **Brechas:** Qué falta para asegurar ese salario o pedir más.
    3. 💡 **Recomendación de Perfil:** Qué keywords o logros agregar al perfil de LinkedIn para atraer reclutadores con ese presupuesto.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: "Eres un reclutador experto IT headhunter.",
        }
    });

    return response.text || "No se pudo analizar el perfil.";
};