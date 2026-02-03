"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import {
    ArrowLeft,
    Plus,
    Edit2,
    Trash2,
    Package,
    Tag,
    BarChart3,
    Search,
    Loader2,
    X,
    FolderPlus
} from "lucide-react";
import { apiFetch } from "../../../lib/api";
import { Product, Category } from "../../../types/pos";

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [pData, cData] = await Promise.all([
                apiFetch<Product[]>("/inventory/products"),
                apiFetch<Category[]>("/inventory/categories")
            ]);
            setProducts(pData);
            setCategories(cData);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingProduct?.id ? 'PATCH' : 'POST';
            const endpoint = editingProduct?.id ? `/inventory/products/${editingProduct.id}` : '/inventory/products';

            await apiFetch(endpoint, {
                method,
                body: JSON.stringify(editingProduct)
            });

            setIsProductModalOpen(false);
            setEditingProduct(null);
            fetchData();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-card sticky top-0 z-50">
                <NextLink className="flex items-center justify-center text-sm font-medium" href="/tools/pos">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al POS
                </NextLink>
                <div className="ml-auto flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-bold tracking-tighter uppercase shrink-0">Gestión de Inventario</span>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                {/* Stats & Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border rounded-3xl p-6 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Total Productos</p>
                            <p className="text-2xl font-black tracking-tighter">{products.length}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => { setEditingProduct({ unit: 'UNIDAD' }); setIsProductModalOpen(true); }}
                        className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <Plus className="h-6 w-6" />
                        <span className="font-black uppercase tracking-widest text-sm">Nuevo Producto</span>
                    </button>

                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="bg-white border border-primary text-primary rounded-3xl p-6 shadow-sm flex items-center justify-center gap-3 hover:bg-primary/5 active:scale-95 transition-all"
                    >
                        <FolderPlus className="h-6 w-6" />
                        <span className="font-black uppercase tracking-widest text-sm">Categorías</span>
                    </button>
                </div>

                {/* Search & Table */}
                <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b flex flex-col md:flex-row gap-4 justify-between items-center">
                        <h2 className="font-black tracking-tighter uppercase text-xl">Lista de Existencias</h2>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Filtrar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-muted/30 border rounded-xl py-2 pl-10 pr-4 text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30 text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4">Producto</th>
                                    <th className="px-6 py-4">Coste</th>
                                    <th className="px-6 py-4">Venta</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                                            <p className="text-sm font-bold opacity-50 uppercase">Cargando catálogo...</p>
                                        </td>
                                    </tr>
                                ) : filteredProducts.map(p => (
                                    <tr key={p.id} className="hover:bg-muted/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-black text-sm uppercase truncate max-w-[200px]">{p.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-bold">{p.barcode}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-muted-foreground">${Number(p.purchasePrice).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm font-black text-primary">${Number(p.sellPrice).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${p.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {p.stock} {p.unit.toLowerCase()}(s)
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
                                                    className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black uppercase tracking-tighter">{editingProduct?.id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                            <button onClick={() => setIsProductModalOpen(false)} className="p-2 hover:bg-muted rounded-full">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1 mb-1 block">Nombre del Producto</label>
                                <input
                                    required
                                    type="text"
                                    value={editingProduct?.name || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value.toUpperCase() })}
                                    className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/30 rounded-2xl p-3 text-sm font-bold uppercase outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1 mb-1 block">Código de Barras</label>
                                    <input
                                        required
                                        type="text"
                                        value={editingProduct?.barcode || ''}
                                        onChange={e => setEditingProduct({ ...editingProduct, barcode: e.target.value })}
                                        className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/30 rounded-2xl p-3 text-sm font-bold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1 mb-1 block">Unidad de Medida</label>
                                    <select
                                        value={editingProduct?.unit || 'UNIDAD'}
                                        onChange={e => setEditingProduct({ ...editingProduct, unit: e.target.value as any })}
                                        className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/30 rounded-2xl p-3 text-sm font-bold outline-none"
                                    >
                                        <option value="UNIDAD">POR UNIDAD / PIEZA</option>
                                        <option value="PESO">POR PESO / GRANEL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1 mb-1 block">P. Compra</label>
                                    <input
                                        required
                                        type="number" step="0.01"
                                        value={editingProduct?.purchasePrice || ''}
                                        onChange={e => setEditingProduct({ ...editingProduct, purchasePrice: parseFloat(e.target.value) })}
                                        className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/30 rounded-2xl p-3 text-sm font-bold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1 mb-1 block">P. Venta</label>
                                    <input
                                        required
                                        type="number" step="0.01"
                                        value={editingProduct?.sellPrice || ''}
                                        onChange={e => setEditingProduct({ ...editingProduct, sellPrice: parseFloat(e.target.value) })}
                                        className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/30 rounded-2xl p-3 text-sm font-bold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1 mb-1 block">Stock Actual</label>
                                    <input
                                        required
                                        type="number" step="0.1"
                                        value={editingProduct?.stock || ''}
                                        onChange={e => setEditingProduct({ ...editingProduct, stock: parseFloat(e.target.value) })}
                                        className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/30 rounded-2xl p-3 text-sm font-bold outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 mt-4 active:scale-95 transition-all"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
