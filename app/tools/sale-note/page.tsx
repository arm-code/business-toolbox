"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { ArrowLeft, Printer, Plus, Trash2, Receipt, Box, X, Edit2 } from "lucide-react";
import { useSaleNote } from "./hooks/use-sale-note";
import { SaleItem } from "./types";

export default function SaleNote() {
    const { items, total, addItem, updateItem, removeItem, isHydrated } = useSaleNote();
    const [client, setClient] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SaleItem | null>(null);

    // Logica para abrir el modal de agregar o editar artículo
    const openAddItem = () => {
        setEditingItem({ id: "", quantity: 1, description: "", price: 0 });
        setIsModalOpen(true);
    };

    const openEditItem = (item: SaleItem) => {
        setEditingItem({ ...item });
        setIsModalOpen(true);
    };

    // Puente entre el modal y el hook para guardar o actualizar un artículo
    const saveItem = () => {
        if (!editingItem) return;

        if (editingItem.id) {
            // Si tiene Id, es una actualización
            updateItem(editingItem.id, editingItem)
        } else {
            // Si no tiene Id, es un nuevo registro
            addItem(editingItem)
        }

        setIsModalOpen(false);
        setEditingItem(null);

    }

    const handlePrint = () => {
        window.print();
    };

    if (!isHydrated && items.length === 0) {
        return (
            <div className="flex justify-center p-10">
                Cargando...
            </div>)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation - Hidden on Print */}
            <header className="print:hidden px-4 lg:px-6 h-16 flex items-center border-b bg-card sticky top-0 z-50">
                <NextLink className="flex items-center justify-center text-sm font-medium" href="/catalog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Catálogo
                </NextLink>
                <div className="ml-auto flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    <span className="font-bold tracking-tighter">Nota de Venta</span>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-2xl bg-white print:shadow-none print:border-none border shadow-sm rounded-xl p-6 md:p-10 transition-all">

                    {/* Header of Note */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div className="">
                            <div className="flex items-center gap-2 mb-2">
                                <Box className="h-6 w-6 text-primary" />
                                <h1 className="text-2xl font-bold tracking-tighter text-primary">BUSINESS TOOLBOX</h1>
                            </div>
                            <p className="text-xs text-violet-900 uppercase font-bold text-center">Nota de Venta</p>
                        </div>
                        <div className="text-right w-full md:w-auto bg-violet-50 p-2 rounded-lg">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] uppercase text-muted-foreground font-bold">Fecha</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent text-right outline-none border-none p-0 h-auto font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Client Info */}
                    <div className="mb-8 p-4 bg-violet-50 rounded-lg">
                        <label className="text-[10px] uppercase text-muted-foreground font-bold mb-1 block">Cliente / Concepto</label>
                        <input
                            type="text"
                            placeholder="Nombre del cliente o nota adicional..."
                            value={client}
                            onChange={(e) => setClient(e.target.value.toUpperCase())}
                            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 font-medium"
                        />
                    </div>

                    {/* Items Section - Web View (Unified Cards) */}
                    <div className="print:hidden mb-8">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <label className="text-[10px] uppercase text-muted-foreground font-bold block">Artículos</label>
                            <span className="text-[10px] text-muted-foreground font-medium">{items.length} {items.length === 1 ? 'ítem' : 'ítems'}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 border rounded-xl bg-card shadow-sm hover:border-primary/30 transition-all space-y-3 relative group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="text-sm font-bold overflow-clip truncate max-w-[150px] text-ellipsis">{item.description.toUpperCase() || "Sin descripción"}</p>
                                            <p className="text-xs text-muted-foreground">{item.quantity} x ${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-primary">${(item.quantity * item.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2 border-t">
                                        <button
                                            onClick={() => openEditItem(item)}
                                            className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase bg-primary/5 text-primary rounded-lg hover:bg-primary/10 transition-colors"
                                        >
                                            <Edit2 className="h-3 w-3" /> Editar
                                        </button>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase bg-destructive/5 text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
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
                                <div key={item.id} className="grid grid-cols-[50px_1fr_80px_100px] gap-2 items-center px-2 py-1 border-b border-muted/20">
                                    <div className="text-sm">{item.quantity}</div>
                                    <div className="text-sm">{item.description}</div>
                                    <div className="text-sm text-right font-medium">${item.price.toFixed(2)}</div>
                                    <div className="text-sm text-right font-bold text-primary">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end pt-4 border-t-2 border-primary/20">
                        <div className="w-full max-w-[200px] space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-medium">Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold text-primary">
                                <span>TOTAL</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center text-[10px] text-muted-foreground border-t pt-4">
                        Gracias por su preferencia • Generado por business-toolbox
                    </div>
                </div>
            </main>

            {/* Global Actions - Unified Position */}
            <div className="fixed bottom-6 right-6 print:hidden flex flex-col gap-3 z-40">
                <button
                    onClick={openAddItem}
                    className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/20"
                    title="Agregar artículo"
                >
                    <Plus className="h-8 w-8" />
                </button>
                <button
                    onClick={handlePrint}
                    className="h-14 w-14 rounded-full bg-white text-primary border-2 border-primary shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/20"
                    title="Imprimir nota"
                >
                    <Printer className="h-6 w-6" />
                </button>
            </div>

            {/* Unified Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-100 animate-in fade-in duration-200 backdrop-blur-sm">
                    <div className="bg-background w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold tracking-tighter uppercase">{editingItem && items.find(i => i.id === editingItem.id) ? "Editar Artículo" : "Agregar Artículo"}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block px-1">Descripción</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del producto o servicio"
                                    value={editingItem?.description || ""}
                                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                                    className="w-full bg-muted/30 border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block px-1">Cantidad</label>
                                    <input
                                        type="number"
                                        value={editingItem?.quantity || ""}
                                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, quantity: parseFloat(e.target.value) || 0 } : null)}
                                        className="w-full bg-muted/30 border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block px-1">Precio Unitario</label>
                                    <input
                                        type="number"
                                        value={editingItem?.price || ""}
                                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                                        className="w-full bg-muted/30 border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={saveItem}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl hover:opacity-90 active:scale-[0.98] transition-all mt-6"
                            >
                                {editingItem && items.find(i => i.id === editingItem.id) ? "Actualizar Artículo" : "Guardar Artículo"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                        padding: 0 !important;
                    }
                    .min-h-screen {
                        min-height: auto !important;
                    }
                    main {
                        padding: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
