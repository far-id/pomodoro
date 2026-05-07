import {
	ErrorComponent,
	HeadContent,
	Scripts,
	createRootRouteWithContext,
	type ErrorComponentProps,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import appCss from '../styles.css?url';

import { queryOptions, type QueryClient } from '@tanstack/react-query';
import { getSessionFn } from '@/features/auth/serverFn/auth-fn';
import { Toaster } from '@/components/ui/sonner';
import NotFound from '@/features/system/pages/NotFound';
import ServerError from '@/features/system/pages/ServerError';

interface MyRouterContext {
	queryClient: QueryClient;
}

const sessionQueryOptions = queryOptions({
	queryKey: ['session'],
	queryFn: getSessionFn,
	staleTime: 30 * 60 * 1000, // 30 minutes
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.fetchQuery(sessionQueryOptions);

		return {
			user: session?.user ?? null,
			session: session?.session ?? null,
		};
	},
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
	errorComponent: ErrorBoundary,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body
				className='[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-none
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-3xl
  [&::-webkit-scrollbar-thumb]:bg-chart-1
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700'
			>
				{children}
				<Toaster swipeDirections={['top', 'left', 'right', 'bottom']} />
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function ErrorBoundary(props: ErrorComponentProps) {
	if (import.meta.env.DEV) return <ErrorComponent {...props} />;
	return <ServerError />;
}
