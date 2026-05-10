export type PomodoroSettings = {
	pomodoroDuration: number;
	shortBreakDuration: number;
	longBreakDuration: number;
	autoStartBreaks: boolean;
	autoStartPomodoros: boolean;
	soundNotification: boolean;
	browserNotification: boolean;
	longBreakInterval: number;
};

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
