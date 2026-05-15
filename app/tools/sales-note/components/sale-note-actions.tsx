"use client";

import { Plus, Trash, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface SaleNoteActionsProps {
    onAdd: () => void;
    onClear: () => void;
    onPrint: () => void;
}

export function SaleNoteActions({ onAdd, onClear, onPrint }: SaleNoteActionsProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 print:hidden z-40 md:relative md:bg-transparent md:border-none md:p-0 md:mt-6">
            <div className="max-w-2xl mx-auto flex gap-2 items-center justify-between">

                {/* Diálogo de Confirmación para Limpiar */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 shrink-0 border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-md border-slate-200">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-slate-950 font-bold">
                                ¿Estás completamente seguro?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 text-sm">
                                Esta acción eliminará todos los artículos de la nota actual. No podrás deshacer este cambio.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-sm border-slate-200 text-slate-950">
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onClear}
                                className="rounded-sm bg-red-600 text-white hover:bg-red-700 font-bold uppercase tracking-tight text-xs"
                            >
                                Sí, limpiar nota
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Botón Limpiar - Menos jerarquía para evitar accidentes
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onClear}
                    className="h-10 w-10 shrink-0 border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    title="Limpiar Nota"
                >
                    <Trash className="h-5 w-5" />
                </Button> */}

                {/* Botón Agregar - Acción Principal (Texto completo) */}
                <Button
                    onClick={onAdd}
                    className="flex-1 h-10 bg-slate-900 text-white hover:bg-slate-800 font-bold uppercase tracking-wider text-[10px] sm:text-xs"
                >
                    <Plus className="h-3 w-3 mr-1 sm:mr-2" />
                    <span>Agregar</span>
                    <span className="hidden xs:inline ml-1">Artículo</span>
                </Button>

                {/* Botón Imprimir - Icono en móvil, Texto en desktop */}
                <Button
                    variant="outline"
                    onClick={onPrint}
                    className="h-10 px-3 sm:px-4 border-slate-950 text-slate-950 font-bold uppercase tracking-wider text-[10px] sm:text-xs"
                >
                    <Printer className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Imprimir</span>
                </Button>
            </div>
        </div>
    );
}