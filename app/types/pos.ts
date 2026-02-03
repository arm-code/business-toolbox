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
    totalSales: number;
    cashSales: number;
    cardSales: number;
    creditSales: number;
}

export interface NetProfitReport {
    totalRevenue: number;
    totalCost: number;
    netProfit: number;
}
