import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import z from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from '@tanstack/react-router';

const formSchema = z
	.object({
		currentPassword: z.string().min(8),
		newPassword: z.string().min(8),
		newPasswordConfirmation: z.string().min(8),
		revokeOtherSessions: z.boolean(),
	})
	.refine((data) => data.newPassword === data.newPasswordConfirmation, {
		message: 'New passwords do not match',
		path: ['newPasswordConfirmation'],
	});

export const ChangePasswordForm = () => {
	const form = useForm({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			newPasswordConfirmation: '',
			revokeOtherSessions: false,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.changePassword(
				{
					currentPassword: value.currentPassword,
					newPassword: value.newPassword,
					revokeOtherSessions: value.revokeOtherSessions,
				},
				{
					onSuccess: () => {
						toast.success('Password updated successfully', {
							position: 'top-right',
						});
						form.reset();
					},
					onError: (ctx) => {
						toast.error(ctx.error.message, {
							position: 'top-right',
						});
					},
				},
			);
		},
	});
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup className='space-y-1'>
				<form.Field name='currentPassword'>
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
								<PasswordInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder='********'
									autoComplete='off'
									required
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>
				<div className='flex flex-col md:flex-row gap-4 item-center justify-center'>
					<form.Field name='newPassword'>
						{(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>New Password</FieldLabel>
									<PasswordInput
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder='********'
										autoComplete='off'
										required
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
					<form.Field name='newPasswordConfirmation'>
						{(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
									<PasswordInput
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder='********'
										autoComplete='off'
										required
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</div>

				<form.Field name='revokeOtherSessions'>
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<FieldGroup data-slot='checkbox-group'>
								<Field orientation='horizontal' data-invalid={isInvalid}>
									<Checkbox
										id={field.name}
										name={field.name}
										checked={field.state.value}
										onCheckedChange={(checked) => field.handleChange(checked === true)}
									/>
									<FieldLabel htmlFor={field.name}>Revoke other sessions</FieldLabel>
								</Field>
							</FieldGroup>
						);
					}}
				</form.Field>
				<Field>
					<form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<Button type='submit' className='w-full' disabled={!canSubmit}>
								<LoadingSwap isLoading={isSubmitting}>Change Password</LoadingSwap>
							</Button>
						)}
					</form.Subscribe>
				</Field>
			</FieldGroup>
		</form>
	);
};
