import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';

export function useSessions() {
	return useQuery({
		queryKey: ['sessions'],
		queryFn: async () => {
			const res = await authClient.listSessions();
			if (res.error) {
				console.log(res.error.message);
				throw new Error(res.error.message);
			}
			return res.data;
		},
	});
}
