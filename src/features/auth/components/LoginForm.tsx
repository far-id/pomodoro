import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from '@tanstack/react-form';
import { Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import z from 'zod';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { resolveRedirect } from '@/lib/utils';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const LoginForm = () => {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						toast.success('Welcome back to Pomondoro!', {
							position: 'top-right',
						});
						navigate({
							to: resolveRedirect(),
						});
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
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>
				<form.Field name='password'>
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<div className='flex items-center justify-between'>
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<Link to='/auth/forgot-password' className='text-primary hover:underline'>
										Forgot Password
									</Link>
								</div>
								<PasswordInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder='********'
									autoComplete='off'
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>
				<Field>
					<form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<Button type='submit' className='mt-4 w-full' disabled={!canSubmit}>
								<LoadingSwap isLoading={isSubmitting}>Login</LoadingSwap>
							</Button>
						)}
					</form.Subscribe>
					<FieldDescription className='text-center'>
						Don&apos;t have an account?{' '}
						<Link to='/auth/sign-up' className='text-primary '>
							Sign up
						</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
};
