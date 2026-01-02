import { GoogleGenAI, type Tool } from "@google/genai";

const getClient = () => {
	const apiKey = process.env.API_KEY;
	if (!apiKey) throw new Error("API Key not found in environment");
	return new GoogleGenAI({ apiKey });
};

export const generateAnalysis = async (
	grossAmount: number,
	netNomina: number,
	netPrestacion: number,
	target: number,
): Promise<string> => {
	const ai = getClient();
	const prompt = `Actúa como un Headhunter Senior experto en el mercado IT de Colombia/Latam para 2026. Sé brutalmente honesto y realista.
    
    Analiza esta oferta:
    - Oferta Bruta: $${grossAmount.toLocaleString("es-CO")}
    - Neto Aprox (Nómina): $${netNomina.toLocaleString("es-CO")}
    - Neto Aprox (Prestación): $${netPrestacion.toLocaleString("es-CO")}
    - Honorario de Equilibrio: $${target.toLocaleString("es-CO")}
    
    Responde en Markdown:
    1. **Veredicto Realista:** ¿Es un salario competitivo, bajo o alto para el mercado actual?
    2. **Lo bueno y lo malo:** Pros y contras financieros directos.
    3. **Consejo de Negociación:** ¿Qué debería pedir el candidato?`;

	const response = await ai.models.generateContent({
		model: "gemini-3-flash-preview",
		contents: prompt,
		config: {
			systemInstruction: "Eres un consultor financiero agresivo pero útil.",
		},
	});

	return response.text || "No se pudo generar el análisis.";
};

export const generateCounterOffer = async (
	grossAmount: number,
	target: number,
): Promise<string> => {
	const ai = getClient();
	const prompt = `Escribe un correo de contraoferta para un puesto Tech.
    Oferta actual: $${grossAmount.toLocaleString("es-CO")} (Prestación de Servicios).
    Meta: Llegar a $${target.toLocaleString("es-CO")} o conseguir modalidad Nómina.
    
    Usa un tono profesional, firme pero cortés. Argumenta con la carga prestacional e impuestos (seguridad social completa a cargo del contratista).`;

	const response = await ai.models.generateContent({
		model: "gemini-3-flash-preview",
		contents: prompt,
	});

	return response.text || "No se pudo generar la contraoferta.";
};

export const checkMarket = async (
	role: string = "Desarrollador Software",
): Promise<{
	text: string;
	sources: Array<{ title: string; uri: string }>;
}> => {
	const ai = getClient();
	const tools: Tool[] = [{ googleSearch: {} }];

	const response = await ai.models.generateContent({
		model: "gemini-3-flash-preview",
		contents: `Busca rangos salariales REALES en Colombia 2025-2026 para: ${role}. Diferencia entre Junior, Mid, Senior y Lead.
        Dame cifras en millones de COP.`,
		config: {
			tools: tools,
		},
	});

	const groundingChunks =
		response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
	const sources = groundingChunks
		.map((chunk) => chunk.web)
		.filter((web) => web !== undefined && web !== null)
		.map((web) => ({
			title: web.title || "Fuente Externa",
			uri: web.uri || "#",
		}));

	return {
		text: response.text || "No se pudo consultar el mercado.",
		sources: sources,
	};
};

export const analyzeProfile = async (
	text: string,
	type: "linkedin" | "github",
	targetSalary: number,
): Promise<string> => {
	const ai = getClient();

	let promptContext = "";
	if (type === "linkedin") {
		promptContext =
			"Analizas un perfil de LinkedIn (Experiencia, About, Skills).";
	} else {
		promptContext =
			"Analizas un README de GitHub o descripción de proyectos Open Source.";
	}

	const prompt = `
    ${promptContext}
    Aspiración Salarial: $${targetSalary.toLocaleString("es-CO")} COP / mes.
    Mercado: Tecnología Colombia/Remoto Latam 2026.

    Texto del Perfil:
    """
    ${text.substring(0, 8000)}
    """

    Actúa como un Tech Recruiter de alto nivel y entrégame un reporte en Markdown estricto con estas secciones:

    ### 1. 💰 Reality Check Salarial
    ¿El perfil justifica los $${targetSalary.toLocaleString("es-CO")}? Sé realista. Si falta experiencia, dilo. Si es bajo, dilo.

    ### 2. 🔍 Hacks de Búsqueda (Boolean Strings)
    Genera 2 "Boolean Search Strings" complejas y efectivas que este candidato debería pegar en el buscador de LinkedIn Jobs para encontrar ofertas ocultas que paguen lo que pide.
    Ejemplo: (React OR Vue) AND (Senior) AND ...
    
    ### 3. 🚀 Estrategia Open Source
    Recomienda 2 tipos de proyectos o repositorios específicos (temáticas) donde debería contribuir este perfil para aumentar su valor de mercado. (Ej: "Crea una librería de npm para...", "Contribuye a docs de X framework").

    ### 4. ⚡ Optimización de Perfil
    - **Keywords faltantes:** Qué palabras clave busca el ATS que no están aquí.
    - **Mejora rápida:** Un cambio concreto en su redacción o estructura.
    `;

	const response = await ai.models.generateContent({
		model: "gemini-3-flash-preview",
		contents: prompt,
		config: {
			systemInstruction:
				"Eres un coach de carrera técnica muy pragmático. Usas formato Markdown con listas, negritas y bloques de código.",
		},
	});

	return response.text || "No se pudo analizar el perfil.";
};
