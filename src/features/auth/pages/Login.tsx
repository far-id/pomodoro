import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LoginForm } from '../components/LoginForm';
import { OAuthLogin } from '../components/OAuthLogin';

export default function Login() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center text-2xl font-bold text-primary tracking-tight'>
					Pomondoro
				</CardTitle>
				<h1 className='text-center text-4xl font-bold tracking-normal'>Welcome back</h1>
				<p className='text-muted-foreground text-center'>Sign in to continue your focus</p>
			</CardHeader>
			<CardContent>
				<OAuthLogin />
				<div className='flex my-4 items-center gap-4'>
					<Separator className='flex-1' />
					<span>or</span>
					<Separator className='flex-1' />
				</div>
				<LoginForm />
			</CardContent>
		</Card>
	);
}
