import { cva, type VariantProps } from 'class-variance-authority';
import { CircleUserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

const profileVariant = cva('', {
	variants: {
		size: {
			sm: '30',
			md: '45',
			lg: '60',
		},
	},
	defaultVariants: {
		size: 'sm',
	},
});

export const ProfileAvatar = ({
	size = 'sm',
	className,
	image,
	name,
}: VariantProps<typeof profileVariant> & {
	className?: string;
	image: string | null | undefined;
	name: string;
}) => {
	return (
		<>
			{image ? (
				<img
					className={cn('rounded-full', className)}
					width={profileVariant({ size })}
					height={profileVariant({ size })}
					src={image}
					alt={name}
					referrerPolicy='no-referrer'
				/>
			) : (
				<CircleUserRound className={className} size={profileVariant({ size })} strokeWidth={1.2} />
			)}
		</>
	);
};
