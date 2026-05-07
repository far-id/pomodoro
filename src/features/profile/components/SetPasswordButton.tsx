import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export const SetPasswordButton = ({ email }: { email: string }) => {
	const handleClick = async () => {
		await authClient.requestPasswordReset(
			{ email, redirectTo: '/profile' },
			{
				onSuccess: () => {
					toast.success('Passowrd reset email sent');
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);
	};
	return (
		<div className='flex '>
			<Button variant={'outline'} onClick={handleClick}>
				Set New Password
			</Button>
		</div>
	);
};
