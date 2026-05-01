import Projects from '@/features/app/pages/Projects';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/projects')({
	component: Projects,
});
