function type (items, field) {
	if (!items || !items.length) return 'str';
	var i, v, t, item;
	for (i = 0; item = items[i]; i++) {
		if (item && item[field]) v = (typeof item[field]);
		if (v === 'number' || v === 'string') t = v.substr(0, 3);
		if (t) break;
	}
	return t || 'str';
}

function sortFn (sort, items) {
	var by = sort.by, order = sort.order, sortType = type(items, by),
		strCmp = function (a, b, by) {
			return ('' + a[by]).toLowerCase().localeCompare(('' + b[by]).toLowerCase());
		};
	// compare as int
	if (sortType === 'num') {
		if (order === 'asc') return function (a, b) { return a[by] - b[by]; };
		else return function (a, b) { return b[by] - a[by]; };
	}
	// compare as strings
	else {
		if (order === 'asc') return function (a, b) { return strCmp(a, b, by); };
		else return function (a, b) { return strCmp(b, a, by); };
	}
}

function closest (el, selector) {
	var has = false;
	while (!has && el) {
		has = el.matches(selector);
		if (has) return el;
		el = el.parentNode;
		if (el.tagName === 'HTML') return null;
	}
	return null;
}


function merge (target, ...sources) {
	if (!target) throw new TypeError('Cannot convert first argument to object');
	var to = Object(target);
	for (let source of sources) {
		let keys = Object.keys(Object(source));
		for (let key of keys) {
			let desc = Object.getOwnPropertyDescriptor(source, key);
			if (desc !== undefined && desc.enumerable) to[key] = source[key];
		}
	}
	return to;
}

if (!Object.assign) Object.defineProperty(Object, 'assign', { value: merge,
	enumerable: false, configurable: true, writable: true
});

export default {
	type,
	sortFn,
	closest
};
