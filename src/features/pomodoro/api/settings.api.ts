import { db } from '@/db';
import { userSettings } from '@/db/schema';
import { protectedMiddleware } from '@/middlewares/auth';
import { createServerFn } from '@tanstack/react-start';
import type { PomodoroSettings } from '../lib/settings';
import { eq } from 'drizzle-orm';

export const getUserSettingsFn = createServerFn({ method: 'GET' })
	.middleware([protectedMiddleware])
	.handler(async ({ context }) => {
		const userId = context.user!.id;

		const userSetting = await db.query.userSettings.findFirst({
			where: (userSettings, { eq }) => eq(userSettings.userId, userId),
		});

		if (userSetting) return userSetting;

		const [result] = await db
			.insert(userSettings)
			.values({ userId })
			.onConflictDoNothing()
			.returning();

		return result;
	});

export const updateSettingsFn = createServerFn({ method: 'POST' })
	.middleware([protectedMiddleware])
	.inputValidator((data: Partial<PomodoroSettings>) => data)
	.handler(async ({ data, context }) => {
		const userId = context.user!.id;
		const [updated] = await db
			.update(userSettings)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(userSettings.userId, userId))
			.returning();

		return updated;
	});
