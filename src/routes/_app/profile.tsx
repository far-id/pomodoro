import { getConnectedAccounts, getHasPassword } from '@/features/profile/api/profile.api';
import ProfilePage from '@/features/profile/pages/ProfilePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/profile')({
	component: RouteComponent,
	loader: async () => {
		return await getConnectedAccounts();
	},
	validateSearch: (search: Record<string, string | null>) => ({
		token: search.token,
	}),
});

function RouteComponent() {
	const { user, session } = Route.useRouteContext();
	const { accounts } = Route.useLoaderData();
	const { token } = Route.useSearch();
	const hasPassword = accounts.some((a) => a.providerId === 'credential');
	return (
		<ProfilePage
			currentSessionToken={session.token}
			user={user}
			hasPassword={hasPassword}
			accounts={accounts}
			token={token}
		/>
	);
}
