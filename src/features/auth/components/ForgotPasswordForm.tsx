import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import z from 'zod';

const formSchema = z.object({
	email: z.email(),
});

export function ForgotPasswordForm() {
	const form = useForm({
		defaultValues: {
			email: '',
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.requestPasswordReset(
				{
					email: value.email,
					redirectTo: '/auth/reset-password',
				},
				{
					onSuccess: () => {
						toast.success('Passowrd reset email sent');
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field name='email'>
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder='example@pomondoro.com'
									autoComplete='off'
									type='email'
									required
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>
				<Field>
					<form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<div className='flex w-full  flex-col gap-4'>
								<Button type='submit' disabled={!canSubmit}>
									<LoadingSwap isLoading={isSubmitting}>Send Reset Email</LoadingSwap>
								</Button>
								<Button variant={'outline'} onClick={() => history.back()}>
									Back
								</Button>
							</div>
						)}
					</form.Subscribe>
				</Field>
			</FieldGroup>
		</form>
	);
}
