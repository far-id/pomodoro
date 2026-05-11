import { TimerRing } from './TimerRing';
import { usePomodoro } from '../hooks/usePomodoro';
import type { TimerMode } from '../stores/useTimerStore';

const MODE_LABELS: Record<TimerMode, string> = {
	focus: 'Focus',
	shortBreak: 'Short Break',
	longBreak: 'Long Break',
};

export const Timer = () => {
	const {
		mode,
		seconds,
		totalSeconds,
		running,
		completedPomodoros,
		start,
		pause,
		reset,
		skip,
		switchMode,
	} = usePomodoro();

	const ringMode = mode === 'focus' ? 'focus' : 'break';

	return (
		<div className='w-full h-screen flex flex-col items-center justify-center bg-blue-900'>
			{/* Mode tabs */}
			<div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
				{(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
					<button
						key={m}
						onClick={() => switchMode(m)}
						style={{
							background: mode === m ? 'rgba(255,255,255,0.15)' : 'transparent',
							border: '1px solid rgba(255,255,255,0.15)',
							color: mode === m ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
							borderRadius: 40,
							padding: '6px 18px',
							fontSize: 12,
							cursor: 'pointer',
							letterSpacing: 1,
							transition: 'all 0.2s',
						}}
					>
						{MODE_LABELS[m].toUpperCase()}
					</button>
				))}
			</div>

			<TimerRing seconds={seconds} totalSeconds={totalSeconds} mode={ringMode} />

			{/* Pomodoro count */}
			<p
				style={{
					color: 'rgba(255,255,255,0.35)',
					fontSize: 12,
					letterSpacing: 2,
					margin: '12px 0 20px',
				}}
			>
				#{completedPomodoros + 1}
			</p>

			{/* Controls */}
			<div style={{ display: 'flex', gap: 16 }}>
				<button
					onClick={() => (running ? pause() : start())}
					style={{
						background: 'rgba(255,255,255,0.12)',
						border: '1px solid rgba(255,255,255,0.2)',
						color: 'rgba(255,255,255,0.85)',
						borderRadius: 40,
						padding: '10px 32px',
						fontSize: 14,
						fontWeight: 500,
						cursor: 'pointer',
						letterSpacing: 1,
					}}
				>
					{running ? 'PAUSE' : 'START'}
				</button>

				<button
					onClick={reset}
					style={{
						background: 'transparent',
						border: '1px solid rgba(255,255,255,0.15)',
						color: 'rgba(255,255,255,0.45)',
						borderRadius: 40,
						padding: '10px 24px',
						fontSize: 14,
						cursor: 'pointer',
						letterSpacing: 1,
					}}
				>
					RESET
				</button>

				<button
					onClick={skip}
					style={{
						background: 'transparent',
						border: '1px solid rgba(255,255,255,0.15)',
						color: 'rgba(255,255,255,0.45)',
						borderRadius: 40,
						padding: '10px 24px',
						fontSize: 14,
						cursor: 'pointer',
						letterSpacing: 1,
					}}
				>
					SKIP
				</button>
			</div>
		</div>
	);
};
