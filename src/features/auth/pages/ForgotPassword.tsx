import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export default function ForgotPassword() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center text-2xl font-bold text-primary tracking-tight'>
					Pomondoro
				</CardTitle>
				<h1 className='text-center text-4xl font-bold tracking-normal'>Reset Your Password</h1>
				<p className='text-muted-foreground text-center'>
					Enter your email address and we`ll send you a link to reset your password
				</p>
			</CardHeader>
			<CardContent>
				<ForgotPasswordForm />
			</CardContent>
		</Card>
	);
}
