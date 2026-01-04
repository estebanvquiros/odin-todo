const events = {};

function subscribe(event, fn) {
	if (!events[event]) {
		events[event] = [];
	}
	events[event].push(fn);
}

function publish(event, data) {
	if (!events[event]) return;
	events[event].forEach(fn => fn(data));
}

export { subscribe, publish };