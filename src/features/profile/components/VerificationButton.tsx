import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export const VerificationButton = ({ email }: { email: string }) => {
	const verify = () => {
		authClient.sendVerificationEmail(
			{ email },
			{
				onSuccess: () => {
					toast.success('Verification email sent', {
						position: 'top-right',
					});
				},
				onError: (ctx) => {
					toast.error(ctx.error.message, {
						position: 'top-right',
					});
				},
			},
		);
	};
	return (
		<Button variant={'outline'} onClick={verify}>
			Verify
		</Button>
	);
};
