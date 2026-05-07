import type { User } from 'better-auth';

export type ProfileType = {
	user: User;
	hasPassword: boolean;
	token: string | null;
	accounts: Account[];
	currentSessionToken: string;
};

export type Account = {
	scopes: string[];
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	providerId: string;
	accountId: string;
};
