import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import { Link } from '@tanstack/react-router';
import { HomeIcon } from 'lucide-react';

export const ErrorPageLayout = ({
	errorCode,
	heading,
	description,
}: {
	errorCode: '404' | '500';
	heading: string;
	description: string;
}) => {
	return (
		<div className='h-screen flex items-center justify-center bg-linear-to-b from-primary/10 to-secondary'>
			<Empty className='h-full bg-muted/30'>
				<EmptyHeader>
					<EmptyMedia variant='default' className='text-primary text-2xl font-bold'>
						{errorCode}
					</EmptyMedia>
					<EmptyTitle className='text-4xl'>{heading}</EmptyTitle>
					<EmptyDescription className='max-w-xs text-pretty'>{description}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Link to='/'>
						<Button variant='outline'>
							<HomeIcon />
							Go Back
						</Button>
					</Link>
				</EmptyContent>
			</Empty>
		</div>
	);
};
