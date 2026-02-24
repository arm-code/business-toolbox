import { useMemo, useState } from 'react';
import { SaleItem } from '../types';

export const useSaleNote = () => {
  const [items, setItems] = useState<SaleItem[]>([
    {
      id: crypto.randomUUID(),
      quantity: 1,
      description: '',
      price: 0,
    },
  ]);

  const addItem = (item: Omit<SaleItem, 'id'>) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };

    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, updatedItem: SaleItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item)),
    );
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [items]);

  return {
    items,
    total,
    addItem,
    updateItem,
    removeItem,
  };
};
