import z from 'zod';

export const pomodoroSettingsSchema = z.object({
	pomodoroDuration: z.number().int().min(1, 'Minimum 1 minute').max(120, 'Maximum 120 minutes'),
	shortBreakDuration: z.number().int().min(1).max(60),
	longBreakDuration: z.number().int().min(1).max(60),
	autoStartBreaks: z.boolean(),
	autoStartPomodoros: z.boolean(),
	soundNotification: z.boolean(),
	browserNotification: z.boolean(),
	longBreakInterval: z.number().int().min(1).max(10),
});

export type PomodoroSettings = z.infer<typeof pomodoroSettingsSchema>;

export const DEFAULT_SETTINGS: PomodoroSettings = {
	pomodoroDuration: 25,
	shortBreakDuration: 5,
	longBreakDuration: 15,
	autoStartBreaks: true,
	autoStartPomodoros: false,
	soundNotification: true,
	browserNotification: true,
	longBreakInterval: 4,
};

const KEY = 'pomondoro:guest-settings';

export function getGuestSettings(): PomodoroSettings {
	if (globalThis.window === undefined) return DEFAULT_SETTINGS;
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
	} catch {
		return DEFAULT_SETTINGS;
	}
}

export function saveGuestSettings(patch: Partial<PomodoroSettings>) {
	const current = getGuestSettings();
	localStorage.setItem(KEY, JSON.stringify({ ...current, ...patch }));
}

export function clearGuestSettings() {
	localStorage.removeItem(KEY);
}
