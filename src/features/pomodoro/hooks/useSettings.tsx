import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserSettingsFn, updateSettingsFn } from '../api/settings.api';
import {
	getGuestSettings,
	saveGuestSettings,
	DEFAULT_SETTINGS,
	type PomodoroSettings,
} from '../lib/settings';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export const settingsQueryKey = ['pomodoro', 'settings'];

export function useSettings() {
	const { data: session } = authClient.useSession();
	const queryClient = useQueryClient();
	const isLoggedIn = !!session?.user;

	const { data: dbSettings, isLoading } = useQuery({
		queryKey: settingsQueryKey,
		queryFn: () => getUserSettingsFn(),
		enabled: isLoggedIn,
		staleTime: 1000 * 60 * 5, // 5 minutes
		refetchOnWindowFocus: false,
	});

	const [guestSettings, setGuestSettings] = useState<PomodoroSettings>(() =>
		isLoggedIn ? DEFAULT_SETTINGS : getGuestSettings(),
	);

	const settings = isLoggedIn ? (dbSettings ?? DEFAULT_SETTINGS) : guestSettings;

	const { mutateAsync: updateDb } = useMutation({
		mutationFn: (patch: Partial<PomodoroSettings>) => updateSettingsFn({ data: patch }),
		onSuccess: (updated) => {
			queryClient.setQueryData(settingsQueryKey, updated);
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: settingsQueryKey });
		},
	});

	const updateSettings = async (patch: Partial<PomodoroSettings>) => {
		try {
			if (isLoggedIn) {
				await updateDb(patch);
			} else {
				saveGuestSettings(patch);
				setGuestSettings((prev) => ({ ...prev, ...patch }));
			}

			return { error: false, message: 'Settings updated successfully' };
		} catch (e) {
			console.error('Failed to update settings', e);
			return { error: true, message: e instanceof Error ? e.message : 'Something went wrong' };
		}
	};

	return {
		settings,
		isLoading: isLoggedIn ? isLoading : false,
		updateSettings,
	};
}
