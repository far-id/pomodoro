import { getSessionFn } from '@/features/auth/api/auth.api';
import { queryOptions } from '@tanstack/react-query';

export const sessionQueryOptions = queryOptions({
	queryKey: ['session'],
	queryFn: getSessionFn,
	staleTime: 30 * 60 * 1000, // 30 minutes
});
