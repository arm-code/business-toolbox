import { ApiResponse } from '../types/pos';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // 401 logic should check status code directly for auth redirects
    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            const isToolRoute = window.location.pathname.startsWith('/tools');
            window.location.href = isToolRoute ? '/login?autoDemo=true' : '/login';
        }
        throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
    }

    const result = await response.json() as ApiResponse<T>;

    if (!response.ok || !result.success) {
        // Extract message from standardized error object
        const errorMessage = result.error?.message
            ? (Array.isArray(result.error.message) ? result.error.message[0] : result.error.message)
            : (result.message || `Error: ${response.status} ${response.statusText}`);

        throw new Error(errorMessage);
    }

    return result.data;
}
