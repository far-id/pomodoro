import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '../hooks/useSettings';
import z from 'zod';

const formSchema = z.object({
	pomodoroDuration: z.number(),
	shortBreakDuration: z.number(),
	longBreakDuration: z.number(),
	autoStartBreaks: z.boolean(),
	autoStartPomodoros: z.boolean(),
	longBreakInterval: z.number(),
	soundNotification: z.boolean(),
	browserNotification: z.boolean(),
});

export const SettingsForm = ({ id }: { id: string }) => {
	const { settings, updateSettings } = useSettings();

	const form = useForm({
		defaultValues: settings,
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const result = await updateSettings(value);
			if (result.error) {
				toast.error(result.message);
			} else {
				toast.success(result.message);
			}
		},
	});
	return (
		<form
			id={id}
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
						<form.Field name='pomodoroDuration'>
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
						<form.Field name='shortBreakDuration'>
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
						<form.Field name='longBreakDuration'>
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
						<form.Field name='autoStartBreaks'>
							{(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<div className='flex items-center justify-between'>
											<div>
												<FieldLabel htmlFor={field.name}>Auto-start Break</FieldLabel>
												<p className='text-muted-foreground text-xs'>Focus starts automatically</p>
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
						<form.Field name='autoStartPomodoros'>
							{(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<div className='flex items-center justify-between'>
											<div>
												<FieldLabel htmlFor={field.name}>Auto-start Pomodoro</FieldLabel>
												<p className='text-muted-foreground text-xs'>Focus starts automatically</p>
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
						<form.Field name='browserNotification'>
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
												<p className='text-muted-foreground text-xs'>Play tone when timer end</p>
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
					<p className='text-muted-foreground'>Long Break</p>
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
	);
};
