"use client";

import { Box } from "lucide-react";
import { Edit2, Trash2 } from "lucide-react";
import { SaleItem } from "../types";
import Link from "next/link";

interface SaleNoteTicketProps {
    client: string;
    setClient: (val: string) => void;
    date: string;
    setDate: (val: string) => void;
    items: SaleItem[];
    total: number;
    onEditItem: (item: SaleItem) => void;
    onRemoveItem: (id: string) => void;
}

export function SaleNoteTicket({
    client,
    setClient,
    date,
    setDate,
    items,
    total,
    onEditItem,
    onRemoveItem,
}: SaleNoteTicketProps) {
    return (
        <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-sm rounded-md p-6 md:p-10 tansition-all print: border-none print:shadow-none">

            {/* Header of Note */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Box className="h-5 w-5 text-slate-950" />
                        <h1 className="text-xl font-bold tracking-tight text-slate-950 uppercase">
                            BUSINESS TOOLBOX
                        </h1>
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                        Nota de Venta / Comprobante
                    </p>
                </div>


                <div className="flex flex-col gap-1.5 w-full md:w-auto bg-slate-50 p-3 rounded-sm border border-slate-100">
                    <label className="text-[9px] uppercase text-slate-500 font-bold leading-none">
                        Fecha de emisión
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent text-sm outline-none border-none p-0 h-auto font-semibold text-slate-950"
                    />
                </div>

            </div>

            {/* Client Info */}
            <div className="mb-10 p-4 border-l-2 border-slate-500 bg-slate-50/50">
                <label className="text-[9px] uppercase text-slate-500 font-bold mb-1.5 block tracking-wider">
                    Cliente / Concepto
                </label>
                <input
                    type="text"
                    placeholder="Nombre del cliente o referencia..."
                    value={client}
                    onChange={(e) => setClient(e.target.value.toUpperCase())}
                    className="w-full bg-transparent border-none outline-none text-sm font-bold text-slate-950 placeholder:text-slate-300 uppercase"
                />
            </div>

            {/* Items Section (Web) */}
            <div className="print:hidden mb-10 space-y-3">
                <label className="text-[10px] uppercase text-slate-400 font-bold px-1 tracking-widest">
                    Artículos ({items.length})
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col p-4 border border-slate-200 rounded-md bg-white shadow-sm hover:border-slate-400 transition-all space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-950 uppercase tracking-tight truncate max-w-[150px]">
                                        {item.description || "Sin descripción"}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {item.quantity} x ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-950">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Botones siempre visibles con estilo Slate */}
                            <div className="flex gap-2 pt-3 border-t border-slate-100">
                                <button
                                    onClick={() => onEditItem(item)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                                >
                                    <Edit2 className="h-3 w-3" /> Editar
                                </button>
                                <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors border border-red-100"
                                >
                                    <Trash2 className="h-3 w-3" /> Quitar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Items Section - Print View (Table) */}
            <div className="hidden print:block mb-8">
                <div className="grid grid-cols-[50px_1fr_80px_100px] gap-2 border-b-2 border-primary/20 pb-2 mb-2 text-[10px] uppercase font-bold text-muted-foreground px-2">
                    <div>Cant.</div>
                    <div>Descripción</div>
                    <div className="text-right">Precio</div>
                    <div className="text-right">Importe</div>
                </div>
                <div className="space-y-1">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-[50px_1fr_80px_100px] gap-2 items-center px-2 py-1 border-b border-muted/20"
                        >
                            <div className="text-sm">{item.quantity}</div>
                            <div className="text-sm">{item.description}</div>
                            <div className="text-sm text-right font-medium">
                                ${item.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-right font-bold text-primary">
                                ${(item.quantity * item.price).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Totals */}
            <div className="mt-6 flex flex-col items-end border-t-2 border-primary/20 pt-4">
                <div className="w-full sm:w-64 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground font-medium">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-primary">
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-[10px] text-muted-foreground border-t pt-4">
                Gracias por su preferencia • Generado por business-toolbox, una herramienta creada por <Link href="https://www.arm-solutions.com.mx/">ARM Solutions</Link>. Puedes hacer uso de esta herramienta de forma gratuita en cualquier momento, visítanos en:
                <Link href="https://www.bt.arm-solutions.com.mx/">bt.arm-solutions.com.mx</Link>
            </div>

        </div>
    );
}