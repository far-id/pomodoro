import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';
import { NameForm } from '../components/NameForm';
import { Badge } from '@/components/ui/badge';
import { VerificationButton } from '../components/VerificationButton';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { PasswordFormSwitch } from '../components/PasswordFormSwitch';
import type { ProfileType } from '../types/profile.type';
import { ConnectedAccountCard } from '../components/ConnectedAccountCard';
import { ConnectAnotherAccount } from '../components/ConnectAnotherAccount';
import { ActiveSessions } from '../components/ActiveSessions';
import { RevokeAllOtherSessionButton } from '../components/RevokeAllOtherSessionButton';

export default function ProfilePage({
	user,
	hasPassword,
	token,
	accounts,
	currentSessionToken,
}: ProfileType) {
	return (
		<div className='flex flex-col gap-4 w-full md:w-3/4 lg:w-3/5'>
			<div className='flex flex-col'>
				<h1 className='font-semibold tracking-wide text-4xl'>Profile</h1>
				<p className='text-secondary-foreground'>Manage your profile.</p>
			</div>
			<Card className='overflow-visible'>
				<CardContent>
					<div className='flex items-center gap-x-3'>
						<ProfileAvatar image={user.image} name={user.name} size={'lg'} />
						<div className='flex-1'>
							<NameForm name={user.name} />
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Email Address</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center gap-x-3 justify-start'>
						<span className='text-lg'>{user.email}</span>
						{user.emailVerified ? (
							<Badge variant='success'>
								<BadgeCheck data-icon='inline-start' />
								Verified
							</Badge>
						) : (
							<VerificationButton email={user.email} />
						)}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex justify-between items-center'>
					<CardTitle>Password</CardTitle>
					<span className='italic text-muted-foreground text-xs'>
						{hasPassword ? 'Has password set' : 'No password set'}
					</span>
				</CardHeader>
				<CardContent>
					<PasswordFormSwitch
						hasPassword={hasPassword}
						token={token}
						email={user.email}
						navigateTo='/profile'
					/>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Conected Accounts</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col gap-2'>
					{accounts.length > 0 ? (
						accounts.map((a) => <ConnectedAccountCard key={a.providerId} account={a} />)
					) : (
						<p className='text-muted-foreground'>No connected accounts</p>
					)}
					<ConnectAnotherAccount accounts={accounts} />
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex justify-between items-center'>
					<CardTitle>Active Sessions</CardTitle>
					<RevokeAllOtherSessionButton />
				</CardHeader>
				<CardContent>
					<ActiveSessions currentSessionToken={currentSessionToken} />
				</CardContent>
			</Card>
		</div>
	);
}
