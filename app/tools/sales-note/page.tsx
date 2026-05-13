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
import { SaleNoteActions } from "./components/sale-note-actions";

export default function SaleNote() {
    const { items, total, addItem, updateItem, removeItem, isHydrated, clearNote, businessName, setBusinessName } = useSaleNote();
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
        <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-8">
            {/* Navigation - Hidden on Print */}
            <header className="print:hidden px-4 lg:px-6 h-16 flex items-center border-b bg-card sticky top-0 z-50">
                <NextLink className="flex items-center justify-center text-sm font-medium" href="/tools">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Herramientas
                </NextLink>
                <div className="ml-auto flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    <span className="font-bold tracking-tighter">Nota de Venta</span>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
                <SaleNoteTicket
                    businessName={businessName}
                    setBusinessName={setBusinessName}
                    client={client}
                    setClient={setClient}
                    date={date}
                    setDate={setDate}
                    items={items}
                    total={total}
                    onEditItem={openEditItem}
                    onRemoveItem={removeItem}
                />

                <div className="hidden md:block w-full max-w-2xl mt-6">
                    <SaleNoteActions
                        onAdd={openAddItem}
                        onClear={clearNote}
                        onPrint={handlePrint}
                    />
                </div>
            </main>

            {/* Global Actions - Unified Position */}
            {/* En mobile aparecerá fijo abajo */}
            <div className="md:hidden">
                <SaleNoteActions
                    onAdd={openAddItem}
                    onClear={clearNote}
                    onPrint={handlePrint}
                />
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
