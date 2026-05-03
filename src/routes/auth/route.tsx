import { resolveRedirect } from '@/lib/utils';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { ChartBarBig, RefreshCw, TimerIcon } from 'lucide-react';
import z from 'zod';

const searchSchema = z.object({
	redirect: z.string().optional(),
});

export const Route = createFileRoute('/auth')({
	validateSearch: searchSchema,
	beforeLoad: ({ context, search }) => {
		if (context.user) {
			throw redirect({ to: resolveRedirect(search.redirect) });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='min-h-screen flex flex-col items-center my-3 sm:my-6 md:my-12 justify-center'>
			<div className='w-full md:w-1/2 lg:w-1/3 px-3 sm:px-auto container flex flex-col gap-6'>
				<Outlet />

				<div className='flex w-full justify-around items-center'>
					<div className='flex flex-col justify-center gap-2 items-center'>
						<TimerIcon width={24} className='stroke-primary' />
						<span className='uppercase tracking-wide text-xs'>Deep Focus</span>
					</div>
					<div className='flex flex-col justify-center gap-2 items-center'>
						<ChartBarBig width={24} className='stroke-primary' />
						<span className='uppercase tracking-wide text-xs'>Analytics</span>
					</div>
					<div className='flex flex-col justify-center gap-2 items-center'>
						<RefreshCw width={24} className='stroke-primary' />
						<span className='uppercase tracking-wide text-xs'>Sync All</span>
					</div>
				</div>
			</div>
		</div>
	);
}
