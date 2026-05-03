import { ErrorPageLayout } from '../components/ErrorPageLayout';

export default function ServerError() {
	return (
		<ErrorPageLayout
			errorCode='500'
			heading='Looks like our services are out of focus'
			description="We're working hard to get things back on track. Let's get you back on track to productivity."
		/>
	);
}
