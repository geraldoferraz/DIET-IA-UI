import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
            gcTime: 1000 * 60 * 60 * 24, // 24 horas
            staleTime: Infinity, // Dados nunca ficam stale automaticamente
        },
    },
});