<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Calculadora Salarial IT Colombia 2026

Simulador de salario neto para profesionales IT en Colombia. Compara **Nómina** vs **Prestación de Servicios** e incluye una biblioteca de prompts estáticos para análisis salarial sin depender de APIs externas.

## ✨ Características

- ⚖️ **Comparación Nómina vs Prestación**: Calcula salario neto mensual y anual con todos los descuentos legales
- 🎯 **Honorario de Equilibrio**: Muestra cuánto debes facturar en prestación de servicios para igualar una nómina
- 💰 **Plan de Gestión Financiera**: Estrategia de ahorro e inversión basada en "Tu Verdadero Portafolio" con 4 variantes de liquidez
- 🎨 **Diseño Brutalist**: Interfaz moderna con bordes gruesos, sombras duras y colores neón
- 📚 **Biblioteca de Prompts Estáticos**: 4 plantillas exhaustivas para análisis salarial, negociación y perfil profesional
- 🚀 **Sin Dependencias de IA Externa**: Los prompts se copian y usan en ChatGPT, Claude, Gemini o cualquier servicio

## 🛠️ Tecnologías

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Biome (linting/formatting)

## 🚀 Instalación y Uso

1. Instala dependencias:
   ```bash
   bun install
   ```

2. Ejecuta el proyecto:
   ```bash
   bun run dev
   ```

3. Abre en tu navegador: `http://localhost:3000`

## 📊 Configuración

Los parámetros de cálculo están centralizados en [`config/config.ts`](config/config.ts):

- `SMMLV_2026`: Salario mínimo 2026 (COP 1,750,905)
- `AUX_TRANSP_2026`: Auxilio de transporte (COP 249,095)
- `UVT_2026`: Unidad de Valor Tributario (COP 52,374)
- Tasas de salud, pensión, ARL y retención

Modifica estos valores según tus necesidades.

## 📝 Biblioteca de Prompts

La aplicación incluye 4 plantillas de prompts exhaustivos (500+ palabras) categorizados en:

1. **Análisis Salarial**: Evaluación completa de ofertas laborales
2. **Negociación**: Redacción de contraofertas profesionales
3. **Investigación de Mercado**: Consulta de rangos salariales actualizados
4. **Perfil Profesional**: Auditoría 360° de LinkedIn/GitHub con recomendaciones accionables

Cada prompt es completamente estático, personalizable con variables y exportable a Markdown.

## � Plan de Gestión Financiera

Módulo interactivo que proyecta una estrategia de inversión basada en el ingreso neto calculado:

- **Metodología**: Basado en "Tu Verdadero Portafolio" (Liquidez, Renta Fija, Crecimiento, Oportunidades).
- **Perfiles de Riesgo**: Conservador, Moderado y Arriesgado con distribuciones porcentuales automáticas.
- **Capacidad de Ahorro**: Ajuste dinámico del porcentaje de ahorro mensual para visualizar montos reales de inversión.
- **Instrumentos Sugeridos**: Recomendaciones tácticas para cada categoría (ETFs, CDTs, Cuentas de Alto Rendimiento, etc.).

## �📄 Licencia

MIT
