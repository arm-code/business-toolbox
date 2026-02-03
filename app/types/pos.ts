export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Product {
    id: string;
    name: string;
    barcode: string;
    purchasePrice: number;
    sellPrice: number;
    stock: number;
    unit: 'UNIDAD' | 'PESO'; // Basado en la descripción de "decimales en stock"
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

export type PaymentType = 'EFECTIVO' | 'TARJETA' | 'CREDITO';

export interface CreateSaleDto {
    paymentType: PaymentType;
    customerId?: string; // Requerido si es CREDITO
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
