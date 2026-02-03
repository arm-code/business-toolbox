"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import {
    ArrowLeft,
    Search,
    ShoppingCart,
    Trash2,
    User,
    CreditCard,
    Banknote,
    Clock,
    X,
    CheckCircle2,
    Package,
    Plus,
    Minus,
    Loader2,
    BarChart3
} from "lucide-react";
import { apiFetch } from "../../lib/api";
import { Product, Customer, PaymentType, CreateSaleDto } from "../../types/pos";

export default function POSPage() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [paymentType, setPaymentType] = useState<PaymentType>('EFECTIVO');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    // Load initial data
    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, []);

    // Search logic with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchProducts = async (query = "") => {
        try {
            setLoading(true);
            const data = await apiFetch<Product[]>(`/inventory/products${query ? `?search=${query}` : ""}`);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const data = await apiFetch<Customer[]>("/customers");
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const addToCart = (product: Product) => {
        const existing = cart.find(item => item.product.id === product.id);
        if (existing) {
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + (product.unit === 'PESO' ? 0.1 : 1) }
                    : item
            ));
        } else {
            setCart([...cart, { product, quantity: product.unit === 'PESO' ? 0.5 : 1 }]);
        }
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(cart.map(item => {
            if (item.product.id === productId) {
                const newQty = Math.max(0.1, item.quantity + delta);
                return { ...item, quantity: Number(newQty.toFixed(2)) };
            }
            return item;
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.product.sellPrice * item.quantity), 0);
    };

    const handleCheckout = async () => {
        if (paymentType === 'CREDITO' && !selectedCustomer) {
            alert("Por favor selecciona un cliente para ventas a crédito.");
            return;
        }

        try {
            setProcessing(true);
            const saleData: CreateSaleDto = {
                paymentType,
                customerId: selectedCustomer?.id,
                items: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            await apiFetch("/sales", {
                method: 'POST',
                body: JSON.stringify(saleData)
            });

            setSuccess(true);
            setCart([]);
            setSelectedCustomer(null);
            setTimeout(() => {
                setSuccess(false);
                setIsCheckoutOpen(false);
                fetchProducts(); // Refresh stock
            }, 2000);
        } catch (error: any) {
            alert(error.message || "Error al procesar la venta");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
            {/* Left Side: Search & Products */}
            <div className="flex-1 flex flex-col border-r h-full overflow-hidden bg-muted/10">
                <header className="px-4 h-16 flex items-center border-b bg-card sticky top-0 z-10 shrink-0">
                    <NextLink className="p-2 hover:bg-muted rounded-full mr-2" href="/catalog">
                        <ArrowLeft className="h-5 w-5" />
                    </NextLink>
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-muted border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="ml-4 flex items-center gap-1 shrink-0">
                        <NextLink
                            href="/tools/pos/inventory"
                            className="p-2.5 bg-muted rounded-xl hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                            title="Inventario"
                        >
                            <Package className="h-5 w-5" />
                        </NextLink>
                        <NextLink
                            href="/tools/pos/reports"
                            className="p-2.5 bg-muted rounded-xl hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                            title="Reportes"
                        >
                            <BarChart3 className="h-5 w-5" />
                        </NextLink>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                    {loading && products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin mb-4" />
                            <p className="text-sm font-medium">Buscando productos...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground opacity-50">
                            <Package className="h-12 w-12 mb-4" />
                            <p className="text-lg font-bold">No hay productos</p>
                            <p className="text-sm">Intenta con otra búsqueda</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="flex flex-col text-left bg-card border rounded-2xl p-4 hover:shadow-md hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-violet-100 rounded-xl">
                                            <Package className="h-5 w-5 text-violet-700" />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-muted-foreground block uppercase">{product.unit}</span>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                STK: {product.stock}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{product.name.toUpperCase()}</h3>
                                    <p className="text-xs text-muted-foreground mb-3">{product.barcode}</p>
                                    <p className="mt-auto text-lg font-black text-primary">${Number(product.sellPrice).toFixed(2)}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Cart */}
            <div className="w-full md:w-[400px] flex flex-col bg-card shadow-2xl z-20 h-full">
                <div className="p-4 border-b flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        <h2 className="font-black tracking-tighter uppercase">Carrito de Venta</h2>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs font-black px-2 py-0.5 rounded-full">
                        {cart.length} ITEMS
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] md:min-h-0">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-30 py-10">
                            <ShoppingCart className="h-10 w-10 mb-2" />
                            <p className="text-sm font-bold uppercase tracking-widest">El carrito está vacío</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3 bg-muted/20 p-3 rounded-2xl border border-transparent hover:border-primary/10 transition-colors">
                                <div className="flex-1">
                                    <h4 className="text-xs font-black truncate">{item.product.name.toUpperCase()}</h4>
                                    <p className="text-[10px] text-muted-foreground">${Number(item.product.sellPrice).toFixed(2)} / {item.product.unit.toLowerCase()}</p>
                                </div>
                                <div className="flex items-center bg-background rounded-lg border shadow-sm h-8">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.product.unit === 'PESO' ? -0.1 : -1)}
                                        className="px-2 h-full hover:text-primary transition-colors"
                                    >
                                        <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="w-10 text-center text-xs font-bold leading-none">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.product.unit === 'PESO' ? 0.1 : 1)}
                                        className="px-2 h-full hover:text-primary transition-colors"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="w-16 text-right font-black text-xs text-primary">
                                    ${(item.product.sellPrice * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-1 hover:text-destructive transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Cart Action */}
                <div className="p-6 border-t bg-muted/5 space-y-4 shrink-0">
                    <div className="flex justify-between items-center text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">
                        <span>Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-xl font-black tracking-tighter text-primary">TOTAL</span>
                        <span className="text-3xl font-black tracking-tighter text-primary">${calculateTotal().toFixed(2)}</span>
                    </div>

                    <button
                        disabled={cart.length === 0}
                        onClick={() => setIsCheckoutOpen(true)}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:opacity-90 disabled:opacity-30 active:scale-[0.98] transition-all"
                    >
                        Cobrar Ahora
                    </button>
                </div>
            </div>

            {/* Checkout Overlay Modal */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-[100] animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom duration-300">
                        {success ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-300">
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">¡Venta Exitosa!</h3>
                                <p className="text-muted-foreground">La transacción se ha registrado correctamente.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-black tracking-tighter uppercase text-primary">Finalizar Venta</h2>
                                    <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Total Display */}
                                    <div className="bg-violet-50 rounded-3xl p-6 text-center border-2 border-violet-100">
                                        <p className="text-xs font-black text-violet-600 uppercase tracking-widest mb-1">Total a Pagar</p>
                                        <p className="text-5xl font-black text-primary tracking-tighter">${calculateTotal().toFixed(2)}</p>
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-muted-foreground mb-3 block px-1 tracking-widest">Método de Pago</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'EFECTIVO', icon: Banknote, label: 'Efectivo', color: 'bg-green-50 text-green-700' },
                                                { id: 'TARJETA', icon: CreditCard, label: 'Tarjeta', color: 'bg-blue-50 text-blue-700' },
                                                { id: 'CREDITO', icon: Clock, label: 'Crédito', color: 'bg-orange-50 text-orange-700' }
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setPaymentType(type.id as PaymentType)}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${paymentType === type.id
                                                        ? 'border-primary bg-primary/5 shadow-inner'
                                                        : 'border-transparent bg-muted/30 hover:bg-muted/50'
                                                        }`}
                                                >
                                                    <type.icon className="h-6 w-6" />
                                                    <span className="text-[10px] font-black uppercase tracking-tighter">{type.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Customer Selection for Credit */}
                                    {paymentType === 'CREDITO' && (
                                        <div className="animate-in slide-in-from-top duration-300">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground mb-3 block px-1 tracking-widest">Seleccionar Cliente (Fiao)</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <select
                                                    value={selectedCustomer?.id || ""}
                                                    onChange={(e) => {
                                                        const customer = customers.find(c => c.id === e.target.value);
                                                        setSelectedCustomer(customer || null);
                                                    }}
                                                    className="w-full bg-muted/40 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 pl-12 text-sm font-bold outline-none appearance-none transition-all"
                                                >
                                                    <option value="">-- Seleccionar --</option>
                                                    {customers.map(c => (
                                                        <option key={c.id} value={c.id}>{c.name.toUpperCase()} (Deuda: ${c.balance.toFixed(2)})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        disabled={processing || cart.length === 0}
                                        onClick={handleCheckout}
                                        className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                Procesando...
                                            </>
                                        ) : (
                                            <>Realizar Venta</>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
