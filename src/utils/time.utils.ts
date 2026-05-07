export function formatDate(date: Date) {
	return new Date(date).toLocaleDateString('en-ID', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}
