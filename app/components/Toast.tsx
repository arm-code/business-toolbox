"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Wait for exit animation
    };

    const config = {
        success: {
            icon: CheckCircle2,
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            iconColor: 'text-green-500'
        },
        error: {
            icon: AlertCircle,
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            iconColor: 'text-red-500'
        },
        info: {
            icon: Info,
            bg: 'bg-violet-50',
            border: 'border-violet-200',
            text: 'text-violet-800',
            iconColor: 'text-violet-500'
        }
    }[type];

    return (
        <div className={`
            fixed top-4 right-4 z-[200] flex items-center gap-3 p-4 rounded-2xl border-2 shadow-2xl
            ${config.bg} ${config.border} ${config.text}
            animate-in slide-in-from-right duration-300
            ${isExiting ? 'animate-out fade-out slide-out-to-right duration-300' : ''}
        `}>
            <config.icon className={`h-5 w-5 ${config.iconColor}`} />
            <p className="text-sm font-black uppercase tracking-tight">{message}</p>
            <button
                onClick={handleClose}
                className="ml-2 p-1 hover:bg-black/5 rounded-full transition-colors"
            >
                <X className="h-4 w-4 opacity-50" />
            </button>
        </div>
    );
}
