import { db } from '@/db';
import { auth } from '@/lib/auth';
import { protectedMiddleware } from '@/middlewares/auth';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';

export const getHasPassword = createServerFn({ method: 'GET' })
	.middleware([protectedMiddleware])
	.handler(async ({ context }) => {
		const userId = context.user!.id;

		const hasPassword = await db.query.account.findFirst({
			where: (account, { and, eq, isNotNull }) =>
				and(eq(account.userId, userId), isNotNull(account.password)),
		});

		return { hasPassword: !!hasPassword };
	});

export const getConnectedAccounts = createServerFn({ method: 'GET' })
	.middleware([protectedMiddleware])
	.handler(async () => {
		const headers = getRequest().headers;
		const accounts = await auth.api.listUserAccounts({
			headers,
		});

		return { accounts };
	});
