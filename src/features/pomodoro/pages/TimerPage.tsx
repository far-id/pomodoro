import { ClientOnly } from '@tanstack/react-router';
import { Timer } from '../components/Timer';
import { TodaysOverview } from '../components/TodaysOverview';

export default function TimerPage() {
	return (
		<div className='flex items-center justify-center h-full'>
			<div className='w-full md:w-2/3 h-screen flex items-center justify-center'>
				<ClientOnly>
					<Timer />
				</ClientOnly>
			</div>
			<div className='hidden md:flex w-0 md:w-1/3 flex-col gap-4 h-screen overflow-auto'>
				<TodaysOverview />
			</div>
		</div>
	);
}
