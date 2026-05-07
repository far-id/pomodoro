import { Settings } from '@/features/app/components/Settings';
import { SideNavbar } from '@/features/app/components/SideNavbar';
import { TopNavbar } from '@/features/app/components/TopNavbar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
	beforeLoad: ({ context, location }) => {
		if (!context.user || !context.session) {
			throw redirect({
				to: '/auth/login',
				search: {
					redirect: location.href, // path to redirect back after authed
				},
			});
		}
		return { user: context.user, session: context.session };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();
	return (
		<div id='app_layout' className='flex'>
			<SideNavbar />
			<div className='flex-1 flex flex-col md:ml-64 w-full min-h-screen'>
				<TopNavbar user={user} />
				<main className='p-6 w-full mb-16 md:mb-0 flex-1'>
					<Outlet />
					<Settings />
				</main>
			</div>
		</div>
	);
}
