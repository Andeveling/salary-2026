// Configuración de Prompts Estáticos para Análisis Salarial IT 2026
// Estos prompts están diseñados para ser copiados y usados en cualquier servicio de IA
// (ChatGPT, Claude, Gemini, Perplexity, DeepResearch, etc.)

export type PromptCategory = "salary" | "profile" | "market" | "negotiation";

export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface EnglishLevelContext {
	level: EnglishLevel;
	technicalFocus: boolean; // Si el inglés es principalmente técnico
	hasCertification: boolean;
	certificationScore?: string; // Ej: "TOEFL 95", "IELTS 7.5"
}

export interface PromptVariable {
	name: string;
	label: string;
	type: "number" | "text" | "select" | "textarea" | "english-selector";
	placeholder?: string;
	options?: string[];
	tooltip?: string;
}

export interface PromptTemplate {
	id: string;
	title: string;
	description: string;
	category: PromptCategory;
	icon: string; // FontAwesome class
	themeColor: "neon-blue" | "neon-green" | "neon-purple" | "neon-yellow";
	template: string; // Con placeholders ${variable}
	variables: PromptVariable[];
	recommendedFor: string[]; // Servicios recomendados: ["ChatGPT", "Claude", "Gemini"]
	estimatedTokens: number; // Estimación de tokens del prompt
}

// ============================================================================
// TEMPLATES DE PROMPTS
// ============================================================================

export const PROMPT_TEMPLATES: PromptTemplate[] = [
	// ============================
	// CATEGORÍA: ANÁLISIS SALARIAL
	// ============================
	{
		id: "salary-analysis-comprehensive",
		title: "Análisis Salarial Detallado",
		description:
			"Evaluación completa de una oferta salarial comparando nómina vs prestación de servicios",
		category: "salary",
		icon: "fa-chart-line",
		themeColor: "neon-blue",
		estimatedTokens: 650,
		recommendedFor: ["ChatGPT", "Claude", "Gemini"],
		variables: [
			{
				name: "salarioBruto",
				label: "Salario Bruto Ofrecido",
				type: "number",
				placeholder: "8000000",
				tooltip: "Monto bruto mensual de la oferta (COP)",
			},
			{
				name: "netoNomina",
				label: "Neto Estimado (Nómina)",
				type: "number",
				placeholder: "6800000",
				tooltip: "Salario neto después de descuentos en modalidad nómina",
			},
			{
				name: "netoPrestacion",
				label: "Neto Estimado (Prestación)",
				type: "number",
				placeholder: "5400000",
				tooltip: "Neto después de seguridad social y retención en prestación",
			},
			{
				name: "honorarioEquilibrio",
				label: "Honorario de Equilibrio",
				type: "number",
				placeholder: "12080000",
				tooltip:
					"Honorario necesario para igualar beneficios de nómina (factor ~1.51x)",
			},
			{
				name: "yearsExperience",
				label: "Años de Experiencia",
				type: "number",
				placeholder: "5",
				tooltip: "Años de experiencia profesional en el sector IT",
			},
			{
				name: "seniority",
				label: "Nivel de Seniority",
				type: "select",
				options: ["Junior", "Mid-Level", "Senior", "Lead/Staff", "Principal"],
				tooltip: "Nivel de experiencia del candidato",
			},
		],
		template: `# CONTEXTO DEL ANÁLISIS

Eres un Headhunter Senior con más de 15 años de experiencia en el mercado IT de Colombia y Latinoamérica. Tu especialidad es asesorar a profesionales de tecnología sobre compensación, beneficios y estrategias de negociación salarial. Tienes un conocimiento profundo de:

- Rangos salariales actuales por seniority y stack tecnológico (2026)
- Diferencias fiscales y prestacionales entre Nómina y Prestación de Servicios
- Tendencias de contratación remota e híbrida en LATAM
- Estrategias de negociación efectivas
- Prácticas de compensación de empresas tech locales vs multinacionales

# OFERTA A ANALIZAR

**Información Proporcionada:**
- Salario Bruto Mensual Ofrecido: $\${salarioBruto} COP
- Neto Aproximado (Modalidad Nómina): $\${netoNomina} COP
- Neto Aproximado (Prestación de Servicios): $\${netoPrestacion} COP
- Honorario de Equilibrio Sugerido: $\${honorarioEquilibrio} COP

**Contexto del Candidato:**
- Años de Experiencia: \${yearsExperience} años
- Nivel de Seniority: \${seniority}

# INSTRUCCIONES DE ANÁLISIS

Por favor, proporciona un análisis exhaustivo y brutalmente honesto siguiendo esta estructura en formato Markdown:

## 1. 💰 VEREDICTO SALARIAL REALISTA

Evalúa si esta oferta es competitiva para el mercado IT colombiano/LATAM en 2026, considerando:
- El nivel de seniority (\${seniority}) y experiencia (\${yearsExperience} años)
- Comparación con rangos salariales actuales del mercado
- Si está por encima, en línea o por debajo del promedio
- Proyección de poder adquisitivo considerando inflación 2025-2026

**Clasifica la oferta como:** EXCELENTE / COMPETITIVA / JUSTA / BAJA / MUY BAJA

## 2. ⚖️ ANÁLISIS NÓMINA VS PRESTACIÓN DE SERVICIOS

Desglosa las implicaciones de cada modalidad:

### Si es Nómina ($\${salarioBruto}):
- Beneficios incluidos (prima, cesantías, vacaciones, auxilio de transporte)
- Seguridad social cubierta por el empleador
- Estabilidad y protección laboral
- Ingreso neto mensual real: $\${netoNomina}
- Ingreso anual total aproximado (incluyendo prestaciones)

### Si es Prestación de Servicios ($\${salarioBruto}):
- Costos asumidos por el contratista (salud 12.5%, pensión 16%, ARL, FSP)
- Retención en la fuente aplicable
- Ausencia de prestaciones sociales (prima, cesantías, vacaciones)
- Ingreso neto mensual real: $\${netoPrestacion}
- Necesidad de facturar $\${honorarioEquilibrio} para igualar beneficios de nómina

### Recomendación:
Indica claramente cuál modalidad es más conveniente y por qué.

## 3. 🎯 PROS Y CONTRAS FINANCIEROS

### ✅ Aspectos Positivos:
(Lista de 3-5 puntos específicos de la oferta)

### ⚠️ Aspectos Negativos o Riesgos:
(Lista de 3-5 puntos de alerta o mejorables)

## 4. 🚀 ESTRATEGIA DE NEGOCIACIÓN

Proporciona una guía paso a paso para negociar:

### A. Preparación:
- Datos y argumentos clave a preparar antes de la conversación
- Documentación de valor agregado (proyectos, logros, certificaciones)

### B. Rango de Negociación:
- **Piso mínimo aceptable:** (monto y justificación)
- **Objetivo realista:** (monto y argumentos)
- **Escenario ideal:** (monto y condiciones)

### C. Argumentos Clave:
- Justificación técnica basada en seniority y experiencia
- Comparación con mercado (sin revelar otras ofertas específicas)
- Valor diferenciador del candidato

### D. Alternativas si no hay flexibilidad salarial:
- Beneficios no monetarios negociables (días remotos, horario flexible)
- Bonos por desempeño o cumplimiento de objetivos
- Revisión salarial garantizada en 6 meses
- Presupuesto para capacitación/certificaciones
- Equipamiento o herramientas adicionales

## 5. 📊 COMPARACIÓN CON MERCADO 2026

Proporciona rangos salariales actuales en Colombia/LATAM para el nivel \${seniority}:
- Rango bajo (percentil 25)
- Rango medio (percentil 50)
- Rango alto (percentil 75)
- Top performers (percentil 90+)

Indica dónde se ubica esta oferta dentro de estos rangos.

## 6. 🎓 RECOMENDACIONES ADICIONALES

- ¿Vale la pena aceptar esta oferta?
- Si es baja: ¿cuánto tiempo invertir en negociación vs seguir buscando?
- Si es competitiva: ¿qué preguntar sobre proyección de carrera y aumentos?
- Red flags a vigilar en la empresa/contrato

---

**IMPORTANTE:** Sé directo, usa cifras concretas, evita generalidades. Si la oferta es mala, dilo claramente. Si es buena, explica por qué. Incluye ejemplos específicos de negociación cuando sea posible.`,
	},

	// ================================
	// CATEGORÍA: NEGOCIACIÓN / CONTRAOFERTA
	// ================================
	{
		id: "counter-offer-email",
		title: "Email de Contraoferta Profesional",
		description:
			"Redacción de email para negociar un aumento salarial o contraoferta",
		category: "negotiation",
		icon: "fa-handshake",
		themeColor: "neon-purple",
		estimatedTokens: 580,
		recommendedFor: ["ChatGPT", "Claude"],
		variables: [
			{
				name: "ofertaActual",
				label: "Oferta Actual Recibida",
				type: "number",
				placeholder: "8000000",
				tooltip: "Monto que te ofrecieron inicialmente",
			},
			{
				name: "metaDeseada",
				label: "Meta Salarial Deseada",
				type: "number",
				placeholder: "12000000",
				tooltip: "Monto que deseas negociar",
			},
			{
				name: "modalidadActual",
				label: "Modalidad de Contratación",
				type: "select",
				options: ["Prestación de Servicios", "Nómina", "No especificada"],
				tooltip: "Modalidad en la que hicieron la oferta",
			},
			{
				name: "puestoAplicado",
				label: "Puesto/Rol Aplicado",
				type: "text",
				placeholder: "Senior Backend Developer",
				tooltip: "Título del cargo ofrecido",
			},
			{
				name: "contextoCandidato",
				label: "Contexto Personal (opcional)",
				type: "textarea",
				placeholder:
					"Tengo 7 años de experiencia, certificación AWS, lideré migración de microservicios...",
				tooltip:
					"Logros, certificaciones, experiencia relevante para justificar la contraoferta",
			},
		],
		template: `# CONTEXTO Y OBJETIVO

Eres un Career Coach especializado en redacción de correos de negociación salarial para profesionales de tecnología en Latinoamérica. Tu tarea es redactar un email de contraoferta que sea:

- **Profesional y cortés:** Sin sonar desesperado o arrogante
- **Firme y seguro:** Transmite confianza en el valor del candidato
- **Basado en datos:** Usa argumentos financieros y de mercado, no emocionales
- **Constructivo:** Mantiene la puerta abierta para seguir conversando

# INFORMACIÓN DE LA OFERTA

- **Oferta Actual Recibida:** $\${ofertaActual} COP mensuales
- **Contraoferta Objetivo:** $\${metaDeseada} COP mensuales
- **Modalidad de Contratación:** \${modalidadActual}
- **Puesto Aplicado:** \${puestoAplicado}

**Contexto del Candidato:**
\${contextoCandidato}

# INSTRUCCIONES DE REDACCIÓN

Redacta un email completo siguiendo estas pautas:

## Estructura del Email:

### 1. Saludo y Agradecimiento (2-3 líneas)
- Agradece la oferta de manera genuina
- Expresa entusiasmo por la oportunidad y el rol
- Mención breve de algo específico que te gustó del proceso o la empresa

### 2. Exposición Respetuosa de la Situación (1 párrafo)
- Plantea de manera diplomática que la oferta no se alinea completamente con tus expectativas
- Menciona que después de analizar la propuesta y considerar el mercado actual...
- Evita comparar directamente con otras ofertas (aunque las tengas)

### 3. Argumentación Técnica (2-3 párrafos)

**SI LA MODALIDAD ES PRESTACIÓN DE SERVICIOS:**
- Explica educadamente los costos reales que asume el contratista:
  - Seguridad social completa (Salud 12.5%, Pensión 16%, ARL ~0.5%)
  - Fondo de Solidaridad Pensional (FSP) si aplica
  - Retención en la fuente (4-10% según tramos)
  - Ausencia de prestaciones sociales (prima, cesantías, vacaciones)
- Presenta el cálculo que muestra que el neto real es considerablemente menor al bruto
- Menciona que para equilibrar beneficios con una nómina equivalente, el honorario debería estar cerca de $\${metaDeseada}

**SI LA MODALIDAD ES NÓMINA O NO ESPECIFICADA:**
- Argumenta con base en:
  - Tu nivel de experiencia y seniority
  - Certificaciones o habilidades diferenciadas
  - Rangos del mercado actual para el rol \${puestoAplicado}
  - Valor específico que aportarás a los proyectos

### 4. Propuesta Concreta (1 párrafo corto)
- Plantea tu contraoferta de manera directa pero amable:
  *"Con base en lo anterior, mi expectativa salarial para este rol estaría en el rango de $\${metaDeseada} COP mensuales."*
- Opcional: Ofrece flexibilidad si hay otros beneficios compensatorios

### 5. Alternativas si no hay Flexibilidad Salarial (1 párrafo)
- Sugiere opciones si el presupuesto es fijo:
  - Cambio de modalidad (de Prestación a Nómina)
  - Bono de signing o bono por desempeño
  - Revisión salarial garantizada en 6 meses
  - Días adicionales de vacaciones o trabajo remoto
  - Presupuesto para capacitación/conferencias

### 6. Cierre Positivo (2-3 líneas)
- Reafirma tu interés genuino en unirte al equipo
- Expresa apertura al diálogo y disposición para encontrar un punto medio
- Agradece nuevamente su tiempo y consideración
- Firma profesional

## Tono y Estilo:

- **Longitud:** 300-400 palabras (conciso pero completo)
- **Tono:** Formal-casual (profesional pero humano)
- **Evitar:** Justificaciones personales (deudas, gastos familiares), comparaciones con otras empresas por nombre, ultimátums o amenazas veladas
- **Incluir:** Datos, cálculos, contexto de mercado, énfasis en el valor mutuo

## Formato de Salida:

Proporciona el email completo listo para copiar y pegar, incluyendo:
- Asunto sugerido del email
- Cuerpo completo del mensaje
- Firma

---

**IMPORTANTE:** El email debe transmitir seguridad sin arrogancia, firmeza sin agresividad, y debe dejar claro que el candidato es valioso pero también está dispuesto a conversar. NUNCA incluir referencias a bootcamps como justificación de valor (se valora experiencia real, proyectos verificables y certificaciones reconocidas por la industria).`,
	},

	// ================================
	// CATEGORÍA: INVESTIGACIÓN DE MERCADO
	// ================================
	{
		id: "market-research-deepresearch",
		title: "Investigación de Mercado Salarial (DeepResearch/Perplexity)",
		description:
			"Prompt optimizado para investigación profunda de rangos salariales en Colombia/LATAM",
		category: "market",
		icon: "fa-magnifying-glass-chart",
		themeColor: "neon-green",
		estimatedTokens: 420,
		recommendedFor: ["Perplexity", "DeepResearch", "ChatGPT (con navegador)"],
		variables: [
			{
				name: "rolEspecifico",
				label: "Rol/Puesto Específico",
				type: "text",
				placeholder: "Senior Full-Stack Developer",
				tooltip: "Título exacto del puesto a investigar",
			},
			{
				name: "stack",
				label: "Stack Tecnológico",
				type: "text",
				placeholder: "React, Node.js, PostgreSQL, AWS",
				tooltip: "Tecnologías principales del rol",
			},
			{
				name: "modalidadTrabajo",
				label: "Modalidad de Trabajo",
				type: "select",
				options: [
					"Remoto",
					"Híbrido",
					"Presencial",
					"Remoto Internacional",
					"Cualquiera",
				],
				tooltip: "Tipo de trabajo para filtrar salarios",
			},
		],
		template: `# INVESTIGACIÓN DE MERCADO SALARIAL IT - COLOMBIA/LATAM 2026

Necesito realizar una investigación exhaustiva y actualizada sobre rangos salariales para el siguiente perfil profesional:

**ROL A INVESTIGAR:**
- Puesto: \${rolEspecifico}
- Stack Tecnológico: \${stack}
- Modalidad de Trabajo: \${modalidadTrabajo}
- Mercado Objetivo: Colombia y Latinoamérica
- Año de Referencia: 2026 (datos más recientes disponibles)

---

## INSTRUCCIONES DE BÚSQUEDA

Por favor, realiza una investigación profunda consultando múltiples fuentes confiables y proporciona un reporte estructurado con las siguientes secciones:

### 1. 📊 RANGOS SALARIALES POR SENIORITY (en COP mensuales)

Proporciona cifras específicas para cada nivel, diferenciando por modalidad de contratación:

#### Junior (0-2 años de experiencia):
- Nómina: Rango mínimo - máximo
- Prestación de Servicios: Rango mínimo - máximo

#### Mid-Level (3-5 años):
- Nómina: Rango mínimo - máximo
- Prestación de Servicios: Rango mínimo - máximo

#### Senior (6-9 años):
- Nómina: Rango mínimo - máximo
- Prestación de Servicios: Rango mínimo - máximo

#### Lead/Staff (10+ años):
- Nómina: Rango mínimo - máximo
- Prestación de Servicios: Rango mínimo - máximo

### 2. 🌎 COMPARACIÓN REGIONAL

Compara los rangos en diferentes mercados LATAM:
- Colombia (ciudades principales: Bogotá, Medellín, Cali)
- México
- Argentina
- Chile
- Remoto Internacional (empresas USA/Europa contratando en LATAM)

Incluye conversiones a USD cuando sea relevante.

### 3. 💼 DIFERENCIADORES DE SALARIO

Identifica factores que impactan significativamente la compensación:
- Tipo de empresa (Startup vs Corporativo vs Multinacional)
- Certificaciones más valoradas para este rol
- Habilidades técnicas adicionales que elevan el salario (ej: inglés C1+, liderazgo, arquitectura)
- Industrias que pagan mejor para este perfil

### 4. 📈 TENDENCIAS 2025-2026

- ¿Cómo ha evolucionado el salario para este rol en el último año?
- ¿Hay escasez o saturación de talento en este stack?
- Proyección para los próximos 12 meses
- Impacto de la IA y automatización en la demanda del rol

### 5. 🎁 BENEFICIOS COMUNES (además del salario base)

Lista los beneficios típicos ofrecidos por percentil:
- **Percentil 25 (básico):** 
- **Percentil 50 (estándar):**
- **Percentil 75 (competitivo):**
- **Percentil 90+ (top tier):**

Incluye: bonos, equity, equipamiento, capacitación, días libres, etc.

### 6. 🔗 FUENTES CONSULTADAS

Lista las fuentes específicas utilizadas con links:
- Sitios de empleo (LinkedIn Salary, Glassdoor, Torre, GetonBoard)
- Reportes salariales de consultoras (Hays, Michael Page, PageGroup)
- Comunidades tech (LatamDev, comunidades de Slack/Discord)
- Datos gubernamentales o estudios académicos
- Encuestas de la industria

---

## FORMATO DE RESPUESTA ESPERADO

- Usa **tablas Markdown** para presentar los rangos salariales
- Incluye **cifras concretas en COP** (pesos colombianos)
- Proporciona **conversiones a USD** cuando sea relevante
- Destaca **insights clave** en negritas
- Incluye **links directos** a las fuentes consultadas

## CRITERIOS DE CALIDAD

- Prioriza datos de 2025-2026 (últimos 12 meses)
- Verifica consistencia entre múltiples fuentes
- Si hay discrepancias, menciona el rango y las razones
- Descarta datos de bootcamps sin experiencia laboral verificable
- Enfócate en perfiles con experiencia demostrable y certificaciones reconocidas

---

**NOTA IMPORTANTE:** Busca datos REALES del mercado actual, no promedios teóricos o desactualizados. Si una fuente es de 2023-2024, indícalo claramente y ajusta por inflación/tendencias si es posible.`,
	},

	// ================================
	// CATEGORÍA: ANÁLISIS DE PERFIL
	// ================================
	{
		id: "profile-analysis-comprehensive",
		title: "Auditoría de Perfil Profesional 360°",
		description:
			"Análisis detallado de perfil LinkedIn/GitHub con recomendaciones accionables",
		category: "profile",
		icon: "fa-user-tie",
		themeColor: "neon-yellow",
		estimatedTokens: 720,
		recommendedFor: ["ChatGPT", "Claude"],
		variables: [
			{
				name: "tipoPerfilTexto",
				label: "Tipo de Perfil",
				type: "select",
				options: ["LinkedIn", "GitHub", "Portafolio Web", "CV Técnico"],
				tooltip: "Fuente del perfil a analizar",
			},
			{
				name: "aspiracionSalarial",
				label: "Aspiración Salarial (COP mensuales)",
				type: "number",
				placeholder: "10000000",
				tooltip: "Salario objetivo del candidato",
			},
			{
				name: "englishLevel",
				label: "Nivel de Inglés",
				type: "english-selector",
				tooltip: "Selecciona tu nivel de inglés y contexto",
			},
			{
				name: "perfilCompleto",
				label: "Contenido del Perfil",
				type: "textarea",
				placeholder:
					"Pega aquí el contenido completo de tu LinkedIn/GitHub/CV...",
				tooltip:
					"Copia todo el texto de tu perfil: About, Experiencia, Proyectos, Skills",
			},
		],
		template: `# CONTEXTO Y OBJETIVO

Eres un Tech Recruiter Senior con más de 10 años de experiencia en reclutamiento IT para empresas multinacionales, startups de alto crecimiento y consultoras tecnológicas en Latinoamérica. Tu especialidad es:

- Identificar fortalezas y debilidades en perfiles técnicos
- Optimización de perfiles para sistemas ATS (Applicant Tracking Systems)
- Estrategias de búsqueda efectiva de empleo en tech
- Evaluación realista de competitividad salarial
- Coaching de marca personal para desarrolladores

# PERFIL A ANALIZAR

**Tipo de Perfil:** \${tipoPerfilTexto}
**Aspiración Salarial:** $\${aspiracionSalarial} COP/mes
**Mercado Objetivo:** Colombia, LATAM, Remoto Internacional
**Año de Referencia:** 2026

**Nivel de Inglés:**
\${englishLevel}

**Contenido del Perfil:**
"""
\${perfilCompleto}
"""

---

# INSTRUCCIONES DE ANÁLISIS

Proporciona un análisis exhaustivo y brutalmente honesto siguiendo esta estructura en formato Markdown:

## 1. 💰 REALITY CHECK SALARIAL

### Veredicto Directo:
¿Este perfil justifica los $\${aspiracionSalarial} COP mensuales en el mercado actual?

**Responde con una de estas clasificaciones:**
- ✅ **POR ENCIMA:** El perfil justifica este salario y podría aspirar a más
- ✅ **JUSTIFICADO:** El salario es realista y alcanzable con este perfil
- ⚠️ **REQUIERE MEJORAS:** Posible, pero necesita fortalecer algunas áreas
- ❌ **SOBREVALORADO:** El salario está por encima de lo que justifica el perfil actual
- ❌ **POCO REALISTA:** Gap significativo entre perfil y aspiración

### Justificación Detallada:
- ¿Qué aspectos del perfil soportan (o no) esta aspiración salarial?
- ¿Qué nivel de seniority refleja realmente este perfil? (Junior/Mid/Senior/Lead)
- ¿Qué empresas/roles específicos podrían pagar esta cifra a este perfil?

### Rango Salarial Realista:
Con base en el perfil analizado, proporciona:
- **Rango Conservador (actual):** $XXX - $XXX COP
- **Rango Objetivo (6-12 meses):** $XXX - $XXX COP
- **Rango Aspiracional (2+ años):** $XXX - $XXX COP

## 2. 🎯 EVALUACIÓN DE COMPETITIVIDAD

### Fortalezas Destacadas (Top 3):
1. **[Fortaleza]:** Por qué es valiosa y cómo explotarla
2. **[Fortaleza]:** Impacto en competitividad
3. **[Fortaleza]:** Diferenciador clave

### Debilidades Críticas (Top 3):
1. **[Debilidad]:** Por qué limita oportunidades y cómo corregirla
2. **[Debilidad]:** Gap respecto a perfiles competidores
3. **[Debilidad]:** Riesgo de rechazo en procesos

### Análisis de Inglés:
Basándose en el nivel de inglés reportado, evalúa:
- ¿Es suficiente para el salario aspirado?
- ¿Qué oportunidades se abren/cierran con este nivel?
- Recomendaciones específicas (certificación, práctica técnica, etc.)
- Impacto en salario: ¿Cuánto más podría ganar con inglés C1-C2?

## 3. 🔍 HACKS DE BÚSQUEDA (Boolean Strings)

Genera **3 Boolean Search Strings** ultra-específicas optimizadas para que este candidato encuentre ofertas ocultas en LinkedIn Jobs que:
- Paguen en el rango de $\${aspiracionSalarial} o más
- Se alineen con su stack tecnológico actual
- Aprovechen sus fortalezas identificadas

### String 1: Roles Directos
\`\`\`
(TU BOOLEAN STRING AQUÍ)
\`\`\`
**Explicación:** Por qué esta búsqueda es efectiva para este perfil

### String 2: Roles Alternativos/Adyacentes
\`\`\`
(TU BOOLEAN STRING AQUÍ)
\`\`\`
**Explicación:** Roles similares que podría no estar considerando

### String 3: Empresas/Industrias Objetivo
\`\`\`
(TU BOOLEAN STRING AQUÍ)
\`\`\`
**Explicación:** Filtro por tipo de empresa que valora este perfil

## 4. 🚀 ESTRATEGIA OPEN SOURCE & SIDE PROJECTS

### Proyectos Recomendados (2-3 ideas específicas):

Para cada proyecto, proporciona:
- **Proyecto:** Título descriptivo
- **Objetivo:** Qué problema resuelve
- **Stack Sugerido:** Tecnologías a usar (alineadas con aspiraciones)
- **Complejidad:** Tiempo estimado y nivel técnico requerido
- **Impacto en CV:** Por qué este proyecto específicamente suma valor
- **Keywords SEO:** Qué términos de búsqueda de recruiters capturará

Ejemplo de áreas:
- Librerías/paquetes de código abierto (npm, PyPI, Maven)
- Contribuciones a proyectos populares (docs, bugs, features)
- Herramientas CLI o de productividad para developers
- Demos técnicos que muestren habilidades avanzadas

### Contribuciones Open Source Estratégicas:
- Qué repositorios/organizaciones debería targetear
- Tipo de contribuciones que más valor añaden (code vs docs vs issues)
- Cómo documentar estas contribuciones en LinkedIn/GitHub

## 5. ⚡ OPTIMIZACIÓN DE PERFIL (Quick Wins)

### A. Keywords Faltantes para ATS:
Lista 8-12 términos clave que los sistemas ATS buscan para este nivel y que NO están en el perfil:
- [Keyword 1]: Dónde incluirla (título, about, skills)
- [Keyword 2]: Contexto de uso
- [etc.]

### B. Mejora de Headline/Title:
**Actual:** [extracto del título actual si está visible]
**Sugerido:** [nuevo título optimizado de máximo 120 caracteres]
**Razón:** Por qué esta versión es más efectiva

### C. Sección "About/Acerca de":
**Problemas identificados:**
- [Issue 1]
- [Issue 2]

**Template mejorado:** 
Proporciona un párrafo de ejemplo (150-200 palabras) que el candidato pueda adaptar, incluyendo:
- Hook inicial (qué hace y para quién)
- Diferenciador clave
- Stack tecnológico relevante
- Logro cuantificable
- Call to action

### D. Experiencia Laboral:
¿Cómo mejorar la redacción de los roles?
- Usar formato STAR (Situation, Task, Action, Result)
- Cuantificar impacto (métricas, porcentajes, usuarios)
- Destacar liderazgo técnico y decisiones de arquitectura

### E. Skills & Endorsements:
- Top 10 skills que DEBEN estar visibles
- Skills a eliminar (desactualizadas o irrelevantes)
- Orden de prioridad para poner arriba

## 6. 📊 ANÁLISIS COMPETITIVO

### Benchmark con el Mercado:
Comparado con otros perfiles que aspiran a $\${aspiracionSalarial}:
- ¿En qué percentil está este perfil? (0-25 / 25-50 / 50-75 / 75-100)
- ¿Qué tienen los competidores que este perfil no tiene?
- ¿Qué tiene este perfil que es único/valioso?

### Proyección de Carrera:
- **Path Técnico:** Próximos roles lógicos (ej: Mid → Senior → Staff → Principal)
- **Path Gerencial:** Si hay señales de liderazgo (ej: Senior → Tech Lead → Engineering Manager)
- **Path Especializado:** Nichos donde podría destacar (ej: DevOps, Security, Data)

## 7. 🎯 PLAN DE ACCIÓN (30/60/90 días)

### Mes 1 (Quick Wins):
- [ ] Acción concreta 1
- [ ] Acción concreta 2
- [ ] Acción concreta 3

### Mes 2 (Skill Building):
- [ ] Acción concreta 1
- [ ] Acción concreta 2
- [ ] Acción concreta 3

### Mes 3 (Visibility & Networking):
- [ ] Acción concreta 1
- [ ] Acción concreta 2
- [ ] Acción concreta 3

---

## CRITERIOS DE ANÁLISIS

**IMPORTANTE:** 
- Ignora menciones de bootcamps sin experiencia laboral verificable (0 valor para recruiters senior)
- Valora MÁS: proyectos en producción, usuarios reales, métricas de impacto, certificaciones oficiales (AWS, GCP, Azure, etc.)
- Sé brutalmente honesto: si el perfil no justifica el salario, dilo claramente
- Proporciona ejemplos concretos, no generalidades
- Usa listas con checkboxes para accionables

**TONO:** Directo, constructivo, sin endulzar la verdad, pero siempre con recomendaciones prácticas para mejorar.`,
	},
];

// ============================================================================
// UTILIDADES
// ============================================================================

export const getPromptsByCategory = (
	category: PromptCategory,
): PromptTemplate[] => {
	return PROMPT_TEMPLATES.filter((prompt) => prompt.category === category);
};

export const getPromptById = (id: string): PromptTemplate | undefined => {
	return PROMPT_TEMPLATES.find((prompt) => prompt.id === id);
};

export const CATEGORY_INFO: Record<
	PromptCategory,
	{ label: string; icon: string; description: string }
> = {
	salary: {
		label: "Análisis Salarial",
		icon: "fa-chart-line",
		description:
			"Evalúa ofertas y compara modalidades de contratación (nómina vs prestación)",
	},
	profile: {
		label: "Perfil Profesional",
		icon: "fa-user-tie",
		description:
			"Optimiza tu LinkedIn, GitHub y CV para destacar ante recruiters",
	},
	market: {
		label: "Investigación Mercado",
		icon: "fa-magnifying-glass-chart",
		description:
			"Consulta rangos salariales actuales y tendencias del mercado IT",
	},
	negotiation: {
		label: "Negociación",
		icon: "fa-handshake",
		description:
			"Redacta contraofertas y emails profesionales de negociación salarial",
	},
};
