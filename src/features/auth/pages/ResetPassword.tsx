import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export default function ResetPassword({ token }: { token: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center text-2xl font-bold text-primary tracking-tight'>
					Pomondoro
				</CardTitle>
				<h1 className='text-center text-4xl font-bold tracking-normal'>Set New Password</h1>
				<p className='text-muted-foreground text-center'>Enter your new password</p>
			</CardHeader>
			<CardContent>
				<ResetPasswordForm token={token} />
			</CardContent>
		</Card>
	);
}
