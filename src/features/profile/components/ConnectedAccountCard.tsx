import { Badge } from '@/components/ui/badge';
import type { Account } from '../types/profile.type';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Unlink } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';
import { formatDate } from '@/utils/time.utils';

export const ConnectedAccountCard = ({ account, ...props }: { account: Account }) => {
	const router = useRouter();
	const handleClick = async () => {
		await authClient.unlinkAccount(
			{
				providerId: account.providerId,
				accountId: account.accountId,
			},
			{
				onSuccess: () => {
					toast.success('Account disconnected');
					router.invalidate();
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);
	};
	return (
		<div {...props} className='flex justify-between items-center px-3 py-2 border rounded-lg'>
			<div>
				<p className='text-sm font-semibold capitalize'>{account.providerId}</p>
				<span className='text-xs text-muted-foreground'>
					Since:
					{formatDate(account.createdAt)}
				</span>
			</div>
			<div className='flex items-center justify-end gap-x-2'>
				<Badge variant={'success'} className='border-none rounded-sm '>
					Connected
				</Badge>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant='destructive' size={'sm'}>
							Disconnect
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent size='sm'>
						<AlertDialogHeader>
							<AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
								<Unlink />
							</AlertDialogMedia>
							<AlertDialogTitle>Disconnect Account</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to disconnect your {account.providerId} account?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleClick} variant='destructive'>
								Disconnect
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>{' '}
			</div>
		</div>
	);
};
