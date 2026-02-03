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
    DollarSign,
    History,
    Package,
    CheckCircle2,
    X,
    Plus
} from "lucide-react";
import { apiFetch } from "../../../lib/api";
import { CashClosingReport, NetProfitReport, SaleHistoryItem } from "../../../types/pos";

export default function ReportsPage() {
    const [corte, setCorte] = useState<CashClosingReport | null>(null);
    const [profit, setProfit] = useState<NetProfitReport | null>(null);
    const [history, setHistory] = useState<SaleHistoryItem[]>([]);
    const [selectedSale, setSelectedSale] = useState<SaleHistoryItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        fetchReports();
    }, [date]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const [cData, pData, hData] = await Promise.all([
                apiFetch<CashClosingReport>(`/reports/corte-caja?date=${date}`),
                apiFetch<NetProfitReport>(`/reports/net-profit?startDate=${date}&endDate=${date}`),
                apiFetch<SaleHistoryItem[]>(`/sales/history?date=${date}`)
            ]);
            setCorte(cData);
            setProfit(pData);
            setHistory(hData);
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
                                    <Banknote className="h-4 w-4" /> Corte de Caja del Día
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase">Dinero Total Recibido</p>
                                            <p className="text-4xl font-black text-primary tracking-tighter">${Number(corte?.totalIncome || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase">Ventas Realizadas</p>
                                            <p className="text-xl font-black text-primary">{corte?.totalSales || 0}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-t pt-6">
                                        <div className="bg-green-50 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-green-700 uppercase mb-1">Efectivo</p>
                                            <p className="text-sm font-black text-green-900">${Number(corte?.details?.['CASH'] || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-blue-700 uppercase mb-1">Tarjeta</p>
                                            <p className="text-sm font-black text-blue-900">${Number(corte?.details?.['CARD'] || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-orange-700 uppercase mb-1">Crédito (Fiao)</p>
                                            <p className="text-sm font-black text-orange-900">${Number(corte?.details?.['CREDIT'] || 0).toFixed(2)}</p>
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
                                    <TrendingUp className="h-4 w-4" /> Rentabilidad del Periodo
                                </h2>
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <p className="text-[10px] font-black text-primary-foreground/70 uppercase">Ganancia Real (Limpia)</p>
                                        <p className="text-5xl font-black tracking-tighter">${Number(profit?.netProfit || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                                        <div>
                                            <p className="text-[9px] font-black text-primary-foreground/70 uppercase mb-1">Ventas Totales</p>
                                            <p className="text-lg font-black">${Number(profit?.revenue || 0).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-primary-foreground/70 uppercase mb-1 flex items-center gap-1">
                                                <TrendingDown className="h-3 w-3" /> Costo Mercancía
                                            </p>
                                            <p className="text-lg font-black">${Number(profit?.cost || 0).toFixed(2)}</p>
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
                                    Hoy has procesado un total de <span className="text-white font-bold">${Number(corte?.totalIncome || 0).toFixed(2)}</span> en ventas brutas.
                                    La ganancia real después de costos es de <span className="text-white font-bold">${Number(profit?.netProfit || 0).toFixed(2)}</span>. ¡Buen trabajo administrando tu negocio!
                                </p>
                            </div>
                        </div>

                        {/* Sales History List */}
                        <div className="bg-white border rounded-[2.5rem] p-8 shadow-sm">
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center justify-between">
                                <span className="flex items-center gap-2"><History className="h-4 w-4" /> Historial de Operaciones</span>
                                <span className="text-[10px] bg-muted px-2 py-1 rounded-full">{history.length} TRANSACCIONES</span>
                            </h2>
                            <div className="space-y-4">
                                {history.length === 0 ? (
                                    <div className="text-center py-10 opacity-30">
                                        <Package className="h-10 w-10 mx-auto mb-2" />
                                        <p className="text-sm font-black uppercase tracking-widest">Sin operaciones registradas</p>
                                    </div>
                                ) : (
                                    history.map((sale) => (
                                        <button
                                            key={sale.id}
                                            onClick={() => setSelectedSale(sale)}
                                            className="w-full text-left flex flex-col md:flex-row md:items-center justify-between p-5 bg-muted/20 rounded-[2rem] border-2 border-transparent hover:border-primary/20 hover:bg-muted/30 transition-all gap-4 group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border">
                                                    <CheckCircle2 className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-black uppercase leading-none">Venta #{sale.id.slice(0, 8).toUpperCase()}</p>
                                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${sale.paymentMethod.key === 'CASH' ? 'bg-green-100 text-green-700' :
                                                            sale.paymentMethod.key === 'CARD' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                                            }`}>
                                                            {sale.paymentMethod.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground font-bold mt-1">
                                                        {new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {sale.items.length} {sale.items.length === 1 ? 'Producto' : 'Productos'}
                                                        {sale.customer && ` • Cliente: ${sale.customer.name}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex items-center gap-3">
                                                <p className="text-xl font-black text-primary tracking-tighter">${Number(sale.total).toFixed(2)}</p>
                                                <div className="hidden group-hover:block p-2 bg-primary text-white rounded-full transition-all">
                                                    <Plus className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Sale Details Modal */}
            {selectedSale && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <button onClick={() => setSelectedSale(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-3 bg-primary/10 rounded-2xl">
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter uppercase text-primary">Detalle de Venta</h2>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Op: #{selectedSale.id.slice(0, 8).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-muted/30 rounded-3xl p-6 border group">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                                    <span className="text-xs font-black uppercase text-muted-foreground">Información</span>
                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${selectedSale.paymentMethod.key === 'CASH' ? 'bg-green-100 text-green-700' :
                                        selectedSale.paymentMethod.key === 'CARD' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {selectedSale.paymentMethod.name}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Fecha y Hora</p>
                                        <p className="text-sm font-bold uppercase">{new Date(selectedSale.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Cliente</p>
                                        <p className="text-sm font-bold uppercase">{selectedSale.customer?.name || 'PUBLICO GENERAL'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto px-1 scrollbar-hide">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Productos Vendidos ({selectedSale.items.length})</p>
                                {selectedSale.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm">
                                        <div className="flex-1">
                                            <p className="text-xs font-black uppercase leading-none mb-1">{item.product.name}</p>
                                            <p className="text-[9px] text-muted-foreground font-bold">{Number(item.quantity)} x ${Number(item.price).toFixed(2)} / {item.product.unit.toLowerCase()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-primary">${Number(item.subtotal).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-primary text-primary-foreground rounded-3xl p-6 flex justify-between items-center shadow-xl shadow-primary/20">
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-70 tracking-widest leading-none">Total Pagado</p>
                                    <p className="text-3xl font-black tracking-tighter mt-1">${Number(selectedSale.total).toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedSale(null)}
                                    className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl font-black uppercase text-xs transition-all"
                                >
                                    Cerrar Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
