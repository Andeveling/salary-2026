import type React from "react";
import { useCallback, useEffect, useState } from "react";
import AuthorCard from "./components/AuthorCard";
import FinancialPlan from "./components/FinancialPlan";
import PromptLibrary from "./components/PromptLibrary";
import ResultCard from "./components/ResultCard";
import {
	ArlLevel,
	AUX_TRANSP_2026,
	type CalculatorOptions,
	defaultOptions,
	SMMLV_2026,
} from "./config/config";
import {
	type CalculationResult,
	calculateSalary,
	formatCurrency,
} from "./utils/salary";
import "./globals.css";

const App: React.FC = () => {
	// State
	const [amount, setAmount] = useState<number>(2_500_000);
	const [result, setResult] = useState<CalculationResult | null>(null);
	const [options, setOptions] = useState<CalculatorOptions>(defaultOptions);
	const [showSettings, setShowSettings] = useState(false);

	const handleCalculate = useCallback(() => {
		const res = calculateSalary(amount, options);
		setResult(res);
	}, [amount, options]);

	useEffect(() => {
		handleCalculate();
	}, [handleCalculate]);

	// Handle Option Changes
	const updateOption = (
		section: "nomina" | "prestacion",
		key: string,
		value: number,
	) => {
		setOptions((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				[key]: value,
			},
		}));
	};

	return (
		<div className="min-h-screen p-4 md:p-8 font-mono text-black">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<header className="mb-12 border-b-4 border-black pb-8">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
						<div>
							<h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase mb-2">
								SALARIO{" "}
								<span className="text-neon-green bg-black px-2">IT_2026</span>
							</h1>
							<p className="font-bold text-sm bg-white border-2 border-black inline-block px-3 py-1 shadow-hard-sm">
								DECRETO 1469 DE 2025 {"// "} RES. DIAN 2026
							</p>
						</div>
						<div className="flex gap-4">
							<div className="bg-white px-4 py-2 border-2 border-black shadow-hard-sm">
								<span className="block text-base uppercase font-bold">
									SMMLV 2026
								</span>
								<span className="font-black text-lg">
									{formatCurrency(SMMLV_2026)}
								</span>
							</div>
							<div className="bg-white px-4 py-2 border-2 border-black shadow-hard-sm">
								<span className="block text-base uppercase font-bold">
									Aux. Transp
								</span>
								<span className="font-black text-lg">
									{formatCurrency(AUX_TRANSP_2026)}
								</span>
							</div>
						</div>
					</div>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Left Panel: Inputs & Config */}
					<div className="lg:col-span-1 md:row-span-2 lg:row-span-2 flex flex-col gap-8 h-full">
						<div className="bg-white border-2 border-black shadow-hard p-6 relative grow flex flex-col">
							<div className="absolute -top-3 -right-3 bg-neon-purple text-white px-3 py-1 border-2 border-black font-black text-lg uppercase transform rotate-3">
								Input Principal
							</div>

							<label
								htmlFor="main-salary-input"
								className="block text-sm font-black uppercase mb-4"
							>
								Salario Bruto / Honorario
							</label>
							<div className="relative mb-6">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl">
									$
								</span>
								<input
									id="main-salary-input"
									type="number"
									value={amount}
									onChange={(e) => setAmount(Number(e.target.value))}
									className="w-full pl-8 pr-4 py-4 brutal-input text-2xl font-black"
								/>
							</div>

							{/* Toggle Advanced Settings */}
							<button
								type="button"
								onClick={() => setShowSettings(!showSettings)}
								className={`w-full brutal-btn py-2 px-4 flex items-center justify-between font-bold uppercase text-xs ${showSettings ? "bg-black text-white" : "bg-white"}`}
							>
								<span>
									<i className="fa-solid fa-sliders mr-2" />
									Configuración Avanzada
								</span>
								<i
									className={`fa-solid fa-chevron-down transition-transform ${showSettings ? "rotate-180" : ""}`}
								/>
							</button>

							{/* Settings Panel */}
							{showSettings && (
								<div className="mt-4 p-4 border-2 border-black bg-bg-grid animate-fadeIn space-y-4">
									<div>
										<label
											htmlFor="arl-select"
											className="text-[10px] font-black uppercase block mb-1"
										>
											Riesgo ARL
										</label>
										<select
											id="arl-select"
											value={options.prestacion.arlRate}
											onChange={(e) =>
												updateOption(
													"prestacion",
													"arlRate",
													Number(e.target.value),
												)
											}
											className="w-full p-2 border-2 border-black text-xs font-bold"
										>
											<option value={ArlLevel.I}>Riesgo I (0.522%)</option>
											<option value={ArlLevel.II}>Riesgo II (1.044%)</option>
											<option value={ArlLevel.III}>Riesgo III (2.436%)</option>
										</select>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="ibc-range"
												className="text-[10px] font-bold block"
											>
												IBC % ({Math.round(options.prestacion.ibcRate * 100)}%)
											</label>
											<input
												id="ibc-range"
												type="range"
												min="0.4"
												max="1"
												step="0.05"
												value={options.prestacion.ibcRate}
												onChange={(e) =>
													updateOption(
														"prestacion",
														"ibcRate",
														Number(e.target.value),
													)
												}
												className="range-slider"
											/>
										</div>
										<div>
											<label
												htmlFor="health-rate-input"
												className="text-[10px] font-bold block"
											>
												Salud % (
												{Math.round(options.prestacion.healthRate * 1000) / 10}
												%)
											</label>
											<input
												id="health-rate-input"
												type="number"
												step="0.001"
												value={options.prestacion.healthRate}
												onChange={(e) =>
													updateOption(
														"prestacion",
														"healthRate",
														Number(e.target.value),
													)
												}
												className="w-full border-2 border-black p-1 text-xs"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
						<AuthorCard />
					</div>

					{/* Results */}
					{result && (
						<>
							<div className="col-span-1 row-span-2">
								<ResultCard
									title="NÓMINA"
									icon="fa-briefcase"
									themeColor="nomina"
									netMonthly={formatCurrency(result.nomina.netMonthly)}
									annualTotal={formatCurrency(result.nomina.totalAnnual)}
									details={[
										{
											label: "Salud (4%)",
											value: `-${formatCurrency(result.nomina.salud)}`,
											isDeduction: true,
										},
										{
											label: "Pensión (4%)",
											value: `-${formatCurrency(result.nomina.pension)}`,
											isDeduction: true,
										},
										{
											label: "FSP",
											value:
												result.nomina.fsp > 0
													? `-${formatCurrency(result.nomina.fsp)}`
													: "$0",
											isDeduction: result.nomina.fsp > 0,
										},
										{
											label: "Primas",
											value: `+${formatCurrency(result.nomina.prima)}`,
											isBonus: true,
										},
										{
											label: "Cesantías + Int.",
											value: `+${formatCurrency(result.nomina.cesantias + result.nomina.interesesCesantias)}`,
											isBonus: true,
										},
									]}
								/>
							</div>
							<div className="col-span-1 row-span-2">
								<ResultCard
									title="P. SERVICIOS"
									icon="fa-file-invoice-dollar"
									themeColor="honorarios"
									netMonthly={formatCurrency(result.prestacion.netMonthly)}
									annualTotal={formatCurrency(result.prestacion.totalAnnual)}
									details={[
										{
											label: `Salud (${options.prestacion.healthRate * 100}%)`,
											value: `-${formatCurrency(result.prestacion.salud)}`,
											isDeduction: true,
										},
										{
											label: `Pensión (${options.prestacion.pensionRate * 100}%)`,
											value: `-${formatCurrency(result.prestacion.pension)}`,
											isDeduction: true,
										},
										{
											label: "ARL + FSP",
											value: `-${formatCurrency(result.prestacion.arl + result.prestacion.fsp)}`,
											isDeduction: true,
										},
										{
											label: "ReteFuente",
											value: `-${formatCurrency(result.prestacion.reteFuente)}`,
											isDeduction: true,
										},
										{
											label: "Base IBC",
											value: `${formatCurrency(result.prestacion.ibcBase)}`,
											isDeduction: false,
										},
									]}
								/>
							</div>

							{/* Verdict Banner */}
							<div className="md:col-span-3 bg-black border-2 border-white shadow-hard-lg p-8 text-white relative flex flex-col justify-center">
								<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
									<div className="text-center md:text-left">
										<h3 className="text-neon-green font-black uppercase tracking-widest text-sm mb-2">
											Veredicto_Final
										</h3>
										<p className="text-xl md:text-2xl font-display uppercase leading-none">
											Para igualar la nómina de{" "}
											<span className="text-neon-blue">
												{formatCurrency(amount)}
											</span>
											, cobra:
										</p>
									</div>
									<div className="bg-white border-4 border-neon-purple p-4 transform rotate-2 min-w-60 text-center shadow-[4px_4px_0px_0px_#D946EF]">
										<span className="block text-[10px] text-black uppercase font-black mb-1">
											Honorario Objetivo
										</span>
										<span className="text-3xl font-black text-black font-mono">
											{formatCurrency(result.targetHonorario)}
										</span>
									</div>
								</div>
								{/* Decoration */}
								<div className="absolute top-0 right-0 w-16 h-16 bg-neon-green border-l-2 border-b-2 border-black" />
							</div>
						</>
					)}


					{/* Biblioteca de Prompts Estáticos */}
					<div className="col-span-full">
						<PromptLibrary
							defaultSalary={amount}
							defaultNetoNomina={result?.nomina.netMonthly || 0}
							defaultNetoPrestacion={result?.prestacion.netMonthly || 0}
							defaultHonorarioEquilibrio={result?.targetHonorario || 0}
						/>
					</div>


					{/* Financial Plan */}
					{result && (
						<div className="col-span-full">
							<FinancialPlan netIncome={result.nomina.netMonthly} />
						</div>
					)}

				</div>
			</div>
		</div>
	);
};

export default App;