"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseCategory, CreateExpenseDto } from "@/app/types/pos";
import { apiFetch } from "@/lib/api";
import { Loader2, Calendar, Tag, FileText, DollarSign } from "lucide-react";

interface ExpenseFormProps {
    categories: ExpenseCategory[];
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ExpenseForm({ categories, onSuccess, onCancel }: ExpenseFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateExpenseDto>({
        description: "",
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        categoryId: categories[0]?.id || "",
    });

    // Actualizar categoryId cuando las categorías carguen
    useEffect(() => {
        if (!formData.categoryId && categories.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.categoryId) {
            alert("Por favor selecciona una categoría");
            return;
        }

        try {
            setLoading(true);
            await apiFetch("/Expenses", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            onSuccess();
        } catch (error: any) {
            console.error("Error creating expense:", error);
            alert(error.message || "Error al crear gasto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Descripción</Label>
                <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        required
                        placeholder="Ej. Pago de luz, Renta..."
                        className="h-14 pl-12 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary/20 transition-all font-bold"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Monto ($)</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            type="number"
                            step="0.01"
                            required
                            placeholder="0.00"
                            className="h-14 pl-12 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary/20 transition-all font-bold"
                            value={formData.amount || ""}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fecha</Label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        <Input
                            type="date"
                            required
                            className="h-14 pl-12 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary/20 transition-all font-bold block w-full appearance-none"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Categoría</Label>
                <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                    <select
                        required
                        className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary/20 transition-all font-bold appearance-none outline-none text-sm"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button 
                    type="button" 
                    variant="ghost" 
                    className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Guardar"}
                </Button>
            </div>
        </form>
    );
}
