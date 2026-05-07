import {
	SUPPORTED_OAUTH_PROVIDERS,
	SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from '@/lib/o-auth.provider';
import type { Account } from '../types/profile.type';
import { ActionButton } from '@/components/ui/action-button';
import { authClient } from '@/lib/auth-client';
import { Separator } from '@/components/ui/separator';
import { ConnectAccountButton } from './ConnectAccountButton';

export const ConnectAnotherAccount = ({ accounts }: { accounts: Account[] }) => {
	const unconnectedProviders = SUPPORTED_OAUTH_PROVIDERS.filter(
		(p) => !accounts.some((a) => a.providerId === p),
	);
	if (unconnectedProviders.length === 0) return null;
	return (
		<>
			<Separator />
			<p className='text-xs text-muted-foreground'>+ Connet another account</p>
			<div className='flex gap-2'>
				{unconnectedProviders.map((provider) => (
					<ConnectAccountButton key={provider} provider={provider} />
				))}
			</div>
		</>
	);
};
