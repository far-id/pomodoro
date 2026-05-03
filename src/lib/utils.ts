import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// to ensure the redirect is start with /
export function resolveRedirect(to?: string): string {
	if (!to) return '/dashboard';
	return to.startsWith('/') ? to : `/${to}`;
}
