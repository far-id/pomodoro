import { sessionQueryOptions } from '@/queries/session.queries';
import { useQuery } from '@tanstack/react-query';

export function useSession() {
	const { data } = useQuery(sessionQueryOptions);

	if (!data) throw new Error('Not logged in');

	return data;
}
