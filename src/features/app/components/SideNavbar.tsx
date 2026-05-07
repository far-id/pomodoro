import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from '@tanstack/react-router';
import {
	FolderKanban,
	LayoutDashboard,
	ListTodo,
	SlidersHorizontal,
	TimerIcon,
} from 'lucide-react';
import { useSettingDrawerToggleStore } from '../hooks/useSettingDrawerToggleStore';

export const SideNavbar = () => {
	const { setIsOpen } = useSettingDrawerToggleStore();
	return (
		<aside className='fixed md:flex w-full z-50 md:w-64 flex-col h-16 md:h-screen bg-sidebar text-sidebar-foreground left-0 md:top-0 bottom-0'>
			{/* desktop */}
			<div className='hidden md:flex flex-col md:justify-between h-full p-4'>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-x-2 justify-center items-center'>
						<div className='bg-primary h-3/4 aspect-square rounded-md flex items-center justify-center text-white'>
							<TimerIcon width={34} />
						</div>
						<div className='flex flex-col items-start gap-0 text-balance'>
							<p className='text-2xl font-bold text-primary tracking-tight'>Pomondoro</p>
							<span className='text-xs font-light text-muted-foreground tracking-widest  uppercase'>
								STAY FOCUSED
							</span>
						</div>
					</div>
					<nav>
						<ul className='flex flex-col gap-2'>
							<NavLink to={'/dashboard'} label={'Dashboard'} />
							<NavLink to={'/projects'} label={'Projects'} />
							<NavLink to={'/tasks'} label={'Tasks'} />
							<NavItem>
								<button
									onClick={() => setIsOpen(true)}
									className='capitalize w-full text-left py-1 px-2'
								>
									Settings
								</button>
							</NavItem>
						</ul>
					</nav>
					<Separator />
					<div>
						<h3 className='text-primary font-semibold tracking-tighter'>Favorite Projects</h3>
						<nav className='overflow-y-auto max-h-50 [&::-webkit-scrollbar]:w-0'>
							<ul className='flex flex-col gap-2'>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
								<NavItem>Project 1</NavItem>
							</ul>
						</nav>
					</div>
				</div>

				<div className='flex flex-col'>
					<Button className=''>Start Focus</Button>
					<Button variant={'secondary'}>Add project</Button>
				</div>
			</div>
			{/* mobile */}
			<div className='md:hidden flex flex-col justify-center items-center h-full p-4 border-t'>
				<ul className='w-full'>
					<li className='flex justify-center-safe gap-x-4'>
						<Link to={'/dashboard'} className='group'>
							<div className='flex flex-col items-center gap-1 group-[.active]:bg-primary/10 p-1 rounded-md'>
								<LayoutDashboard className='w-8 h-8 stroke-2 group-[.active]:stroke-primary stroke-muted-foreground' />
								<span className='group-[.active]:text-primary text-sm text-muted-foreground'>
									Dashboard
								</span>
							</div>
						</Link>
						<Link to={'/projects'} className='group'>
							<div className='flex flex-col items-center gap-1 group-[.active]:bg-primary/10 p-1 rounded-md'>
								<FolderKanban className='w-8 h-8 stroke-2 group-[.active]:stroke-primary stroke-muted-foreground' />
								<span className='group-[.active]:text-primary text-sm text-muted-foreground'>
									Projects
								</span>
							</div>
						</Link>
						<div className='flex items-center justify-center'>
							<button className='bg-primary text-white p-3 rounded-full shadow-lg'>
								<TimerIcon className='w-6 h-6' />
							</button>
						</div>
						<Link to={'/tasks'} className='group'>
							<div className='flex flex-col items-center gap-1 group-[.active]:bg-primary/10 p-1 rounded-md'>
								<ListTodo className='w-8 h-8 stroke-2 group-[.active]:stroke-primary stroke-muted-foreground' />
								<span className='group-[.active]:text-primary text-sm text-muted-foreground'>
									Tasks
								</span>
							</div>
						</Link>
						<button onClick={() => setIsOpen(true)} className='group'>
							<div className='flex flex-col items-center gap-1 group-[.active]:bg-primary/10 p-1 rounded-md'>
								<SlidersHorizontal className='w-8 h-8 stroke-2 group-[.active]:stroke-primary stroke-muted-foreground' />
								<span className='group-[.active]:text-primary text-sm text-muted-foreground'>
									Settings
								</span>
							</div>
						</button>
					</li>
				</ul>
			</div>
		</aside>
	);
};

const NavItem = ({ children }: { children: React.ReactNode }) => (
	<li className='w-full relative rounded-md border border-gray-300'>{children}</li>
);

const NavLink = ({ to, label }: { to: string; label: string }) => (
	<NavItem>
		<Link className='flex px-2 py-1' to={to}>
			{label}
		</Link>
	</NavItem>
);
