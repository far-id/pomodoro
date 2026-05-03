import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '../components/SignUpForm';
import { OAuthLogin } from '../components/OAuthLogin';
import { Separator } from '@/components/ui/separator';

export default function SignUp() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center text-2xl font-bold text-primary tracking-tight'>
					Pomondoro
				</CardTitle>
				<h1 className='text-center text-4xl font-bold tracking-normal'>Create Your Account</h1>
				<p className='text-muted-foreground text-center'>
					Start your journy to deep focus and productivity
				</p>
			</CardHeader>
			<CardContent>
				<OAuthLogin />
				<div className='flex my-4 items-center gap-4'>
					<Separator className='flex-1' />
					<span>or</span>
					<Separator className='flex-1' />
				</div>
				<SignUpForm />
			</CardContent>
		</Card>
	);
}
