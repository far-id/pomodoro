import { useEffect, useRef } from 'react';
import { useSettings } from './useSettings';
import { useTimerStore } from '../stores/useTimerStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * Bridges useSettings → useTimerStore and owns the setInterval.
 * Mount this once at the root of your Timer component tree.
 */

function createTimerWorker(): Worker | null {
	// Guard: prevent creating a Worker in non-browser environments (e.g. during SSR)
	if (globalThis.window === undefined) return null;

	return new Worker(new URL('../workers/timer.worker.ts', import.meta.url), { type: 'module' });
}

export function usePomodoro() {
	const { settings } = useSettings();
	const syncSettings = useTimerStore((s) => s.syncSettings);
	const running = useTimerStore((s) => s.running);
	const rehydrate = useTimerStore((s) => s.rehydrateElapsed);
	const workerRef = useRef<Worker | null>(null);

	// On mount, rehydrate timer state (adjust for elapsed time while unmounted)
	// Then, keep timer in sync with settings whenever they change
	useEffect(() => {
		workerRef.current = createTimerWorker();
		if (workerRef.current) {
			workerRef.current.onmessage = () => useTimerStore.getState().tick();
		}

		rehydrate();

		const onVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				useTimerStore.getState().rehydrateElapsed();
			}
		};
		document.addEventListener('visibilitychange', onVisibilityChange);

		return () => {
			workerRef.current?.postMessage('stop');
			workerRef.current?.terminate();
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	}, []);

	// Keep store in sync whenever settings change
	useEffect(() => {
		syncSettings(settings);
	}, [settings, syncSettings]);

	useEffect(() => {
		if (!workerRef.current) return;
		workerRef.current.postMessage(running ? 'start' : 'stop');
	}, [running]);

	return useTimerStore(
		useShallow((s) => ({
			mode: s.mode,
			seconds: s.seconds,
			totalSeconds: s.totalSeconds,
			running: s.running,
			completedPomodoros: s.completedPomodoros,
			start: s.start,
			pause: s.pause,
			reset: s.reset,
			skip: s.skip,
			switchMode: s.switchMode,
		})),
	);
}
