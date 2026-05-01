import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheckBig, Clock, EllipsisVertical, Plus } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

export default function Projects() {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col'>
					<h1 className='font-semibold tracking-wide text-4xl'>Projects</h1>
					<p className='text-secondary-foreground'>
						Manage your focused workflows and track progress.
					</p>
				</div>
				<Button variant={'default'} className='rounded-full pl-5 pr-6 py-2'>
					<Plus />
					New Project
				</Button>
			</div>
			<div className='grid grid-cols-2 gap-4 md:grid-cols-4 w-full'>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-md text-muted-foreground'>Completed Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='font-bold text-2xl'>
							6<span className='font-normal'>/</span>
							<span className='text-lg font-normal'>7</span>
						</p>
					</CardContent>
				</Card>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-md text-muted-foreground'>Completed Tasks</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='font-bold text-2xl whitespace-nowrap'>
							6<span className='font-normal'>/</span>
							<span className='text-lg font-normal'>7</span>
						</p>
					</CardContent>
				</Card>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-md text-muted-foreground'>Total Focus Time</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='font-bold text-2xl'>6H 22M</p>
					</CardContent>
				</Card>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-md text-muted-foreground'>Archived Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='font-bold text-2xl'>6</p>
					</CardContent>
				</Card>
			</div>
			<div className='flex flex-col gap-4'>
				<div className='container mx-auto py-10'>
					<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<div className='rounded-full w-4 h-4 bg-primary' />
									Project 1
								</CardTitle>
								<CardAction>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Add Task</DropdownMenuItem>
												<DropdownMenuItem>Details</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardAction>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Progress</span>
										<span>40%</span>
									</div>
									<Progress value={40} className='w-full' />
								</div>
								<div className='flex gap-3 items-center'>
									<Clock />
									<span>8h 12m</span>
									<CircleCheckBig />
									<span>12/13</span>
								</div>
								<div className='flex justify-between items-center'>
									<span>Last focus: 2h ago</span>
									<Button variant={'outline'}>Focus</Button>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<div className='rounded-full w-4 h-4 bg-primary' />
									Project 1
								</CardTitle>
								<CardAction>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Add Task</DropdownMenuItem>
												<DropdownMenuItem>Details</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardAction>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Progress</span>
										<span>40%</span>
									</div>
									<Progress value={40} className='w-full' />
								</div>
								<div className='flex gap-3 items-center'>
									<Clock />
									<span>8h 12m</span>
									<CircleCheckBig />
									<span>12/13</span>
								</div>
								<div className='flex justify-between items-center'>
									<span>Last focus: 2h ago</span>
									<Button variant={'outline'}>Focus</Button>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<div className='rounded-full w-4 h-4 bg-primary' />
									Project 1
								</CardTitle>
								<CardAction>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Add Task</DropdownMenuItem>
												<DropdownMenuItem>Details</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardAction>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Progress</span>
										<span>40%</span>
									</div>
									<Progress value={40} className='w-full' />
								</div>
								<div className='flex gap-3 items-center'>
									<Clock />
									<span>8h 12m</span>
									<CircleCheckBig />
									<span>12/13</span>
								</div>
								<div className='flex justify-between items-center'>
									<span>Last focus: 2h ago</span>
									<Button variant={'outline'}>Focus</Button>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<div className='rounded-full w-4 h-4 bg-primary' />
									Project 1
								</CardTitle>
								<CardAction>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Add Task</DropdownMenuItem>
												<DropdownMenuItem>Details</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardAction>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Progress</span>
										<span>40%</span>
									</div>
									<Progress value={40} className='w-full' />
								</div>
								<div className='flex gap-3 items-center'>
									<Clock />
									<span>8h 12m</span>
									<CircleCheckBig />
									<span>12/13</span>
								</div>
								<div className='flex justify-between items-center'>
									<span>Last focus: 2h ago</span>
									<Button variant={'outline'}>Focus</Button>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<div className='rounded-full w-4 h-4 bg-primary' />
									Project 1
								</CardTitle>
								<CardAction>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Add Task</DropdownMenuItem>
												<DropdownMenuItem>Details</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardAction>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Progress</span>
										<span>40%</span>
									</div>
									<Progress value={40} className='w-full' />
								</div>
								<div className='flex gap-3 items-center'>
									<Clock />
									<span>8h 12m</span>
									<CircleCheckBig />
									<span>12/13</span>
								</div>
								<div className='flex justify-between items-center'>
									<span>Last focus: 2h ago</span>
									<Button variant={'outline'}>Focus</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
