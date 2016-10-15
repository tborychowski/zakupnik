let handler, defaultRoute;


function onChange () {
	let hash = location.hash.substr(1);
	if (!hash && defaultRoute) hash = location.hash = defaultRoute;
	handler(hash);
}


function router (cfg) {
	handler = cfg.handler || function () {};
	defaultRoute = cfg.default || '';

	window.addEventListener('hashchange', onChange);
	onChange();
}

export default router;
