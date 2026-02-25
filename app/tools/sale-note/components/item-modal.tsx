import { useEffect, useState } from 'react'
import { SaleItem } from '../types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: SaleItem) => void;
    item: SaleItem | null;
}



const ItemModal = ({ isOpen, onClose, onSave, item }: ItemModalProps) => {

    const [formData, setFormData] = useState<SaleItem | null>(null);

    useEffect(() => {
        if (item) setFormData(item)
    }, [item, isOpen])


    const handleSave = () => {
        if (formData) {
            onSave(formData)
            onClose()
        }
    }

    if (!formData) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent>

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
                        />

                    </div>

                    <div className='grid gap-2'>
                        <Label>Cantidad</Label>
                        <Input
                            id='quantity'
                            type='number'
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor=''>Precio Unitario</Label>
                        <Input
                            id='price'
                            type='number'
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}

                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSave}
                        className='w-full'
                    >
                        {formData.id ? "Actualizar" : "Guardar"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default ItemModal