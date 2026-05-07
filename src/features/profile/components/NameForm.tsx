import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { useForm } from '@tanstack/react-form';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const NameForm = ({ name }: { name: string }) => {
	const form = useForm({
		defaultValues: {
			name,
		},
		onSubmit: async ({ value }) => {
			await authClient.updateUser(
				{
					name: value.name,
				},
				{
					onSuccess: () => {
						toast.success('Name updated successfully');
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
			setActive(false);
		},
	});

	const [active, setActive] = useState(false);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field name='name'>
				{(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<FieldGroup>
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Name</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder='Full Name'
									autoComplete='off'
									required
									onFocus={() => setActive(true)}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
							<Field>
								{active && (
									<div className='flex relative justify-end -mt-4'>
										<form.Subscribe
											selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
										>
											{([canSubmit, isSubmitting]) => (
												<div className='flex absolute z-50 gap-1'>
													<Button size={'xs'} className='z-50' type='submit' disabled={!canSubmit}>
														<LoadingSwap isLoading={isSubmitting}>
															<Check />
														</LoadingSwap>
													</Button>
													<Button
														type='button'
														size={'xs'}
														variant={'outline'}
														onClick={() => {
															form.reset();
															setActive(false);
														}}
													>
														<X />
													</Button>
												</div>
											)}
										</form.Subscribe>
									</div>
								)}
							</Field>
						</FieldGroup>
					);
				}}
			</form.Field>
		</form>
	);
};
