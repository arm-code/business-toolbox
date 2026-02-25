

export interface SaleItem {
    id: string;
    quantity: number;
    description: string;
    price: number;
}

export interface SaleNoteData {
    client: string;
    date: string;
    items: SaleItem[];
}

