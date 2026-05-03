import ResetPassword from '@/features/auth/pages/ResetPassword';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/reset-password')({
	component: RouteComponent,
	validateSearch: (search: Record<string, string>) => ({
		token: search.token ?? '',
	}),
});
function RouteComponent() {
	const { token } = Route.useSearch();
	return <ResetPassword token={token} />;
}
