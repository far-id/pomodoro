import {
	SUPPORTED_OAUTH_PROVIDERS,
	SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from '@/lib/o-auth.provider';
import { authClient } from '@/lib/auth-client';
import { ActionButton } from '@/components/ui/action-button';

export const OAuthLogin = () => {
	return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
		const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].icon;
		return (
			<ActionButton
				action={async () => {
					const res = await authClient.signIn.social({
						provider,
						callbackURL: '/dashboard',
					});
					if (res.error) {
						return { error: true, message: res.error.message };
					} else {
						return { error: false, message: 'Successfull' };
					}
				}}
				variant={'outline'}
				className='w-full my-2'
				key={provider}
			>
				<Icon className='mr-2' />
				{SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
			</ActionButton>
		);
	});
};
