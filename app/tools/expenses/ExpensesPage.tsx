"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { 
    Plus, 
    Wallet, 
    TrendingDown, 
    Calendar as CalendarIcon, 
    Search, 
    Filter, 
    MoreVertical,
    Trash2,
    Edit2,
    Loader2,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { apiFetch } from "@/lib/api";
import { Expense, ExpenseCategory } from "@/app/types/pos";
import Toast, { ToastType } from "@/components/Toast";
import ExpenseForm from "./components/ExpenseForm";
import Link from "next/link";

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<ExpenseCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const showToast = (message: string, type: ToastType = "success") => {
        setToast({ message, type });
    };

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await apiFetch<Expense[]>("/Expenses");
            setExpenses(data);
        } catch (error: any) {
            console.error("Error fetching expenses:", error);
            showToast(error.message || "Error al cargar gastos", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            // Tentative endpoint, backend might have it differently
            const data = await apiFetch<ExpenseCategory[]>("/categories");
            setCategories(data);
        } catch (error) {
            console.warn("Could not fetch categories, using defaults", error);
            // Default categories if fetch fails
            setCategories([
                { id: "f1a7d6e4-4c4c-4e4c-8e4c-1c4c4e4c4c4c", name: "Comida", icon: "🍎" },
                { id: "f2a7d6e4-4c4c-4e4c-8e4c-1c4c4e4c4c4c", name: "Transporte", icon: "🚗" },
                { id: "f3a7d6e4-4c4c-4e4c-8e4c-1c4c4e4c4c4c", name: "Servicios", icon: "💡" },
                { id: "f4a7d6e4-4c4c-4e4c-8e4c-1c4c4e4c4c4c", name: "Entretenimiento", icon: "🎬" },
                { id: "f5a7d6e4-4c4c-4e4c-8e4c-1c4c4e4c4c4c", name: "Otros", icon: "📦" },
            ]);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este gasto?")) return;
        
        try {
            await apiFetch(`/Expenses/${id}`, { method: "DELETE" });
            showToast("Gasto eliminado correctamente");
            setExpenses(expenses.filter((e) => e.id !== id));
        } catch (error: any) {
            showToast(error.message || "Error al eliminar gasto", "error");
        }
    };

    const handleSuccess = () => {
        setIsAddModalOpen(false);
        setEditingExpense(null);
        fetchExpenses();
    };

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const filteredExpenses = expenses.filter(e => {
        const term = searchTerm.toLowerCase();
        const descriptionMatch = e.description.toLowerCase().includes(term);
        const categoryName = e.category?.name ?? '';
        const categoryMatch = categoryName.toLowerCase().includes(term);
        return descriptionMatch || categoryMatch;
    });

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />

            <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Herramientas
                        </Link>
                        <h1 className="text-3xl font-black tracking-tighter uppercase text-slate-900">Control de Gastos</h1>
                        <p className="text-slate-500 font-medium lowercase tracking-wide">Administra tus egresos de forma eficiente</p>
                    </div>
                    
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-2xl h-14 px-6 font-black uppercase tracking-widest shadow-lg shadow-primary/20 gap-2">
                                <Plus className="h-5 w-5" /> Nuevo Gasto
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Registrar Gasto</DialogTitle>
                                <DialogDescription className="font-medium">
                                    Completa los detalles del gasto a continuación.
                                </DialogDescription>
                            </DialogHeader>
                            <ExpenseForm 
                                categories={categories} 
                                onSuccess={handleSuccess} 
                                onCancel={() => setIsAddModalOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Summary Card */}
                <Card className="bg-primary text-primary-foreground border-none shadow-2xl shadow-primary/20 rounded-[2.5rem] mb-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingDown className="h-32 w-32 rotate-12" />
                    </div>
                    <CardContent className="p-8">
                        <p className="text-sm font-black uppercase tracking-[0.2em] opacity-80 mb-2">Gasto Total del Mes</p>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                            ${totalExpenses.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </h2>
                        <div className="mt-6 flex items-center gap-2">
                            <Badge variant="outline" className="bg-white/20 border-none text-white font-bold px-3 py-1">
                                {expenses.length} Transacciones
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Filters and Search */}
                <div className="flex gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            placeholder="Buscar gastos..." 
                            className="h-14 pl-12 rounded-2xl border-none shadow-sm bg-white font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-none shadow-sm bg-white">
                        <Filter className="h-5 w-5 text-slate-600" />
                    </Button>
                </div>

                {/* Expenses List */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Historial de Gastos</h3>
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <Loader2 className="h-10 w-10 animate-spin mb-4" />
                            <p className="font-bold uppercase tracking-widest text-xs">Cargando gastos...</p>
                        </div>
                    ) : filteredExpenses.length === 0 ? (
                        <Card className="border-dashed border-2 bg-transparent rounded-[2rem] py-20">
                            <div className="flex flex-col items-center justify-center text-center px-6">
                                <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                    <Wallet className="h-8 w-8 text-slate-400" />
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-tighter">No hay gastos registrados</h4>
                                <p className="text-slate-500 text-sm max-w-[250px] mt-1 font-medium">
                                    Empieza a registrar tus egresos para llevar un mejor control.
                                </p>
                            </div>
                        </Card>
                    ) : (
                        filteredExpenses.map((expense) => (
                            <Card key={expense.id} className="group border-none shadow-sm hover:shadow-md transition-all rounded-[1.5rem] overflow-hidden">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                                        {expense.category?.icon || "📦"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 truncate uppercase text-sm">{expense.description}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                                {expense.category?.name || "Sin categoría"}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                                {new Date(expense.date).toLocaleDateString("es-MX", { day: '2-digit', month: 'short' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right mr-2">
                                        <p className="font-black text-slate-900 text-lg tracking-tighter">
                                            -${expense.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                            onClick={() => handleDelete(expense.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </main>

            <Footer />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Mobile Floating Action Button */}
            <div className="fixed bottom-6 right-6 md:hidden z-50">
                <Button 
                    className="h-16 w-16 rounded-full shadow-2xl shadow-primary/40 p-0"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus className="h-8 w-8" />
                </Button>
            </div>
        </div>
    );
}
