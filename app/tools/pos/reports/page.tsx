"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import {
    ArrowLeft,
    BarChart3,
    Banknote,
    CreditCard,
    Clock,
    TrendingUp,
    TrendingDown,
    Calendar,
    Loader2,
    DollarSign
} from "lucide-react";
import { apiFetch } from "../../../lib/api";
import { CashClosingReport, NetProfitReport } from "../../../types/pos";

export default function ReportsPage() {
    const [corte, setCorte] = useState<CashClosingReport | null>(null);
    const [profit, setProfit] = useState<NetProfitReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        fetchReports();
    }, [date]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const [cData, pData] = await Promise.all([
                apiFetch<CashClosingReport>(`/reports/corte-caja?date=${date}`),
                apiFetch<NetProfitReport>(`/reports/net-profit?startDate=${date}&endDate=${date}`)
            ]);
            setCorte(cData);
            setProfit(pData);
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-card sticky top-0 z-50">
                <NextLink className="flex items-center justify-center text-sm font-medium" href="/tools/pos">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al POS
                </NextLink>
                <div className="ml-auto flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span className="font-bold tracking-tighter uppercase">Reportes de Negocio</span>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
                {/* Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-3xl border shadow-sm">
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter uppercase text-primary">Resumen de Operaciones</h1>
                        <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest text-[10px]">Cierre del día y rentabilidad</p>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-2xl border">
                        <Calendar className="h-4 w-4 text-primary ml-2" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-transparent border-none outline-none font-bold text-sm h-8 uppercase"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-sm font-black uppercase tracking-widest opacity-50">Calculando reportes...</p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Cash Closing */}
                            <div className="bg-white border rounded-[2.5rem] p-8 shadow-sm">
                                <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                                    <Banknote className="h-4 w-4" /> Corte de Caja
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase">Total Ventas</p>
                                            <p className="text-4xl font-black text-primary tracking-tighter">${Number(corte?.totalSales).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-t pt-6">
                                        <div className="bg-green-50 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-green-700 uppercase mb-1">Efectivo</p>
                                            <p className="text-sm font-black text-green-900">${Number(corte?.cashSales).toFixed(2)}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-blue-700 uppercase mb-1">Tarjeta</p>
                                            <p className="text-sm font-black text-blue-900">${Number(corte?.cardSales).toFixed(2)}</p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-orange-700 uppercase mb-1">Crédito</p>
                                            <p className="text-sm font-black text-orange-900">${Number(corte?.creditSales).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Net Profit */}
                            <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <TrendingUp className="h-32 w-32" />
                                </div>
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary-foreground/70 mb-6 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> Rentabilidad Neta
                                </h2>
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <p className="text-[10px] font-black text-primary-foreground/70 uppercase">Ganancia Limpia</p>
                                        <p className="text-5xl font-black tracking-tighter">${Number(profit?.netProfit).toFixed(2)}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                                        <div>
                                            <p className="text-[9px] font-black text-primary-foreground/70 uppercase mb-1">Ingresos Totales</p>
                                            <p className="text-lg font-black">${Number(profit?.totalRevenue).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-primary-foreground/70 uppercase mb-1 flex items-center gap-1">
                                                <TrendingDown className="h-3 w-3" /> Costos
                                            </p>
                                            <p className="text-lg font-black">${Number(profit?.totalCost).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown / Insights */}
                        <div className="bg-violet-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                            <div className="h-20 w-20 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
                                <BarChart3 className="h-10 w-10 text-violet-200" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase mb-2">Análisis de Operación</h3>
                                <p className="text-violet-200 text-sm leading-relaxed max-w-xl">
                                    Hoy has procesado un total de <span className="text-white font-bold">${Number(corte?.totalSales).toFixed(2)}</span> en ventas brutas.
                                    La rentabilidad neta del periodo seleccionado es de <span className="text-white font-bold">${Number(profit?.netProfit).toFixed(2)}</span>,
                                    lo que representa un margen saludable basado en tus costos de adquisición.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
