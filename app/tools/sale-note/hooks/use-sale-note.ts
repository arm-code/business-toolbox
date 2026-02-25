import { useEffect, useMemo, useState } from 'react';
import { SaleItem } from '../types';
import { toast } from 'sonner';

const STORAGE_KEY = 'sale-note-items';

export const useSaleNote = () => {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const initialState: SaleItem[] = [
    {
      id: crypto.randomUUID(),
      quantity: 1,
      description: '',
      price: 0,
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        toast.error('Failed to load saved items. Starting with an empty list.');
      }
    } else {
      setItems(
        initialState
      );
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

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

  const clearNote = () => {
    setItems(initialState);
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
    isHydrated,
    clearNote
  };
};
