import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUserRound, Search } from 'lucide-react';
import { useSettingDrawerToggleStore } from '../hooks/useSettingDrawerToggleStore';
import type { User } from 'better-auth';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from '@tanstack/react-router';

export const TopNavbar = ({ user }: { user: User | null }) => {
	const { setIsOpen } = useSettingDrawerToggleStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: '/auth/login' });
				},
			},
		});
	};

	return (
		<header className='flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/50 flat no shadows'>
			<div className='flex items-center w-full gap-4'>
				<div className='hidden gap-x-2 md:flex items-center bg-surface-container px-3 py-1.5 rounded-full border border-border/50 focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring transition-all'>
					<Search width={14} />
					<input
						className='bg-transparent border-none p-0 text-sm focus:ring-0 w-64 text-foreground placeholder:text-muted-foreground outline-none font-body-sm text-body-sm'
						placeholder='Search...'
						type='text'
					/>
				</div>
			</div>
			<div className='flex items-center justify-end gap-2 w-full'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button>
							{user?.image ? (
								<img className='w-8 h-8 rounded-full' src={user.image} alt={user.name} />
							) : (
								<CircleUserRound strokeWidth={1.2} />
							)}
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-40' align='start'>
						<DropdownMenuGroup>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>
								<button onClick={() => setIsOpen(true)} className='capitalize w-full text-left'>
									Settings
								</button>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<button className='w-full text-left' onClick={handleLogout}>
									Log out
								</button>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
