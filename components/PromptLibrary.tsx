/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import type React from "react";
import { useState } from "react";
import {
	CATEGORY_INFO,
	type EnglishLevel,
	type EnglishLevelContext,
	getPromptsByCategory,
	PROMPT_TEMPLATES,
	type PromptCategory,
	type PromptTemplate,
} from "../config/prompts";

interface PromptLibraryProps {
	defaultSalary?: number;
	defaultNetoNomina?: number;
	defaultNetoPrestacion?: number;
	defaultHonorarioEquilibrio?: number;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({
	defaultSalary = 0,
	defaultNetoNomina = 0,
	defaultNetoPrestacion = 0,
	defaultHonorarioEquilibrio = 0,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const [activeCategory, setActiveCategory] =
		useState<PromptCategory>("salary");
	const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(
		null,
	);
	const [promptValues, setPromptValues] = useState<Record<string, string>>({});
	const [showPreview, setShowPreview] = useState(false);
	const [copied, setCopied] = useState(false);

	// English Level Selector State
	const [englishLevel, setEnglishLevel] = useState<EnglishLevel>("B1");
	const [technicalFocus, setTechnicalFocus] = useState(true);
	const [hasCertification, setHasCertification] = useState(false);
	const [certificationScore, setCertificationScore] = useState("");

	const categories = Object.keys(CATEGORY_INFO) as PromptCategory[];

	const handlePromptSelect = (prompt: PromptTemplate) => {
		setSelectedPrompt(prompt);
		setShowPreview(false);
		setCopied(false);

		// Pre-fill with default values
		const initialValues: Record<string, string> = {};
		prompt.variables.forEach((variable) => {
			if (variable.name === "salarioBruto") {
				initialValues[variable.name] = defaultSalary.toString();
			} else if (variable.name === "netoNomina") {
				initialValues[variable.name] = defaultNetoNomina.toString();
			} else if (variable.name === "netoPrestacion") {
				initialValues[variable.name] = defaultNetoPrestacion.toString();
			} else if (variable.name === "honorarioEquilibrio") {
				initialValues[variable.name] = defaultHonorarioEquilibrio.toString();
			} else {
				initialValues[variable.name] = "";
			}
		});
		setPromptValues(initialValues);
	};

	const handleValueChange = (variableName: string, value: string) => {
		setPromptValues((prev) => ({
			...prev,
			[variableName]: value,
		}));
	};

	const getEnglishLevelText = (): string => {
		const context: EnglishLevelContext = {
			level: englishLevel,
			technicalFocus,
			hasCertification,
			certificationScore: hasCertification ? certificationScore : undefined,
		};

		let text = `Nivel: ${context.level}`;

		if (context.technicalFocus) {
			text +=
				" (Enfoque técnico: lectura de documentación, comunicación escrita)";
		} else {
			text += " (Inglés conversacional general)";
		}

		if (context.hasCertification && context.certificationScore) {
			text += `\nCertificación: ${context.certificationScore}`;
		}

		return text;
	};

	const generatePromptText = (): string => {
		if (!selectedPrompt) return "";

		let promptText = selectedPrompt.template;

		// Replace variables
		for (const [key, value] of Object.entries(promptValues)) {
			const placeholder = `\${${key}}`;
			promptText = promptText.replaceAll(placeholder, value || `[${key}]`);
		}

		// Replace english level if present
		if (promptText.includes("${englishLevel}")) {
			promptText = promptText.replaceAll(
				"${englishLevel}",
				getEnglishLevelText(),
			);
		}

		return promptText;
	};

	const handleCopyPrompt = async () => {
		const promptText = generatePromptText();
		await navigator.clipboard.writeText(promptText);
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);
	};

	const handleExportMarkdown = () => {
		const promptText = generatePromptText();
		const blob = new Blob([promptText], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${selectedPrompt?.id || "prompt"}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const filteredPrompts = getPromptsByCategory(activeCategory);

	return (
		<div className="bg-white border-2 border-black shadow-hard p-6 mt-8">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between group"
			>
				<h3 className="text-lg font-black uppercase flex items-center gap-3">
					<i className="fa-solid fa-wand-magic-sparkles text-3xl text-neon-purple" />
					BIBLIOTECA DE PROMPTS ESTÁTICOS
				</h3>
				<div
					className={`border-2 border-black p-1 transition-transform ${isOpen ? "rotate-180 bg-black text-white" : "bg-white text-black"}`}
				>
					<i className="fa-solid fa-chevron-down" />
				</div>
			</button>

			{isOpen && (
				<div className="mt-6 animate-fadeIn space-y-6">
					{/* Info Banner */}
					<div className="bg-neon-yellow border-2 border-black p-4">
						<p className="text-xs font-bold flex items-start gap-2">
							<i className="fa-solid fa-lightbulb text-lg" />
							<span>
								<strong>SIN DEPENDENCIAS EXTERNAS:</strong> Estos prompts son
								completamente estáticos. Cópialos y úsalos en ChatGPT, Claude,
								Gemini, Perplexity, DeepResearch o cualquier servicio de IA. No
								requieren APIs ni cuentas de pago.
							</span>
						</p>
					</div>

					{/* Category Tabs */}
					<div className="flex flex-wrap gap-3 border-b-2 border-black pb-2">
						{categories.map((cat) => {
							const info = CATEGORY_INFO[cat];
							const isActive = activeCategory === cat;
							return (
								<button
									type="button"
									key={cat}
									onClick={() => {
										setActiveCategory(cat);
										setSelectedPrompt(null);
									}}
									className={`flex items-center gap-2 px-4 py-2 font-black uppercase text-xs transition-all border-2 border-black
                                        ${
																					isActive
																						? "bg-black text-white transform -translate-y-1 shadow-hard-sm"
																						: "bg-white text-black hover:bg-gray-100"
																				}`}
								>
									<i className={`fa-solid ${info.icon}`} />
									{info.label}
								</button>
							);
						})}
					</div>

					{/* Category Description */}
					<div className="bg-bg-grid border-2 border-black p-3">
						<p className="text-xs font-bold">
							{CATEGORY_INFO[activeCategory].description}
						</p>
					</div>

					{/* Prompts Grid */}
					<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
						{filteredPrompts.map((prompt) => (
							<button
								type="button"
								key={prompt.id}
								onClick={() => handlePromptSelect(prompt)}
								className={`bg-white border-2 border-black shadow-hard p-4 cursor-pointer transition-all hover:shadow-hard-lg relative
									${selectedPrompt?.id === prompt.id ? `bg-${prompt.themeColor} bg-opacity-10` : ""}`}
							>
								{/* Badge */}
								<div
									className={`absolute -top-2 -right-2 bg-${prompt.themeColor} border-2 border-black px-2 py-1 transform rotate-3`}
								>
									<span className="text-lg font-black uppercase">
										~{prompt.estimatedTokens} tokens
									</span>
								</div>

								<div className="flex items-start gap-3 mb-2">
									<div
										className={`text-2xl bg-${prompt.themeColor} border-2 border-black p-2`}
									>
										<i className={`fa-solid ${prompt.icon}`} />
									</div>
									<div className="flex-1">
										<h4 className="font-black text-sm uppercase leading-tight mb-1">
											{prompt.title}
										</h4>
										<p className="text-[10px] text-gray-600">
											{prompt.description}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap gap-1 mt-2">
									{prompt.recommendedFor.map((service) => (
										<span
											key={service}
											className="text-[9px] bg-white border border-black px-2 py-0.5 font-bold"
										>
											{service}
										</span>
									))}
								</div>
							</button>
						))}
					</div>

					{/* Selected Prompt Configuration */}
					{selectedPrompt && (
						<div className="bg-white border-4 border-black shadow-hard-lg p-6 animate-fadeIn">
							<div className="flex items-start justify-between mb-4">
								<div>
									<h4 className="text-xl font-black uppercase mb-1">
										{selectedPrompt.title}
									</h4>
									<p className="text-xs text-gray-600">
										{selectedPrompt.description}
									</p>
								</div>
								<button
									type="button"
									onClick={() => setSelectedPrompt(null)}
									className="brutal-btn bg-gray-200 px-3 py-1 text-xs"
								>
									<i className="fa-solid fa-times" />
								</button>
							</div>

							{/* Variables Form */}
							<div className="space-y-4 mb-6">
								<h5 className="text-sm font-black uppercase border-b-2 border-black pb-2">
									<i className="fa-solid fa-sliders mr-2" />
									Personaliza el Prompt
								</h5>

								{selectedPrompt.variables.map((variable) => {
									if (variable.type === "english-selector") {
										return (
											<div
												key={variable.name}
												className="bg-bg-grid border-2 border-black p-4"
											>
												<div className="flex items-center gap-2 mb-3">
													<label className="text-xs font-black uppercase" >
														{variable.label}
													</label>
													{variable.tooltip && (
														<div className="relative tooltip-container cursor-help">
															<div className="bg-neon-yellow border-2 border-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-[9px]">
																?
															</div>
															<div className="tooltip-text absolute left-0 bottom-full mb-2 w-64 bg-black text-white text-[10px] p-3 border-2 border-neon-green shadow-hard z-10 font-mono">
																{variable.tooltip}
																<div className="absolute -bottom-1.5 left-2 w-3 h-3 bg-black border-r-2 border-b-2 border-neon-green transform rotate-45" />
															</div>
														</div>
													)}
												</div>

												{/* English Level Selector */}
												<div className="space-y-3">
													<div>
														<label className="text-[10px] font-bold uppercase block mb-1">
															Nivel CEFR
														</label>
														<select
															value={englishLevel}
															onChange={(e) =>
																setEnglishLevel(e.target.value as EnglishLevel)
															}
															className="w-full brutal-input text-sm font-bold"
														>
															<option value="A1">
																A1 - Principiante (Vocabulario básico)
															</option>
															<option value="A2">
																A2 - Elemental (Frases simples)
															</option>
															<option value="B1">
																B1 - Intermedio (Conversación básica)
															</option>
															<option value="B2">
																B2 - Intermedio Alto (Comunicación fluida)
															</option>
															<option value="C1">
																C1 - Avanzado (Casi nativo)
															</option>
															<option value="C2">
																C2 - Maestría (Nativo o bilingüe)
															</option>
														</select>
													</div>

													<div className="flex items-center gap-2">
														<input
															type="checkbox"
															id="technical-focus"
															checked={technicalFocus}
															onChange={(e) =>
																setTechnicalFocus(e.target.checked)
															}
															className="w-4 h-4 border-2 border-black"
														/>
														<label
															htmlFor="technical-focus"
															className="text-[10px] font-bold"
														>
															Inglés Técnico (documentación, code reviews,
															emails)
														</label>
													</div>

													<div className="flex items-center gap-2">
														<input
															type="checkbox"
															id="has-certification"
															checked={hasCertification}
															onChange={(e) =>
																setHasCertification(e.target.checked)
															}
															className="w-4 h-4 border-2 border-black"
														/>
														<label
															htmlFor="has-certification"
															className="text-[10px] font-bold"
														>
															Tengo certificación oficial
														</label>
													</div>

													{hasCertification && (
														<input
															type="text"
															placeholder="Ej: TOEFL 95, IELTS 7.5, Cambridge C1"
															value={certificationScore}
															onChange={(e) =>
																setCertificationScore(e.target.value)
															}
															className="w-full brutal-input text-xs"
														/>
													)}

													{/* Preview del nivel */}
													<div className="bg-white border-2 border-black p-2 text-[10px] font-mono">
														<strong>Preview:</strong> {getEnglishLevelText()}
													</div>
												</div>
											</div>
										);
									}

									if (variable.type === "select") {
										return (
											<div key={variable.name}>
												<div className="flex items-center gap-2 mb-1">
													<label className="text-xs font-black uppercase">
														{variable.label}
													</label>
													{variable.tooltip && (
														<div className="relative tooltip-container cursor-help">
															<div className="bg-neon-yellow border-2 border-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-[9px]">
																?
															</div>
															<div className="tooltip-text absolute left-0 bottom-full mb-2 w-64 bg-black text-white text-[10px] p-3 border-2 border-neon-green shadow-hard z-10 font-mono">
																{variable.tooltip}
																<div className="absolute -bottom-1.5 left-2 w-3 h-3 bg-black border-r-2 border-b-2 border-neon-green transform rotate-45" />
															</div>
														</div>
													)}
												</div>
												<select
													value={promptValues[variable.name] || ""}
													onChange={(e) =>
														handleValueChange(variable.name, e.target.value)
													}
													className="w-full brutal-input text-sm"
												>
													<option value="">-- Seleccionar --</option>
													{variable.options?.map((opt) => (
														<option key={opt} value={opt}>
															{opt}
														</option>
													))}
												</select>
											</div>
										);
									}

									if (variable.type === "textarea") {
										return (
											<div key={variable.name}>
												<div className="flex items-center gap-2 mb-1">
													<label className="text-xs font-black uppercase">
														{variable.label}
													</label>
													{variable.tooltip && (
														<div className="relative tooltip-container cursor-help">
															<div className="bg-neon-yellow border-2 border-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-[9px]">
																?
															</div>
															<div className="tooltip-text absolute left-0 bottom-full mb-2 w-64 bg-black text-white text-[10px] p-3 border-2 border-neon-green shadow-hard z-10 font-mono">
																{variable.tooltip}
																<div className="absolute -bottom-1.5 left-2 w-3 h-3 bg-black border-r-2 border-b-2 border-neon-green transform rotate-45" />
															</div>
														</div>
													)}
												</div>
												<textarea
													value={promptValues[variable.name] || ""}
													onChange={(e) =>
														handleValueChange(variable.name, e.target.value)
													}
													placeholder={variable.placeholder}
													className="w-full brutal-input text-xs font-mono min-h-32"
												/>
												<p className="text-[9px] text-gray-500 mt-1">
													{(promptValues[variable.name] || "").length}{" "}
													caracteres
												</p>
											</div>
										);
									}

									// number or text
									return (
										<div key={variable.name}>
											<div className="flex items-center gap-2 mb-1">
												<label className="text-xs font-black uppercase">
													{variable.label}
												</label>
												{variable.tooltip && (
													<div className="relative tooltip-container cursor-help">
														<div className="bg-neon-yellow border-2 border-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-[9px]">
															?
														</div>
														<div className="tooltip-text absolute left-0 bottom-full mb-2 w-64 bg-black text-white text-[10px] p-3 border-2 border-neon-green shadow-hard z-10 font-mono">
															{variable.tooltip}
															<div className="absolute -bottom-1.5 left-2 w-3 h-3 bg-black border-r-2 border-b-2 border-neon-green transform rotate-45" />
														</div>
													</div>
												)}
											</div>
											<input
												type={variable.type}
												value={promptValues[variable.name] || ""}
												onChange={(e) =>
													handleValueChange(variable.name, e.target.value)
												}
												placeholder={variable.placeholder}
												className="w-full brutal-input text-sm"
											/>
										</div>
									);
								})}
							</div>

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									onClick={() => setShowPreview(!showPreview)}
									className="brutal-btn bg-neon-blue px-6 py-3 text-sm font-black uppercase flex items-center gap-2"
								>
									<i
										className={`fa-solid ${showPreview ? "fa-eye-slash" : "fa-eye"}`}
									/>
									{showPreview ? "Ocultar" : "Ver"} Preview
								</button>

								<button
									type="button"
									onClick={handleCopyPrompt}
									className={`brutal-btn px-6 py-3 text-sm font-black uppercase flex items-center gap-2 transition-colors ${
										copied
											? "bg-neon-green text-black"
											: "bg-neon-yellow hover:bg-yellow-300"
									}`}
								>
									<i
										className={`fa-solid ${copied ? "fa-check" : "fa-clipboard"}`}
									/>
									{copied ? "¡Copiado!" : "Copiar Prompt"}
								</button>

								<button
									type="button"
									onClick={handleExportMarkdown}
									className="brutal-btn bg-neon-purple text-white px-6 py-3 text-sm font-black uppercase flex items-center gap-2"
								>
									<i className="fa-solid fa-download" />
									Exportar .md
								</button>
							</div>

							{/* Preview Section */}
							{showPreview && (
								<div className="mt-6 bg-gray-900 border-4 border-black p-6 animate-fadeIn">
									<div className="flex items-center justify-between mb-3">
										<h5 className="text-sm font-black uppercase text-neon-green">
											<i className="fa-solid fa-code mr-2" />
											Preview del Prompt
										</h5>
										<span className="text-[10px] text-gray-400 font-mono">
											{generatePromptText().length} caracteres
										</span>
									</div>
									<pre className="text-[11px] text-gray-100 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
										{generatePromptText()}
									</pre>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default PromptLibrary;
