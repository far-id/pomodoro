import * as Bowser from 'bowser';

export function parseDevice(userAgent: string) {
	const parser = Bowser.getParser(userAgent);
	const platform = parser.getPlatformType();
	const browser = parser.getBrowserName();
	const os = parser.getOSName();
	return {
		platform,
		browser,
		os,
		parser,
		label: `${platform} ${browser} ${os}`,
	};
}
