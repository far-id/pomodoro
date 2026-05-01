import { Settings } from '@/features/app/components/Settings';
import { SideNavbar } from '@/features/app/components/SideNavbar';
import { TopNavbar } from '@/features/app/components/TopNavbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export const Route = createFileRoute('/_app')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div id='app_layout' className='flex'>
			<SideNavbar />
			<div className='flex-1 flex flex-col md:ml-64 w-full min-h-screen'>
				<TopNavbar />
				<main className='p-6 w-full mb-16 md:mb-0 flex-1'>
					<Outlet />
					<Settings />
					<Toaster />
				</main>
			</div>
		</div>
	);
}
