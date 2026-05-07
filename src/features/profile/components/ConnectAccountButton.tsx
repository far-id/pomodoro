import { ActionButton } from '@/components/ui/action-button';
import { authClient } from '@/lib/auth-client';
import {
	SUPPORTED_OAUTH_PROVIDERS_DETAILS,
	type SupportedOAuthProvider,
} from '@/lib/o-auth.provider';

export const ConnectAccountButton = ({ provider }: { provider: SupportedOAuthProvider }) => {
	const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].icon;
	return (
		<ActionButton
			key={provider}
			action={async () => {
				const res = await authClient.linkSocial({
					provider,
					callbackURL: '/profile',
				});
				if (res.error) return { error: true, message: res.error.message };
				return { error: false, message: 'Account connected' };
			}}
			variant='outline'
		>
			<Icon className='mr-2' />
			{SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
		</ActionButton>
	);
};
