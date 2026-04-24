import { useEffect, useState } from 'react'
import { SaleItem } from '../types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: SaleItem) => void;
    item: SaleItem | null;
}



const ItemModal = ({ isOpen, onClose, onSave, item }: ItemModalProps) => {
    const [formData, setFormData] = useState<SaleItem | null>(null);

    // Sincronización de estado
    useEffect(() => {
        if (isOpen) {
            setFormData(item);
        } else {
            // Limpiamos al cerrar para evitar fugas de datos visuales
            setFormData(null);
        }
    }, [item, isOpen]);

    const handleSave = () => {
        if (!formData) return;

        // Validación de reglas de negocio
        if (!formData.description.trim()) {
            toast.error("La descripción no puede estar vacía");
            return;
        }

        // Aseguramos que los valores sean números reales antes de guardar
        const quantity = Number(formData.quantity);
        const price = Number(formData.price);

        if (isNaN(quantity) || quantity <= 0) {
            toast.error("La cantidad debe ser un número mayor a 0");
            return;
        }

        onSave({ ...formData, quantity, price });
        onClose();
    };

    if (!formData) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{formData.id ? "Editar Artículo" : "Agregar Artículo"}</DialogTitle>
                </DialogHeader>

                <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='description'>Descripción</Label>
                        <Input
                            id='description'
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className='uppercase font-semibold'
                            placeholder="Ej. MESA GRANDE CON 8 SILLAS"
                            onFocus={(e) => e.target.select()}
                            autoComplete="off"
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='quantity'>Cantidad</Label>
                            <Input
                                id='quantity'
                                type='number'
                                // Si es 0, lo mostramos vacío para facilitar la edición
                                value={formData.quantity === 0 ? "" : formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value === "" ? 0 : Number(e.target.value) })}
                                onFocus={(e) => e.target.select()}
                                step="any"
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='price'>Precio Unitario</Label>
                            <Input
                                id='price'
                                type='number'
                                value={formData.price === 0 ? "" : formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                                onFocus={(e) => e.target.select()}
                                step="any"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSave} className='w-full text-lg h-12'>
                        {formData.id ? "Actualizar Artículo" : "Añadir Artículo"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ItemModal;