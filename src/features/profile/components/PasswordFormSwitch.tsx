import { ChangePasswordForm } from './ChangePasswordForm';
import { SetNewPasswordForm } from '@/components/SetNewPasswordForm';
import { SetPasswordButton } from './SetPasswordButton';
import type { ProfileType } from '../types/profile.type';

type Props = Pick<ProfileType, 'hasPassword' | 'token'> & {
	email: string;
	navigateTo: string;
};

export const PasswordFormSwitch = ({ hasPassword, token, email, navigateTo }: Props) => {
	if (hasPassword) return <ChangePasswordForm />;
	if (token) return <SetNewPasswordForm navigateTo={navigateTo} token={token} />;
	return <SetPasswordButton email={email} />;
};
