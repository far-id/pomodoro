import { create } from 'zustand';
import { subscribeWithSelector, persist, createJSONStorage } from 'zustand/middleware';
import type { PomodoroSettings } from '../lib/settings';
import { DEFAULT_SETTINGS } from '../lib/settings';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
	mode: TimerMode;
	seconds: number;
	totalSeconds: number;
	running: boolean;
	startedAt: number | null;
	secondsAtStart: number;
	completedPomodoros: number;
	breakCount: number;
	settings: PomodoroSettings;
	pendingAutoStart: ReturnType<typeof setTimeout> | null;
	clearPendingAutoStart: () => void;
	syncSettings: (s: PomodoroSettings) => void;
	start: () => void;
	pause: () => void;
	reset: () => void;
	skip: () => void;
	tick: () => void;
	switchMode: (mode: TimerMode) => void;
	rehydrateElapsed: () => void;
}

function durationFor(mode: TimerMode, s: PomodoroSettings): number {
	switch (mode) {
		case 'focus':
			return s.pomodoroDuration * 60;
		case 'shortBreak':
			return s.shortBreakDuration * 60;
		case 'longBreak':
			return s.longBreakDuration * 60;
	}
}

function nextMode(current: TimerMode, breakCount: number, settings: PomodoroSettings): TimerMode {
	if (current === 'focus') {
		return (breakCount + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
	}
	return 'focus';
}

function applyTransition(get: () => TimerState, set: (partial: Partial<TimerState>) => void) {
	const { mode, breakCount, completedPomodoros, settings } = get();
	const next = nextMode(mode, breakCount, settings);
	const total = durationFor(next, settings);
	const newBreakCount = mode === 'focus' ? breakCount + 1 : breakCount;
	const newCompleted = mode === 'focus' ? completedPomodoros + 1 : completedPomodoros;
	const autoStart = next === 'focus' ? settings.autoStartPomodoros : settings.autoStartBreaks;

	set({
		seconds: total,
		running: false,
		startedAt: null,
		mode: next,
		totalSeconds: total,
		breakCount: newBreakCount,
		completedPomodoros: newCompleted,
		pendingAutoStart: null,
	});

	if (autoStart) {
		const timeoutId = setTimeout(() => {
			set({ running: true, startedAt: Date.now(), secondsAtStart: total, pendingAutoStart: null });
		}, 1200);
		set({ pendingAutoStart: timeoutId });
	}
}

export const useTimerStore = create<TimerState>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				mode: 'focus',
				seconds: DEFAULT_SETTINGS.pomodoroDuration * 60,
				totalSeconds: DEFAULT_SETTINGS.pomodoroDuration * 60,
				running: false,
				startedAt: null,
				secondsAtStart: DEFAULT_SETTINGS.pomodoroDuration * 60,
				completedPomodoros: 0,
				breakCount: 0,
				settings: DEFAULT_SETTINGS,
				pendingAutoStart: null,

				clearPendingAutoStart: () => {
					const { pendingAutoStart } = get();
					if (pendingAutoStart !== null) {
						clearTimeout(pendingAutoStart);
						set({ pendingAutoStart: null });
					}
				},

				// When rehydrating, adjust seconds based on elapsed time while unmounted
				rehydrateElapsed: () => {
					const { running, startedAt, secondsAtStart } = get();
					if (!running || startedAt === null) return;

					const elapsed = Math.floor((Date.now() - startedAt) / 1000);
					const corrected = secondsAtStart - elapsed;

					if (corrected <= 0) {
						get().skip();
					} else {
						set({ seconds: corrected });
					}
				},

				syncSettings: (s) => {
					const { running, mode } = get();
					if (running) {
						set({ settings: s });
					} else {
						const total = durationFor(mode, s);
						set({ settings: s, totalSeconds: total, seconds: total, secondsAtStart: total });
					}
				},

				start: () => {
					const { seconds } = get();
					set({ running: true, startedAt: Date.now(), secondsAtStart: seconds });
				},

				pause: () => set({ running: false, startedAt: null }),

				reset: () => {
					get().clearPendingAutoStart();
					const { mode, settings } = get();
					const total = durationFor(mode, settings);
					set({
						running: false,
						seconds: total,
						totalSeconds: total,
						startedAt: null,
						secondsAtStart: total,
					});
				},

				skip: () => {
					get().clearPendingAutoStart();
					applyTransition(get, set);
				},

				tick: () => {
					const { seconds } = get();

					if (seconds > 1) {
						set({ seconds: seconds - 1 });
						return;
					}

					applyTransition(get, set);
				},

				switchMode: (mode) => {
					get().clearPendingAutoStart();
					const { settings } = get();
					const total = durationFor(mode, settings);
					set({
						mode,
						seconds: total,
						totalSeconds: total,
						running: false,
						startedAt: null,
						secondsAtStart: total,
					});
				},
			}),
			{
				name: 'pomodoro:timer',
				storage: createJSONStorage(() => {
					// Fallback to in-memory storage for environments without localStorage (e.g. React Native, SSR)
					if (globalThis.window === undefined) {
						const map = new Map<string, string>();
						return {
							getItem: (k) => map.get(k) ?? null,
							setItem: (k, v) => map.set(k, v),
							removeItem: (k) => map.delete(k),
						};
					}
					return localStorage;
				}),
				partialize: (state) => ({
					mode: state.mode,
					seconds: state.seconds,
					totalSeconds: state.totalSeconds,
					running: state.running,
					startedAt: state.startedAt,
					secondsAtStart: state.secondsAtStart,
					completedPomodoros: state.completedPomodoros,
					breakCount: state.breakCount,
				}),
			},
		),
	),
);
