import { create } from 'zustand';
import { minutesToSeconds } from '../lib/duration';
import { DEFAULT_SETTINGS } from '../lib/settings';

type TimerMode = 'pomodoro' | 'short_break' | 'long_break';
type TimerStatus = 'idle' | 'running' | 'paused';

type TimerActions = {
	start: () => void;
	pause: () => void;
	reset: (durationSeconds: number) => void;
	tick: () => void;
	switchMode: (mode: TimerMode, durationSeconds: number) => void;
};

type TimerState = {
	mode: TimerMode;
	status: TimerStatus;
	secondsLeft: number;
	completedPomodoros: number;
	actions: TimerActions;
};

const useTimerStore = create<TimerState>((set) => ({
	mode: 'pomodoro',
	status: 'idle',
	secondsLeft: minutesToSeconds(DEFAULT_SETTINGS.pomodoroDuration),
	completedPomodoros: 0,
	actions: {
		start: () => set({ status: 'running' }),
		pause: () => set({ status: 'paused' }),
		reset: (durationSeconds) => set({ status: 'idle', secondsLeft: durationSeconds }),
		tick: () => set((s) => ({ secondsLeft: Math.max(0, s.secondsLeft - 1) })),
		switchMode: (mode, durationSeconds) =>
			set({ mode, status: 'idle', secondsLeft: durationSeconds }),
	},
}));

export const useTimerMode = () => useTimerStore((state) => state.mode);
export const useTimerStatus = () => useTimerStore((state) => state.status);
export const useSecondsLeft = () => useTimerStore((state) => state.secondsLeft);
export const useCompletedPomodoros = () => useTimerStore((state) => state.completedPomodoros);
export const useTimerActions = () => useTimerStore((state) => state.actions);
