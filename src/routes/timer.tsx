import TimerPage from '@/features/pomodoro/pages/TimerPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/timer')({
	component: TimerPage,
});
