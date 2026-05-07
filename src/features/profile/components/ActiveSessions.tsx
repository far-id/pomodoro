import { LaptopMinimal, Smartphone } from 'lucide-react';
import { useSessions } from '../hooks/useSessions';
import type { ProfileType } from '../types/profile.type';
import { parseDevice } from '../utils/session.utils';
import type { Session } from 'better-auth';
import { formatDate } from '@/utils/time.utils';
import { ActionButton } from '@/components/ui/action-button';
import { authClient } from '@/lib/auth-client';
import { Badge } from '@/components/ui/badge';
import { useQueryClient } from '@tanstack/react-query';

export const ActiveSessions = ({
	currentSessionToken,
}: Pick<ProfileType, 'currentSessionToken'>) => {
	const queryClient = useQueryClient();
	const { data: sessions, isPending, isError } = useSessions();

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	const currentSession = sessions.find((s) => s.token === currentSessionToken);
	const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);

	const handleRevoke = () => {
		queryClient.invalidateQueries({ queryKey: ['sessions'] });
	};

	return (
		<div className='flex flex-col'>
			{currentSession && <SessionCard session={currentSession} isCurrent />}
			{otherSessions.map((s) => (
				<SessionCard key={s.id} session={s} handleRevoke={handleRevoke} />
			))}
		</div>
	);
};

const SessionCard = ({
	session,
	isCurrent = false,
	handleRevoke,
}: {
	session: Session;
	isCurrent?: boolean;
	handleRevoke?: () => void;
}) => {
	const device = parseDevice(session.userAgent ?? '');
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-x-3 justify-start'>
				<div className='bg-secondary h-3/4 aspect-square rounded-md flex items-center justify-center text-white'>
					{device.platform === 'mobile' ? (
						<Smartphone className='' />
					) : (
						<LaptopMinimal className='stroke-secondary-foreground' />
					)}
				</div>
				<div className='flex flex-col items-start gap-0 text-balance'>
					<div className='flex'>
						<p className='text-2xl font-bold tracking-tight'>
							{device.browser} on {device.os}
						</p>
						{isCurrent && (
							<Badge variant={'secondary'} className='border-none rounded-sm ml-2'>
								Current
							</Badge>
						)}
					</div>
					<div className='flex gap-x-3'>
						<span className='text-xs font-light text-muted-foreground tracking-widest uppercase'>
							Sience: {formatDate(session.createdAt)}
						</span>
						<span className='text-xs font-light text-muted-foreground tracking-widest uppercase'>
							Expired at: {formatDate(session.expiresAt)}
						</span>
					</div>
				</div>
			</div>
			<div className='flex item-center justify-end gap-x-3'>
				{!isCurrent && (
					<ActionButton
						action={async () => {
							const res = await authClient.revokeSession({
								token: session.token,
							});
							if (res.error) return { error: true, message: res.error.message };
							handleRevoke?.();
							return { error: false, message: 'Session revoked' };
						}}
						variant={'destructiveOutline'}
						className='w-full my-2'
					>
						Revoke
					</ActionButton>
				)}
			</div>
		</div>
	);
};
