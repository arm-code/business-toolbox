"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ArrowLeft, Printer, Plus, Trash2, Receipt, Box } from "lucide-react";

interface Item {
    id: number;
    quantity: number;
    description: string;
    price: number;
}

export default function SaleNote() {
    const [client, setClient] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [items, setItems] = useState<Item[]>([
        { id: 1, quantity: 1, description: "", price: 0 },
    ]);

    const addItem = () => {
        setItems([
            ...items,
            { id: Date.now(), quantity: 1, description: "", price: 0 },
        ]);
    };

    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    const updateItem = (id: number, field: keyof Item, value: any) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const calculateSubtotal = () => {
        return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const total = calculateSubtotal();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation - Hidden on Print */}
            <header className="print:hidden px-4 lg:px-6 h-16 flex items-center border-b bg-card sticky top-0 z-10">
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
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Box className="h-6 w-6 text-primary" />
                                <h1 className="text-2xl font-bold tracking-tighter text-primary">BUSINESS TOOLBOX</h1>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Nota de Venta</p>
                        </div>
                        <div className="text-right w-full md:w-auto">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] uppercase text-muted-foreground font-bold">Fecha</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent text-right outline-none border-none p-0 h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Client Info */}
                    <div className="mb-8 p-4 bg-muted/30 rounded-lg">
                        <label className="text-[10px] uppercase text-muted-foreground font-bold mb-1 block">Cliente / Concepto</label>
                        <input
                            type="text"
                            placeholder="Nombre del cliente o nota adicional..."
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50"
                        />
                    </div>

                    {/* Items Table */}
                    <div className="mb-8">
                        <div className="grid grid-cols-[50px_1fr_80px_100px_40px] gap-2 border-b pb-2 mb-2 text-[10px] uppercase font-bold text-muted-foreground px-2">
                            <div>Cant.</div>
                            <div>Descripción</div>
                            <div className="text-right">Precio</div>
                            <div className="text-right">Importe</div>
                            <div className="print:hidden"></div>
                        </div>

                        <div className="space-y-2">
                            {items.map((item) => (
                                <div key={item.id} className="grid grid-cols-[50px_1fr_80px_100px_40px] gap-2 items-center px-2 py-1 hover:bg-muted/20 rounded transition-colors group">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                                        className="bg-transparent w-full text-sm outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Producto o servicio"
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                        className="bg-transparent w-full text-sm outline-none"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                                        className="bg-transparent w-full text-sm outline-none text-right"
                                    />
                                    <div className="text-sm text-right font-medium">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="print:hidden opacity-0 group-hover:opacity-100 text-destructive hover:scale-110 transition-all"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addItem}
                            className="print:hidden mt-4 flex items-center text-xs font-bold text-primary hover:underline gap-1 px-2"
                        >
                            <Plus className="h-3 w-3" />
                            Agregar Línea
                        </button>
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
                        Gracias por su preferencia • Generado por arm-solutions
                    </div>
                </div>
            </main>

            {/* Floating Action Button for Mobile / Actions */}
            <div className="fixed bottom-6 right-6 print:hidden flex flex-col gap-3">
                <button
                    onClick={handlePrint}
                    className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                    title="Imprimir nota"
                >
                    <Printer className="h-6 w-6" />
                </button>
            </div>

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
