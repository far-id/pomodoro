import { ErrorPageLayout } from '../components/ErrorPageLayout';

export default function NotFound() {
	return (
		<ErrorPageLayout
			errorCode='404'
			heading="Looks like you're out of focus"
			description="The page you're looking for has timed out or moved to a different workspace. Let's get you back on track to productivity."
		/>
	);
}
