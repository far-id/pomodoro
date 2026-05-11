export type TimerMode = 'focus' | 'break';

interface TimerVariant {
	arcStart: string;
	arcStartOpacity: number;
	arcEnd: string;
	needleColor: string;
	needleGlowOuter: string;
	needleGlowInner: string;
	tipColor: string;
	label: string;
}

const TIMER_VARIANTS: Record<TimerMode, TimerVariant> = {
	focus: {
		arcStart: '#ef4444',
		arcStartOpacity: 0.55,
		arcEnd: '#D85A30',
		needleColor: '#D85A30',
		needleGlowOuter: 'rgba(216,90,48,0.25)',
		needleGlowInner: 'rgba(216,90,48,0.45)',
		tipColor: '#E8734A',
		label: 'FOCUS',
	},
	break: {
		arcStart: '#38bdf8',
		arcStartOpacity: 0.5,
		arcEnd: '#2E8FD8',
		needleColor: '#2E8FD8',
		needleGlowOuter: 'rgba(46,143,216,0.25)',
		needleGlowInner: 'rgba(46,143,216,0.45)',
		tipColor: '#5AB4EF',
		label: 'BREAK',
	},
};

const SVG_SIZE = 380;
const C = SVG_SIZE / 2;
const OUTER_R = 172;
const INNER_R = 155;
const TICK_COUNT = 96;
const ARC_R = (OUTER_R + INNER_R) / 2;
const ARC_THICK = OUTER_R - INNER_R;
const NEEDLE_TIP_R = 175;
const NEEDLE_BASE_R = 110;

function polarToXY(angleDeg: number, r: number) {
	const rad = ((angleDeg - 90) * Math.PI) / 180;
	return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function describeArc(startDeg: number, endDeg: number, r: number) {
	if (Math.abs(endDeg - startDeg) < 0.1) return '';
	const largeArc = endDeg - startDeg > 180 ? 1 : 0;
	const s = polarToXY(startDeg, r);
	const e = polarToXY(endDeg, r);
	return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

export function TimerRing({
	seconds,
	totalSeconds,
	mode = 'focus',
}: {
	seconds: number;
	totalSeconds: number;
	mode?: TimerMode;
}) {
	const v = TIMER_VARIANTS[mode];

	const progress = 1 - seconds / totalSeconds;
	const progressDeg = progress * 360;
	const showNeedle = progress > 0;

	const tip = polarToXY(progressDeg, NEEDLE_TIP_R);
	const base = polarToXY(progressDeg, NEEDLE_BASE_R);

	const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
	const ss = String(seconds % 60).padStart(2, '0');

	const gradX2 = C + ARC_R * Math.cos(((progressDeg - 90) * Math.PI) / 180);
	const gradY2 = C + ARC_R * Math.sin(((progressDeg - 90) * Math.PI) / 180);

	return (
		<svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
			<defs>
				<linearGradient
					id='arcGrad'
					gradientUnits='userSpaceOnUse'
					x1={C}
					y1={C - ARC_R}
					x2={gradX2}
					y2={gradY2}
				>
					<stop offset='0%' stopColor={v.arcStart} stopOpacity={v.arcStartOpacity} />
					<stop offset='100%' stopColor={v.arcEnd} stopOpacity={1} />
				</linearGradient>

				<filter id='needleGlow' x='-50%' y='-50%' width='200%' height='200%'>
					<feGaussianBlur stdDeviation='5' result='blur' />
					<feMerge>
						<feMergeNode in='blur' />
						<feMergeNode in='SourceGraphic' />
					</feMerge>
				</filter>

				<filter id='dotGlow' x='-100%' y='-100%' width='300%' height='300%'>
					<feGaussianBlur stdDeviation='3.5' result='blur' />
					<feMerge>
						<feMergeNode in='blur' />
						<feMergeNode in='SourceGraphic' />
					</feMerge>
				</filter>
			</defs>

			{/* TICK MARKS */}
			{Array.from({ length: TICK_COUNT }, (_, i) => {
				const angleDeg = (i / TICK_COUNT) * 360;
				const isMajor = i % 8 === 0;
				const inR = isMajor ? INNER_R - 6 : INNER_R + 2;
				const outR = isMajor ? OUTER_R + 4 : OUTER_R - 2;
				const passed = angleDeg < progressDeg;
				const p1 = polarToXY(angleDeg, inR);
				const p2 = polarToXY(angleDeg, outR);
				return (
					<line
						key={i}
						x1={p1.x}
						y1={p1.y}
						x2={p2.x}
						y2={p2.y}
						stroke={
							passed
								? 'rgba(255,255,255,0.07)'
								: isMajor
									? 'rgba(255,255,255,0.55)'
									: 'rgba(255,255,255,0.25)'
						}
						strokeWidth={isMajor ? 2.5 : 1.2}
						strokeLinecap='round'
					/>
				);
			})}

			{/* PROGRESS ARC */}
			{showNeedle && progressDeg > 1 && (
				<path
					d={describeArc(0, progressDeg, ARC_R)}
					fill='none'
					stroke='url(#arcGrad)'
					strokeWidth={ARC_THICK + 6}
					strokeLinecap='round'
					opacity={0.65}
				/>
			)}

			{/* NEEDLE */}
			{showNeedle && (
				<g>
					<line
						x1={base.x}
						y1={base.y}
						x2={tip.x}
						y2={tip.y}
						stroke={v.needleGlowOuter}
						strokeWidth={10}
						strokeLinecap='round'
					/>
					<line
						x1={base.x}
						y1={base.y}
						x2={tip.x}
						y2={tip.y}
						stroke={v.needleGlowInner}
						strokeWidth={6}
						strokeLinecap='round'
					/>
					<line
						x1={base.x}
						y1={base.y}
						x2={tip.x}
						y2={tip.y}
						filter='url(#needleGlow)'
						stroke={v.needleColor}
						strokeWidth={3.5}
						strokeLinecap='round'
					/>
					<circle filter='url(#dotGlow)' cx={tip.x} cy={tip.y} r={4.5} fill={v.tipColor} />
				</g>
			)}

			{/* CENTER TEXT */}
			<text
				x={C}
				y={C - SVG_SIZE * 0.016}
				textAnchor='middle'
				dominantBaseline='middle'
				fill='rgba(255,255,255,0.92)'
				fontSize={SVG_SIZE * 0.148}
				fontWeight={600}
				fontFamily="-apple-system, 'SF Pro Display', system-ui, sans-serif"
			>
				{mm}:{ss}
			</text>
			<text
				x={C}
				y={C + SVG_SIZE * 0.09}
				textAnchor='middle'
				dominantBaseline='middle'
				fill='rgba(255,255,255,0.28)'
				fontSize={SVG_SIZE * 0.032}
				fontWeight={400}
				fontFamily='system-ui'
				letterSpacing={3}
			>
				{v.label}
			</text>
		</svg>
	);
}
