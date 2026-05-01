import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import z from 'zod';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { useSettingDrawerToggleStore } from '../hooks/useSettingDrawerToggleStore';

const formSchema = z.object({
	pomodoro: z.number(),
	shortBreak: z.number(),
	longBreak: z.number(),
	autoStartBreak: z.boolean(),
	atuoStartPomodoro: z.boolean(),
	longBreakInterval: z.number(),
	soundNotification: z.boolean(),
	broserNotification: z.boolean(),
});

export const Settings = () => {
	const { isOpen, setIsOpen } = useSettingDrawerToggleStore();

	const form = useForm({
		defaultValues: {
			pomodoro: 25,
			shortBreak: 5,
			longBreak: 15,
			autoStartBreak: true,
			atuoStartPomodoro: false,
			longBreakInterval: 4,
			soundNotification: true,
			broserNotification: true,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsOpen(false);
			toast.success('Form submitted successfully');
		},
	});

	return (
		<Drawer direction={'right'} open={isOpen} onOpenChange={setIsOpen}>
			{/* <DrawerTrigger asChild>
				<button className='capitalize w-full text-left py-1 px-2'>Settings</button>
			</DrawerTrigger> */}
			<DrawerContent className='data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
				<DrawerHeader>
					<div className='flex justify-between'>
						<DrawerTitle className='text-2xl py-2'>Settings</DrawerTitle>
						<DrawerClose>
							<X />
						</DrawerClose>
					</div>
					<Separator />
				</DrawerHeader>
				<div className='no-scrollbar overflow-y-auto px-4'>
					<form
						id='settings'
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className='flex flex-col'
					>
						<FieldGroup className='space-y-3'>
							<div className='flex flex-col gap-3'>
								<p className='text-muted-foreground'>Timer Duration</p>
								<div className='grid grid-cols-3 gap-3'>
									<form.Field name='pomodoro'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Pomodoro</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(Number(e.target.value))}
														aria-invalid={isInvalid}
														placeholder='in minutes'
														autoComplete='off'
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
									<form.Field name='shortBreak'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Short Break</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(Number(e.target.value))}
														aria-invalid={isInvalid}
														placeholder='in minutes'
														autoComplete='off'
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
									<form.Field name='longBreak'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Long Break</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(Number(e.target.value))}
														aria-invalid={isInvalid}
														placeholder='in minutes'
														autoComplete='off'
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
								</div>
							</div>
							<FieldSeparator />
							<div className='flex flex-col gap-3'>
								<p className='text-muted-foreground'>Automation</p>
								<div className='flex flex-col w-full gap-2'>
									<form.Field name='autoStartBreak'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className='flex items-center justify-between'>
														<div>
															<FieldLabel htmlFor={field.name}>Auto-start Break</FieldLabel>
															<p className='text-muted-foreground text-xs'>
																Focus starts autotamically
															</p>
														</div>
														<Switch
															size='lg'
															id={field.name}
															name={field.name}
															checked={field.state.value}
															onCheckedChange={field.handleChange}
														/>
													</div>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
									<form.Field name='atuoStartPomodoro'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className='flex items-center justify-between'>
														<div>
															<FieldLabel htmlFor={field.name}>Auto-start Pomodoro</FieldLabel>
															<p className='text-muted-foreground text-xs'>
																Focus starts autotamically
															</p>
														</div>
														<Switch
															size='lg'
															id={field.name}
															name={field.name}
															checked={field.state.value}
															onCheckedChange={field.handleChange}
														/>
													</div>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
								</div>
							</div>
							<FieldSeparator />
							<div className='flex flex-col gap-3'>
								<p className='text-muted-foreground'>Notifications</p>
								<div className='flex flex-col w-full gap-2'>
									<form.Field name='broserNotification'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className='flex items-center justify-between'>
														<div className='flex flex-col'>
															<FieldLabel htmlFor={field.name}>Browser Notification</FieldLabel>
															<p className='text-muted-foreground text-xs'>
																Receive browser notifications
															</p>
														</div>
														<Switch
															size='lg'
															id={field.name}
															name={field.name}
															checked={field.state.value}
															onCheckedChange={field.handleChange}
														/>
													</div>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
									<form.Field name='soundNotification'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className='flex items-center justify-between'>
														<div className='flex flex-col'>
															<FieldLabel htmlFor={field.name}>Sound Notification</FieldLabel>
															<p className='text-muted-foreground text-xs'>
																Play tone when timer end
															</p>
														</div>
														<Switch
															size='lg'
															id={field.name}
															name={field.name}
															checked={field.state.value}
															onCheckedChange={field.handleChange}
														/>
													</div>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
								</div>
							</div>
							<FieldSeparator />
							<div className='flex flex-col gap-3'>
								<p className='text-muted-foreground'>Notifications</p>
								<div className='flex flex-col w-full gap-3'>
									<form.Field name='longBreakInterval'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className='flex items-center justify-between'>
														<div className='flex flex-col'>
															<FieldLabel htmlFor={field.name}>Long Break Interval</FieldLabel>
															<p className='text-muted-foreground text-xs'>
																Pomodoro count before long break
															</p>
														</div>
														<Input
															className='w-16'
															id={field.name}
															name={field.name}
															value={field.state.value}
															onBlur={field.handleBlur}
															onChange={(e) => field.handleChange(Number(e.target.value))}
															aria-invalid={isInvalid}
															placeholder='in minutes'
															autoComplete='off'
														/>
													</div>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
								</div>
							</div>
						</FieldGroup>
					</form>
				</div>
				<DrawerFooter className='border-t'>
					<Field orientation='horizontal'>
						<Button type='submit' className='w-full' form='settings'>
							Apply
						</Button>
					</Field>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
