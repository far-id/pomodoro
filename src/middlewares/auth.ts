import { auth } from '@/lib/auth';
import { createMiddleware } from '@tanstack/react-start';

export type AuthSession = {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
		emailVerified: boolean;
		createdAt: Date;
		updatedAt: Date;
	};
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string | null;
		userAgent?: string | null;
	};
} | null;

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
	const session = (await auth.api.getSession({
		headers: request.headers,
	})) as AuthSession;

	return next({
		context: {
			session,
			user: session?.user ?? null,
			isAuthenticated: session !== null,
		},
	});
});

export const protectedMiddleware = createMiddleware()
	.middleware([authMiddleware])
	.server(async ({ next, context }) => {
		if (!context.isAuthenticated) {
			throw new Response(null, {
				status: 302,
				headers: { Location: '/auth/login' },
			});
		}

		return next({ context });
	});

export const guestMiddleware = createMiddleware()
	.middleware([authMiddleware])
	.server(async ({ next, context }) => {
		if (context.isAuthenticated) {
			throw new Response(null, {
				status: 302,
				headers: { Location: '/dashboard' },
			});
		}

		return next({ context });
	});
