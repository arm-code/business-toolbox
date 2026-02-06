export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Product {
    id: string;
    name: string;
    description?: string;
    barcode: string;
    purchasePrice: number;
    sellPrice: number;
    stock: number;
    minStock?: number;
    unit: string;
    categoryId: string;
    category?: Category;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    balance: number;
}

export interface SaleItem {
    productId: string;
    quantity: number;
}

export interface PaymentMethod {
    id: string;
    key: 'CASH' | 'CARD' | 'CREDIT' | string;
    name: string;
}

export interface CreateSaleDto {
    paymentMethodId: string;
    customerId?: string; // Requerido si el método es Crédito
    items: SaleItem[];
}

export interface SaleDetail extends CreateSaleDto {
    id: string;
    total: number;
    createdAt: string;
}

export interface CashClosingReport {
    date: string;
    totalSales: number;
    totalIncome: number;
    details: {
        [key: string]: number;
    };
}

export interface NetProfitReport {
    date?: string;
    revenue: number;
    cost: number;
    netProfit: number;
}

export interface SaleHistoryItem {
    id: string;
    createdAt: string;
    total: number | string;
    paymentMethod: PaymentMethod;
    customer?: Customer | null;
    items: {
        id: string;
        quantity: number | string;
        price: number | string;
        subtotal: number | string;
        product: Product;
    }[];
}

// --- New Interfaces ---

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'USER' | 'GUEST';
    phone?: string;
    address?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Shift {
    id: string;
    userId: string;
    initialBalance: number;
    realBalance?: number;
    expectedBalance?: number;
    status: 'OPEN' | 'CLOSED';
    openedAt: string;
    closedAt?: string;
    user?: User;
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    shiftId: string;
    createdAt: string;
}

export interface Supplier {
    id: string;
    name: string;
    phone: string;
}

export interface PurchaseItem {
    productId: string;
    quantity: number;
    costPrice: number;
}

export interface CreatePurchaseDto {
    supplierId: string;
    items: PurchaseItem[];
}

export interface Purchase {
    id: string;
    supplierId: string;
    supplier: Supplier;
    total: number;
    createdAt: string;
    items: {
        id: string;
        productId: string;
        quantity: number;
        costPrice: number;
        product: Product;
    }[];
}

export interface InventoryAdjustment {
    productId: string;
    quantity: number;
    reason: string;
}
