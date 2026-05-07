import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '#/db';
import { resetPasswordRequest } from '@/email/resetPasswordRequest';
import { verificationEmail } from '@/email/verificationEmail';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			resetPasswordRequest({ user, url });
		},
		resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: false,
		revokeSessionsOnPasswordReset: true,
		sendVerificationEmail: async ({ user, url }) => {
			verificationEmail({ user, url });
		},
		expiresIn: 60 * 60, // 1 hour
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // refresh session every 24 hours
		cookieCache: {
			enabled: true,
			maxAge: 30 * 60, // 30 minutes
		},
	},
	account: {
		encryptOAuthTokens: true, // Encrypt OAuth tokens before storing them in the database
		storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
		accountLinking: {
			enabled: true,
			trustedProviders: ['google', 'github', 'email-password'],
			allowDifferentEmails: false,
			allowUnlinkingAll: false,
		},
	},
	plugins: [tanstackStartCookies()],
});
