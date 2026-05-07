import { ActionButton } from '@/components/ui/action-button';
import { authClient } from '@/lib/auth-client';
import { useQueryClient } from '@tanstack/react-query';

export const RevokeAllOtherSessionButton = () => {
	const queryClient = useQueryClient();
	return (
		<ActionButton
			variant={'destructive'}
			action={async () => {
				const res = await authClient.revokeOtherSessions();
				if (res.error) return { error: true, message: res.error.message };
				queryClient.invalidateQueries({ queryKey: ['sessions'] });
				return { error: false, message: 'Sessions revoked' };
			}}
		>
			Revoke All Other
		</ActionButton>
	);
};
