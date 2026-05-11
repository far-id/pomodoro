let intervalId: ReturnType<typeof setInterval> | null = null;

globalThis.onmessage = (e: MessageEvent<string>) => {
	if (e.data === 'start') {
		if (intervalId !== null) return;
		intervalId = setInterval(() => self.postMessage('tick'), 1000);
	}

	if (e.data === 'stop') {
		if (intervalId !== null) {
			clearInterval(intervalId);
		}
		intervalId = null;
	}
};
