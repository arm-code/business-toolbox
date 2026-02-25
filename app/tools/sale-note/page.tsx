"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { ArrowLeft, Printer, Plus, Trash2, Receipt, Box, X, Edit2, Trash } from "lucide-react";
import { useSaleNote } from "./hooks/use-sale-note";
import { SaleItem } from "./types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ItemModal from "./components/item-modal";
import { toast } from "sonner";
import { SaleNoteTicket } from "./components/sale-note-ticket";

export default function SaleNote() {
    const { items, total, addItem, updateItem, removeItem, isHydrated, clearNote } = useSaleNote();
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
    const saveItem = (itemToSave: SaleItem) => {


        if (itemToSave.id) {
            // Si tiene Id, es una actualización
            updateItem(itemToSave.id, itemToSave)
        } else {
            // Si no tiene Id, es un nuevo registro
            addItem(itemToSave)
        }

        setIsModalOpen(false);
        setEditingItem(null);
        toast.success('Articulo guardado correctamente.')

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
                <SaleNoteTicket
                    client={client}
                    setClient={setClient}
                    date={date}
                    setDate={setDate}
                    items={items}
                    total={total}
                    onEditItem={openEditItem}
                    onRemoveItem={removeItem}
                />
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
                    onClick={clearNote}
                    className="h-14 w-14 rounded-full bg-destructive text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/20"
                    title="Limpiar nota"
                >
                    <Trash className="h-8 w-8" />
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
                <ItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={saveItem}
                    item={editingItem}
                />
            )}
        </div>
    );
}
