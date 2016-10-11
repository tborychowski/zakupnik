/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _menu = __webpack_require__(17);

	var _menu2 = _interopRequireDefault(_menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_calendar2.default.init(); // import appcache from 'appcache';
	// appcache();

	_menu2.default.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _pikaday = __webpack_require__(10);

	var _pikaday2 = _interopRequireDefault(_pikaday);

	var _moment = __webpack_require__(11);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var tpl = __webpack_require__(13);
	var el,
	    picker,
	    isReady = false,
	    gotoMap = {
		prev: function prev(c) {
			return c.subtract(1, 'days');
		},
		next: function next(c) {
			return c.add(1, 'days');
		},
		prevMonth: function prevMonth(c) {
			return c.subtract(1, 'months');
		},
		nextMonth: function nextMonth(c) {
			return c.add(1, 'months');
		},
		today: function today() {
			return (0, _moment2.default)();
		}
	};

	function goTo(where) {
		picker.setMoment(gotoMap[where](picker.getMoment()));
	}

	function onSelect() {
		_util2.default.trigger('calendar/changed', picker.getMoment());
	}

	function _set(date) {
		picker.setMoment((0, _moment2.default)(date));
	}
	function _get(format) {
		if (!isReady) init();
		if (!format) return picker.getMoment();
		if (format === true) format = 'YYYY-MM-DD';
		return picker.getMoment().format(format);
	}

	function onClick(e) {
		var target = (0, _util2.default)(e.target);
		if (target.is('.btn')) {
			goTo(target.data('go'));
			e.preventDefault();
		}
	}

	function init() {
		if (isReady) return;
		el = (0, _util2.default)('#calendar').html(tpl()).on('click', onClick);

		var today = new Date();
		picker = new _pikaday2.default({
			firstDay: 1,
			defaultDate: today,
			setDefaultDate: true,
			format: 'ddd, D MMM YYYY',
			field: el.find('.date')[0],
			yearRange: [2014, today.getFullYear()],
			onSelect: onSelect
		});
		onSelect();
		isReady = true;
	}

	exports.default = {
		init: init,
		set: _set,
		get: _get
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _sizzle = __webpack_require__(3);

	var _sizzle2 = _interopRequireDefault(_sizzle);

	var _ajax = __webpack_require__(5);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _form = __webpack_require__(6);

	var _form2 = _interopRequireDefault(_form);

	var _pubsub = __webpack_require__(7);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _keys = __webpack_require__(8);

	var _keys2 = _interopRequireDefault(_keys);

	var _colors = __webpack_require__(9);

	var _colors2 = _interopRequireDefault(_colors);

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var all = { ajax: _ajax2.default, form: _form2.default };
	Object.assign(all, _ajax2.default, _pubsub2.default, _keys2.default, _colors2.default, _util2.default);
	for (var prop in all) {
	  _sizzle2.default[prop] = all[prop];
	}exports.default = _sizzle2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function sizzle(mixed, context) {
		if (!mixed) return [];
		var el;
		if (typeof mixed !== 'string') el = mixed;

		// is html - create new element
		else if (/<[a-z][\s\S]*>/i.test(mixed)) {
				el = new DOMParser().parseFromString(mixed, 'text/html').body.firstChild;
			}
			// is selector - find element
			else el = (context || document).querySelectorAll(mixed);

		if (el.nodeType) el = [el];else if (_util2.default.isNodeList(el)) el = Array.prototype.slice.call(el);

		return Object.assign(el || [], sizzle.fn);
	}

	sizzle.fn = {};
	sizzle.fn.find = function (selector) {
		return sizzle(selector, this[0]);
	};
	sizzle.fn.filter = function (selector) {
		var elems = Array.prototype.filter.call(this, function (el) {
			return el.matches(selector);
		});
		return sizzle(elems);
	};

	sizzle.fn.first = function () {
		return sizzle(this[0]);
	};
	sizzle.fn.last = function () {
		return sizzle(this[this.length - 1]);
	};
	sizzle.fn.eq = function (idx) {
		return sizzle(this[idx || 0]);
	};

	sizzle.fn.appendTo = function (parent) {
		if (!this || !this.length) return this;
		if (typeof parent === 'string') parent = sizzle(parent);
		parent[0].appendChild(this[0]);
		return this;
	};

	sizzle.fn.append = function (child) {
		if (!this || !this.length) return this;
		if (typeof child === 'string') child = sizzle(child);
		this[0].appendChild(child[0]);
		return this;
	};

	sizzle.fn.on = function (eventName, cb) {
		if (!this || !this.length) return this;
		this.forEach(function (el) {
			el.addEventListener(eventName, cb);
		});
		return this;
	};

	sizzle.fn.off = function (eventName, cb) {
		if (!this || !this.length) return this;
		this.forEach(function (el) {
			el.removeEventListener(eventName, cb);
		});
		return this;
	};

	sizzle.fn.closest = function (cls) {
		if (!this || !this.length) return false;
		var has = false,
		    el = this[0];
		while (!has && el) {
			has = el.matches(cls);
			if (has) return sizzle(el);
			el = el.parentNode;
			if (el.tagName === 'HTML') return null;
		}
		return null;
	};

	sizzle.fn.is = function (selector) {
		if (!this || !this.length) return false;
		return this[0].matches(selector);
	};

	/**
	 * Check if target is, or is inside, a selector
	 * @param  {object}  target  - dom element
	 * @param  {string}  ...cls  - classes/selectors
	 * @example
	 *    Helper.isTargetIn(el, 'cls1', 'cls2')
	 * @return {Boolean}
	 */
	sizzle.fn.isIn = function () {
		var target = this && this.length ? this : null;
		if (target) {
			for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
				classes[_key] = arguments[_key];
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var cls = _step.value;
					if (target.closest(cls)) return true;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
		return false;
	};

	/**
	 * Modify element class list
	 * @param  {array} el        array of elements
	 * @param  {string} action   add, remove or toggle
	 * @param  {string} cls      space separated list of classes to add/remove/toggle
	 * @param  {boolean} cond    [optional] true or false for toggle
	 * @return {array}           same array of elements
	 */
	function modElCls(el, action, cls, cond) {
		if (!el || !el.length) return el;
		cls = cls.split(' ');
		if (typeof cond === 'boolean') {
			el.forEach(function (el) {
				cls.forEach(function (c) {
					el.classList[action](c, cond);
				});
			});
		} else {
			el.forEach(function (el) {
				cls.forEach(function (c) {
					el.classList[action](c);
				});
			});
		}
		return el;
	}

	sizzle.fn.addClass = function (cls) {
		return modElCls(this, 'add', cls);
	};
	sizzle.fn.removeClass = function (cls) {
		return modElCls(this, 'remove', cls);
	};
	sizzle.fn.toggleClass = function (cls, cond) {
		return modElCls(this, 'toggle', cls, cond);
	};
	sizzle.fn.hasClass = function (cls) {
		if (!this || !this.length) return false;
		return this[0].classList.contains(cls);
	};

	sizzle.fn.html = function (html) {
		if (!this || !this.length) return this;
		this.forEach(function (el) {
			el.innerHTML = html;
		});
		return this;
	};

	sizzle.fn.remove = function () {
		if (!this || !this.length) return this;
		this.forEach(function (el) {
			el.remove();
		});
		return this;
	};

	sizzle.fn.data = function (key) {
		if (!this || !this.length) return this;
		if (!this[0].dataset) return null;
		if (key) return this[0].dataset[key];
		return this[0].dataset;
	};

	exports.default = sizzle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* better typeof */
	function type(obj) {
		return obj ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : 'undefined';
	}

	function isNumber(v) {
		if (typeof v === 'number') return true;
		if (typeof v !== 'string') return false;
		return (/^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/.test(v)
		);
	}

	function formatNumber(num) {
		num = Math.round(0 + num * 100) / 100;
		return num.toLocaleString('en-GB', { minimumFractionDigits: 2 });
	}

	function serialize(obj) {
		var keys = Object.keys(obj);
		if (!keys || !keys.length) return '';
		return '?' + keys.reduce(function (a, k) {
			a.push(k + '=' + encodeURIComponent(obj[k]));
			return a;
		}, []).join('&');
	}

	function varToRealType(v) {
		if (isNumber(v)) {
			var originalv = v;
			v = parseFloat('' + v);
			if ('' + v !== originalv) v = originalv;
		} else if (v === 'true') v = true;else if (v === 'false') v = false;
		if (v === '') v = undefined;
		if (type(v) === 'array') v = v.map(function (val) {
			return varToRealType(val);
		});
		return v;
	}

	function isObjectEmpty(x) {
		if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object') return true;
		return Object.keys(x).length === 0;
	}

	function rand(max) {
		var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function each(arr, cb, scope) {
		if (!arr) return;
		if (type(arr) === 'object') for (var key in arr) {
			cb.call(scope || cb, arr[key], key);
		} else for (var i = 0, item; item = arr[i]; i++) {
			cb.call(scope || cb, item, i);
		} // return Array.prototype.forEach.call(collection, cb);
	}

	function sanitize(v) {
		var div = document.createElement('DIV');
		div.innerHTML = v || '';
		return div.textContent || div.innerText || '';
	}

	function merge(target) {
		if (!target) throw new TypeError('Cannot convert first argument to object');
		var to = Object(target);

		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var source = _step.value;

				var keys = Object.keys(Object(source));
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var key = _step2.value;

						var desc = Object.getOwnPropertyDescriptor(source, key);
						if (desc !== undefined && desc.enumerable) to[key] = source[key];
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return to;
	}

	if (!Object.assign) Object.defineProperty(Object, 'assign', { value: merge,
		enumerable: false, configurable: true, writable: true
	});

	function isNodeList(nodes) {
		return (typeof nodes === 'undefined' ? 'undefined' : _typeof(nodes)) === 'object' && /^(htmlcollection|nodelist|object)$/.test(type(nodes)) && (nodes.length === 0 || _typeof(nodes[0]) === 'object' && nodes[0].nodeType > 0);
	}

	exports.default = {
		type: type,
		rand: rand,
		each: each,
		isNumber: isNumber,
		formatNumber: formatNumber,
		varToRealType: varToRealType,
		isObjectEmpty: isObjectEmpty,
		merge: merge,
		sanitize: sanitize,
		serialize: serialize,
		isNodeList: isNodeList,
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var base_url = 'api/index.php/';

	function ajax(options) {
		if (typeof options === 'string') options = { url: options };

		var req = new XMLHttpRequest(),
		    resp,
		    data = options.data || '';
		options.url = base_url + options.url;
		options.method = options.method || 'GET';
		options.type = options.type || 'json';

		if (data) {
			if (options.method.toLowerCase() === 'get') options.url += _util2.default.serialize(data);else if (options.type === 'json') data = JSON.stringify(data);
		}
		return new Promise(function (resolve, reject) {
			req.open(options.method, options.url, true);
			req.onload = function () {
				if (req.status >= 200 && req.status < 400) {
					resp = req.responseText;
					try {
						resp = JSON.parse(resp);
					} catch (e) {}
					resolve(resp);
				} else reject(req.statusText);
			};
			req.onerror = function () {
				reject(req.statusText);
			};
			req.setRequestHeader('Content-Type', 'application/' + options.type + '; charset=UTF-8');
			req.send(data);
		});
	}

	exports.default = {
		ajax: ajax,
		get: function get(url, data) {
			return ajax({ url: url, data: data || {} });
		},
		post: function post(url, data) {
			return ajax({ url: url, data: data || {}, method: 'POST' });
		},
		put: function put(url, data) {
			return ajax({ url: url, data: data || {}, method: 'PUT' });
		},
		del: function del(url, data) {
			return ajax({ url: url, data: data || {}, method: 'DELETE' });
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var keyBreaker = /[^\[\]]+/g;
	var numberMatcher = /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/;

	function _isNumber(value) {
		if (typeof value === 'number') return true;
		if (typeof value !== 'string') return false;
		return value.match(numberMatcher);
	}

	function _decodeEntities(str) {
		var d = document.createElement('div');
		d.innerHTML = str;
		return d.innerText || d.textContent;
	}

	function _getInputs(form) {
		var inputs = form.querySelectorAll('[name]');
		return Array.prototype.slice.call(inputs) || [];
	}

	/**
	 * Form component
	 * @param {object} el - form DOM element
	 */
	function Form(el) {
		if (!el) return null;
		if (!(this instanceof Form)) return new Form(el);
		this.form = el;
		if (el.elements) this.inputs = el.elements;
	}

	Form.prototype.set = function (params, clear) {
		var inputs = _getInputs(this.form);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var input = _step.value;

				var name = input.name,
				    value = typeof params[name] === 'undefined' ? '' : params[name];

				// if name is object, e.g. user[name], userData[address][street], update value to read this correctly
				if (name.indexOf('[') > -1) {
					var v = params;
					var names = name.replace(/[\[\]]/g, '|').split('|');
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var n = _step2.value;

							if (v[n]) v = v[n];else {
								v = undefined;break;
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					value = v;
				}

				// if clear==true and no value = clear field, otherwise - leave it as it was
				if (clear !== true && value === undefined) continue;

				// if no value - clear field
				if (value === null || value === undefined) value = '';

				// decode html special chars (entities)
				if (typeof value === 'string' && value.indexOf('&') > -1) value = _decodeEntities(value);

				if (input.type === 'radio') input.checked = input.value.toString() === value.toString();else if (input.type === 'checkbox') input.checked = value;else if (input.tagName === 'SELECT') {
					if (value === '' || value === undefined) input.selectedIndex = 0;else input.value = value;
				} else input.value = value;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return this;
	};

	Form.prototype.get = function () {
		var convert = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

		var inputs = _getInputs(this.form),
		    data = {},
		    current;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var input = _step3.value;

				var type = input.type && input.type.toLowerCase(),
				    value = void 0,
				    parts = void 0,
				    lastPart = void 0,
				    last = void 0;

				// if we are submit or disabled - ignore
				if (type === 'submit' || !input.name || input.disabled) continue;

				value = input.value;
				parts = input.name.match(keyBreaker);

				// return only "checked" radio value
				if (type === 'radio' && !input.checked) continue;

				// convert chekbox to [true | false]
				if (type === 'checkbox') value = input.checked;

				if (convert) {
					if (_isNumber(value)) {
						var tv = parseFloat(value);
						var cmp = tv + '';
						// convert (string)100.00 to (int)100
						if (value.indexOf('.') > 0) cmp = tv.toFixed(value.split('.')[1].length);
						if (cmp === value) value = tv;
					} else if (value === 'true') value = true;else if (value === 'false') value = false;
					if (value === '') value = null;
				}

				current = data;
				// go through and create nested objects
				for (var i = 0; i < parts.length - 1; i++) {
					current[parts[i]] = current[parts[i]] || {};
					current = current[parts[i]];
				}
				lastPart = parts[parts.length - 1];

				// now we are on the last part, set the value
				last = current[lastPart];
				if (last) {
					if (!Array.isArray(last)) current[lastPart] = last === undefined ? [] : [last];
					current[lastPart].push(value);
				} else current[lastPart] = value;
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		return data;
	};

	Form.prototype.reset = function () {
		this.set({});
	};

	Form.prototype.clear = function () {
		this.set({}, true);
	};

	Form.prototype.update = function () {
		if (!this.observeCb) return;
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = this.form.elements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var field = _step4.value;

				var fname = field.name.replace(/[\[\]]/g, '_') + 'val',
				    ov = this.form.dataset[fname],
				    v = field.value;
				if (fname === 'val') continue;
				if (field.type === 'checkbox') {
					v = field.checked;
					ov = ov === 'true';
				} else if (field.type === 'radio' && !field.checked) continue;
				if (typeof ov === 'undefined' && typeof v !== 'undefined') {
					if (field.type === 'radio') this.observeCb(v, ov, field);
					ov = this.form.dataset[fname] = v;
				} else if (ov !== v) {
					this.form.dataset[fname] = v;
					this.observeCb(v, ov, field);
				}
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		requestAnimationFrame(this.update.bind(this));
	};
	Form.prototype.observe = function (cb) {
		this.update(this.observeCb = cb);
	};
	Form.prototype.observeStop = function () {
		this.observeCb = null;
	};

	module.exports = Form;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _cache = {};

	function trigger(topic) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		if (!_cache[topic]) return;
		_cache[topic].forEach(function (cb) {
			return cb.apply(cb, args);
		});
	}

	function on(topic, callback) {
		if (!_cache[topic]) _cache[topic] = [];
		_cache[topic].push(callback);
		return [topic, callback]; // handle for off
	}

	function off(handle) {
		var _handle = _slicedToArray(handle, 2);

		var topic = _handle[0];
		var cb = _handle[1];var ca = _cache[topic];
		cb = cb.toString();
		if (ca) ca.forEach(function (fn, i) {
			if (fn.toString() === cb) ca.splice(i, 1);
		});
	}

	exports.default = { on: on, off: off, trigger: trigger };

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var keys = {
		BCKSPC: 8,
		BACKSPACE: 8,
		TAB: 9,
		ENTER: 13,
		ESC: 27,
		SPACE: 32,
		PGUP: 33,
		PGDOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		INS: 45,
		DEL: 46,
		A: 65,
		X: 88,
		C: 67,
		D: 68,
		V: 86,
		Z: 90,
		F1: 112,
		F2: 113,
		F5: 116,
		MINUS: 173,
		PLUS: 61,
		DOT: 190,
		SLASH: 191,

		NUMSTAR: 106,
		NUMMINUS: 109,
		NUMPLUS: 107,
		NUMDOT: 110,
		NUMSLASH: 111
	},
	    digits = {
		48: 1, // 0
		49: 1, // 1
		50: 1, // 2
		51: 1, // 3
		52: 1, // 4
		53: 1, // 5
		54: 1, // 6
		55: 1, // 7
		56: 1, // 8
		57: 1, // 9
		96: 1, // numpad 0
		97: 1, // numpad 1
		98: 1, // numpad 2
		99: 1, // numpad 3
		100: 1, // numpad 4
		101: 1, // numpad 5
		102: 1, // numpad 6
		103: 1, // numpad 7
		104: 1, // numpad 8
		105: 1 },
	    allowedChars = {
		8: 1, // backspace
		9: 1, // tab
		46: 1, // del
		35: 1, // end
		36: 1, // home
		37: 1, // left
		39: 1 // right
	};

	// math operators: + - * / ( ) .
	function isMath(e) {
		var k = e.keyCode;
		if (k === keys.SPACE) return true;
		if (k === keys.NUMDOT || k === keys.DOT && !e.shiftKey) return true;
		if (k === keys.NUMMINUS || k === keys.MINUS && !e.shiftKey) return true;
		if (k === keys.NUMPLUS || k === keys.PLUS && e.shiftKey) return true;
		if (k === keys.NUMSLASH || k === keys.SLASH && !e.shiftKey) return true;
		if (e.shiftKey) {
			if (k === 56 || k === 57 || k === 48) return true;
		}
		return false;
	}

	// digits + navigation + copy/cut/paste + math operators
	function isAllowed(e) {
		var k = e.keyCode,
		    allowed = allowedChars[k] === 1,
		    isCtrlXCV = e && e.ctrlKey === true && (k === keys.X || k === keys.C || k === keys.V),
		    math = isMath(e);
		return isDigit(e) || allowed || isCtrlXCV || math;
	}

	function isDigit(e) {
		return digits[e.keyCode] === 1 && !e.shiftKey;
	}
	// a - z
	function isAlpha(e) {
		return e.keyCode >= 65 && e.keyCode <= 90 && !e.ctrlKey;
	}

	function isAlphaNumeric(e) {
		return isAlpha(e) || isDigit(e);
	}

	exports.default = {
		keys: keys,
		isAllowed: isAllowed,
		isDigit: isDigit,
		isAlpha: isAlpha,
		isAlphaNumeric: isAlphaNumeric
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var colors = ['#3498db', '#d35400', '#9b59b6', '#bdc3c7', '#e74c3c', '#1abc9c', '#ecf0f1', '#27ae60', '#8e44ad', '#e67e22', '#2980b9', '#f1c40f', '#16a085', '#95a5a6', '#f39c12', '#2ecc71', '#c0392b', '#7f8c8d', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];

	function lighter(hex) {
		var lum = arguments.length <= 1 || arguments[1] === undefined ? 0.2 : arguments[1];

		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		lum = lum || 0;
		// convert to decimal and change luminosity
		var rgb = '#',
		    c,
		    i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
			rgb += ('00' + c).substr(c.length);
		}
		return rgb;
	}

	/**
	 * Add "color" and "highlight" to every element of an array
	 * @param {[type]} items [description]
	 */
	function addColors(items) {
		return items.map(function (item, i) {
			item.color = colors[i];
			item.highlight = lighter(colors[i]);
			return item;
		});
	}

	exports.default = {
		colors: colors,
		lighter: lighter,
		addColors: addColors
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Pikaday
	 *
	 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
	 */

	(function (root, factory)
	{
	    'use strict';

	    var moment;
	    if (true) {
	        // CommonJS module
	        // Load moment.js as an optional dependency
	        try { moment = __webpack_require__(11); } catch (e) {}
	        module.exports = factory(moment);
	    } else if (typeof define === 'function' && define.amd) {
	        // AMD. Register as an anonymous module.
	        define(function (req)
	        {
	            // Load moment.js as an optional dependency
	            var id = 'moment';
	            try { moment = req(id); } catch (e) {}
	            return factory(moment);
	        });
	    } else {
	        root.Pikaday = factory(root.moment);
	    }
	}(this, function (moment)
	{
	    'use strict';

	    /**
	     * feature detection and helper functions
	     */
	    var hasMoment = typeof moment === 'function',

	    hasEventListeners = !!window.addEventListener,

	    document = window.document,

	    sto = window.setTimeout,

	    addEvent = function(el, e, callback, capture)
	    {
	        if (hasEventListeners) {
	            el.addEventListener(e, callback, !!capture);
	        } else {
	            el.attachEvent('on' + e, callback);
	        }
	    },

	    removeEvent = function(el, e, callback, capture)
	    {
	        if (hasEventListeners) {
	            el.removeEventListener(e, callback, !!capture);
	        } else {
	            el.detachEvent('on' + e, callback);
	        }
	    },

	    fireEvent = function(el, eventName, data)
	    {
	        var ev;

	        if (document.createEvent) {
	            ev = document.createEvent('HTMLEvents');
	            ev.initEvent(eventName, true, false);
	            ev = extend(ev, data);
	            el.dispatchEvent(ev);
	        } else if (document.createEventObject) {
	            ev = document.createEventObject();
	            ev = extend(ev, data);
	            el.fireEvent('on' + eventName, ev);
	        }
	    },

	    trim = function(str)
	    {
	        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
	    },

	    hasClass = function(el, cn)
	    {
	        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	    },

	    addClass = function(el, cn)
	    {
	        if (!hasClass(el, cn)) {
	            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
	        }
	    },

	    removeClass = function(el, cn)
	    {
	        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	    },

	    isArray = function(obj)
	    {
	        return (/Array/).test(Object.prototype.toString.call(obj));
	    },

	    isDate = function(obj)
	    {
	        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
	    },

	    isWeekend = function(date)
	    {
	        var day = date.getDay();
	        return day === 0 || day === 6;
	    },

	    isLeapYear = function(year)
	    {
	        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
	        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	    },

	    getDaysInMonth = function(year, month)
	    {
	        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	    },

	    setToStartOfDay = function(date)
	    {
	        if (isDate(date)) date.setHours(0,0,0,0);
	    },

	    compareDates = function(a,b)
	    {
	        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
	        return a.getTime() === b.getTime();
	    },

	    extend = function(to, from, overwrite)
	    {
	        var prop, hasProp;
	        for (prop in from) {
	            hasProp = to[prop] !== undefined;
	            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
	                if (isDate(from[prop])) {
	                    if (overwrite) {
	                        to[prop] = new Date(from[prop].getTime());
	                    }
	                }
	                else if (isArray(from[prop])) {
	                    if (overwrite) {
	                        to[prop] = from[prop].slice(0);
	                    }
	                } else {
	                    to[prop] = extend({}, from[prop], overwrite);
	                }
	            } else if (overwrite || !hasProp) {
	                to[prop] = from[prop];
	            }
	        }
	        return to;
	    },

	    adjustCalendar = function(calendar) {
	        if (calendar.month < 0) {
	            calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
	            calendar.month += 12;
	        }
	        if (calendar.month > 11) {
	            calendar.year += Math.floor(Math.abs(calendar.month)/12);
	            calendar.month -= 12;
	        }
	        return calendar;
	    },

	    /**
	     * defaults and localisation
	     */
	    defaults = {

	        // bind the picker to a form field
	        field: null,

	        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
	        bound: undefined,

	        // position of the datepicker, relative to the field (default to bottom & left)
	        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
	        position: 'bottom left',

	        // automatically fit in the viewport even if it means repositioning from the position option
	        reposition: true,

	        // the default output format for `.toString()` and `field` value
	        format: 'YYYY-MM-DD',

	        // the initial date to view when first opened
	        defaultDate: null,

	        // make the `defaultDate` the initial selected value
	        setDefaultDate: false,

	        // first day of week (0: Sunday, 1: Monday etc)
	        firstDay: 0,

	        // the minimum/earliest date that can be selected
	        minDate: null,
	        // the maximum/latest date that can be selected
	        maxDate: null,

	        // number of years either side, or array of upper/lower range
	        yearRange: 10,

	        // show week numbers at head of row
	        showWeekNumber: false,

	        // used internally (don't config outside)
	        minYear: 0,
	        maxYear: 9999,
	        minMonth: undefined,
	        maxMonth: undefined,

	        startRange: null,
	        endRange: null,

	        isRTL: false,

	        // Additional text to append to the year in the calendar title
	        yearSuffix: '',

	        // Render the month after year in the calendar title
	        showMonthAfterYear: false,

	        // how many months are visible
	        numberOfMonths: 1,

	        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
	        // only used for the first display or when a selected date is not visible
	        mainCalendar: 'left',

	        // Specify a DOM element to render the calendar in
	        container: undefined,

	        // internationalization
	        i18n: {
	            previousMonth : 'Previous Month',
	            nextMonth     : 'Next Month',
	            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
	            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
	        },

	        // Theme Classname
	        theme: null,

	        // callback function
	        onSelect: null,
	        onOpen: null,
	        onClose: null,
	        onDraw: null
	    },


	    /**
	     * templating functions to abstract HTML rendering
	     */
	    renderDayName = function(opts, day, abbr)
	    {
	        day += opts.firstDay;
	        while (day >= 7) {
	            day -= 7;
	        }
	        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
	    },

	    renderDay = function(opts)
	    {
	        if (opts.isEmpty) {
	            return '<td class="is-empty"></td>';
	        }
	        var arr = [];
	        if (opts.isDisabled) {
	            arr.push('is-disabled');
	        }
	        if (opts.isToday) {
	            arr.push('is-today');
	        }
	        if (opts.isSelected) {
	            arr.push('is-selected');
	        }
	        if (opts.isInRange) {
	            arr.push('is-inrange');
	        }
	        if (opts.isStartRange) {
	            arr.push('is-startrange');
	        }
	        if (opts.isEndRange) {
	            arr.push('is-endrange');
	        }
	        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '">' +
	                 '<button class="pika-button pika-day" type="button" ' +
	                    'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
	                        opts.day +
	                 '</button>' +
	               '</td>';
	    },

	    renderWeek = function (d, m, y) {
	        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
	        var onejan = new Date(y, 0, 1),
	            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
	        return '<td class="pika-week">' + weekNum + '</td>';
	    },

	    renderRow = function(days, isRTL)
	    {
	        return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
	    },

	    renderBody = function(rows)
	    {
	        return '<tbody>' + rows.join('') + '</tbody>';
	    },

	    renderHead = function(opts)
	    {
	        var i, arr = [];
	        if (opts.showWeekNumber) {
	            arr.push('<th></th>');
	        }
	        for (i = 0; i < 7; i++) {
	            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
	        }
	        return '<thead>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</thead>';
	    },

	    renderTitle = function(instance, c, year, month, refYear)
	    {
	        var i, j, arr,
	            opts = instance._o,
	            isMinYear = year === opts.minYear,
	            isMaxYear = year === opts.maxYear,
	            html = '<div class="pika-title">',
	            monthHtml,
	            yearHtml,
	            prev = true,
	            next = true;

	        for (arr = [], i = 0; i < 12; i++) {
	            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
	                (i === month ? ' selected': '') +
	                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') + '>' +
	                opts.i18n.months[i] + '</option>');
	        }
	        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

	        if (isArray(opts.yearRange)) {
	            i = opts.yearRange[0];
	            j = opts.yearRange[1] + 1;
	        } else {
	            i = year - opts.yearRange;
	            j = 1 + year + opts.yearRange;
	        }

	        for (arr = []; i < j && i <= opts.maxYear; i++) {
	            if (i >= opts.minYear) {
	                arr.push('<option value="' + i + '"' + (i === year ? ' selected': '') + '>' + (i) + '</option>');
	            }
	        }
	        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

	        if (opts.showMonthAfterYear) {
	            html += yearHtml + monthHtml;
	        } else {
	            html += monthHtml + yearHtml;
	        }

	        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
	            prev = false;
	        }

	        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
	            next = false;
	        }

	        if (c === 0) {
	            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
	        }
	        if (c === (instance._o.numberOfMonths - 1) ) {
	            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
	        }

	        return html += '</div>';
	    },

	    renderTable = function(opts, data)
	    {
	        return '<table cellpadding="0" cellspacing="0" class="pika-table">' + renderHead(opts) + renderBody(data) + '</table>';
	    },


	    /**
	     * Pikaday constructor
	     */
	    Pikaday = function(options)
	    {
	        var self = this,
	            opts = self.config(options);

	        self._onMouseDown = function(e)
	        {
	            if (!self._v) {
	                return;
	            }
	            e = e || window.event;
	            var target = e.target || e.srcElement;
	            if (!target) {
	                return;
	            }

	            if (!hasClass(target, 'is-disabled')) {
	                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty')) {
	                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
	                    if (opts.bound) {
	                        sto(function() {
	                            self.hide();
	                            if (opts.field) {
	                                opts.field.blur();
	                            }
	                        }, 100);
	                    }
	                }
	                else if (hasClass(target, 'pika-prev')) {
	                    self.prevMonth();
	                }
	                else if (hasClass(target, 'pika-next')) {
	                    self.nextMonth();
	                }
	            }
	            if (!hasClass(target, 'pika-select')) {
	                // if this is touch event prevent mouse events emulation
	                if (e.preventDefault) {
	                    e.preventDefault();
	                } else {
	                    e.returnValue = false;
	                    return false;
	                }
	            } else {
	                self._c = true;
	            }
	        };

	        self._onChange = function(e)
	        {
	            e = e || window.event;
	            var target = e.target || e.srcElement;
	            if (!target) {
	                return;
	            }
	            if (hasClass(target, 'pika-select-month')) {
	                self.gotoMonth(target.value);
	            }
	            else if (hasClass(target, 'pika-select-year')) {
	                self.gotoYear(target.value);
	            }
	        };

	        self._onInputChange = function(e)
	        {
	            var date;

	            if (e.firedBy === self) {
	                return;
	            }
	            if (hasMoment) {
	                date = moment(opts.field.value, opts.format);
	                date = (date && date.isValid()) ? date.toDate() : null;
	            }
	            else {
	                date = new Date(Date.parse(opts.field.value));
	            }
	            if (isDate(date)) {
	              self.setDate(date);
	            }
	            if (!self._v) {
	                self.show();
	            }
	        };

	        self._onInputFocus = function()
	        {
	            self.show();
	        };

	        self._onInputClick = function()
	        {
	            self.show();
	        };

	        self._onInputBlur = function()
	        {
	            // IE allows pika div to gain focus; catch blur the input field
	            var pEl = document.activeElement;
	            do {
	                if (hasClass(pEl, 'pika-single')) {
	                    return;
	                }
	            }
	            while ((pEl = pEl.parentNode));

	            if (!self._c) {
	                self._b = sto(function() {
	                    self.hide();
	                }, 50);
	            }
	            self._c = false;
	        };

	        self._onClick = function(e)
	        {
	            e = e || window.event;
	            var target = e.target || e.srcElement,
	                pEl = target;
	            if (!target) {
	                return;
	            }
	            if (!hasEventListeners && hasClass(target, 'pika-select')) {
	                if (!target.onchange) {
	                    target.setAttribute('onchange', 'return;');
	                    addEvent(target, 'change', self._onChange);
	                }
	            }
	            do {
	                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
	                    return;
	                }
	            }
	            while ((pEl = pEl.parentNode));
	            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
	                self.hide();
	            }
	        };

	        self.el = document.createElement('div');
	        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

	        addEvent(self.el, 'mousedown', self._onMouseDown, true);
	        addEvent(self.el, 'touchend', self._onMouseDown, true);
	        addEvent(self.el, 'change', self._onChange);

	        if (opts.field) {
	            if (opts.container) {
	                opts.container.appendChild(self.el);
	            } else if (opts.bound) {
	                document.body.appendChild(self.el);
	            } else {
	                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
	            }
	            addEvent(opts.field, 'change', self._onInputChange);

	            if (!opts.defaultDate) {
	                if (hasMoment && opts.field.value) {
	                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
	                } else {
	                    opts.defaultDate = new Date(Date.parse(opts.field.value));
	                }
	                opts.setDefaultDate = true;
	            }
	        }

	        var defDate = opts.defaultDate;

	        if (isDate(defDate)) {
	            if (opts.setDefaultDate) {
	                self.setDate(defDate, true);
	            } else {
	                self.gotoDate(defDate);
	            }
	        } else {
	            self.gotoDate(new Date());
	        }

	        if (opts.bound) {
	            this.hide();
	            self.el.className += ' is-bound';
	            addEvent(opts.trigger, 'click', self._onInputClick);
	            addEvent(opts.trigger, 'focus', self._onInputFocus);
	            addEvent(opts.trigger, 'blur', self._onInputBlur);
	        } else {
	            this.show();
	        }
	    };


	    /**
	     * public Pikaday API
	     */
	    Pikaday.prototype = {


	        /**
	         * configure functionality
	         */
	        config: function(options)
	        {
	            if (!this._o) {
	                this._o = extend({}, defaults, true);
	            }

	            var opts = extend(this._o, options, true);

	            opts.isRTL = !!opts.isRTL;

	            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

	            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

	            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

	            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

	            opts.disableWeekends = !!opts.disableWeekends;

	            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

	            var nom = parseInt(opts.numberOfMonths, 10) || 1;
	            opts.numberOfMonths = nom > 4 ? 4 : nom;

	            if (!isDate(opts.minDate)) {
	                opts.minDate = false;
	            }
	            if (!isDate(opts.maxDate)) {
	                opts.maxDate = false;
	            }
	            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
	                opts.maxDate = opts.minDate = false;
	            }
	            if (opts.minDate) {
	                this.setMinDate(opts.minDate);
	            }
	            if (opts.maxDate) {
	                this.setMaxDate(opts.maxDate);
	            }

	            if (isArray(opts.yearRange)) {
	                var fallback = new Date().getFullYear() - 10;
	                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
	                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
	            } else {
	                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
	                if (opts.yearRange > 100) {
	                    opts.yearRange = 100;
	                }
	            }

	            return opts;
	        },

	        /**
	         * return a formatted string of the current selection (using Moment.js if available)
	         */
	        toString: function(format)
	        {
	            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
	        },

	        /**
	         * return a Moment.js object of the current selection (if available)
	         */
	        getMoment: function()
	        {
	            return hasMoment ? moment(this._d) : null;
	        },

	        /**
	         * set the current selection from a Moment.js object (if available)
	         */
	        setMoment: function(date, preventOnSelect)
	        {
	            if (hasMoment && moment.isMoment(date)) {
	                this.setDate(date.toDate(), preventOnSelect);
	            }
	        },

	        /**
	         * return a Date object of the current selection
	         */
	        getDate: function()
	        {
	            return isDate(this._d) ? new Date(this._d.getTime()) : null;
	        },

	        /**
	         * set the current selection
	         */
	        setDate: function(date, preventOnSelect)
	        {
	            if (!date) {
	                this._d = null;

	                if (this._o.field) {
	                    this._o.field.value = '';
	                    fireEvent(this._o.field, 'change', { firedBy: this });
	                }

	                return this.draw();
	            }
	            if (typeof date === 'string') {
	                date = new Date(Date.parse(date));
	            }
	            if (!isDate(date)) {
	                return;
	            }

	            var min = this._o.minDate,
	                max = this._o.maxDate;

	            if (isDate(min) && date < min) {
	                date = min;
	            } else if (isDate(max) && date > max) {
	                date = max;
	            }

	            this._d = new Date(date.getTime());
	            setToStartOfDay(this._d);
	            this.gotoDate(this._d);

	            if (this._o.field) {
	                this._o.field.value = this.toString();
	                fireEvent(this._o.field, 'change', { firedBy: this });
	            }
	            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
	                this._o.onSelect.call(this, this.getDate());
	            }
	        },

	        /**
	         * change view to a specific date
	         */
	        gotoDate: function(date)
	        {
	            var newCalendar = true;

	            if (!isDate(date)) {
	                return;
	            }

	            if (this.calendars) {
	                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
	                    lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
	                    visibleDate = date.getTime();
	                // get the end of the month
	                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
	                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
	                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
	            }

	            if (newCalendar) {
	                this.calendars = [{
	                    month: date.getMonth(),
	                    year: date.getFullYear()
	                }];
	                if (this._o.mainCalendar === 'right') {
	                    this.calendars[0].month += 1 - this._o.numberOfMonths;
	                }
	            }

	            this.adjustCalendars();
	        },

	        adjustCalendars: function() {
	            this.calendars[0] = adjustCalendar(this.calendars[0]);
	            for (var c = 1; c < this._o.numberOfMonths; c++) {
	                this.calendars[c] = adjustCalendar({
	                    month: this.calendars[0].month + c,
	                    year: this.calendars[0].year
	                });
	            }
	            this.draw();
	        },

	        gotoToday: function()
	        {
	            this.gotoDate(new Date());
	        },

	        /**
	         * change view to a specific month (zero-index, e.g. 0: January)
	         */
	        gotoMonth: function(month)
	        {
	            if (!isNaN(month)) {
	                this.calendars[0].month = parseInt(month, 10);
	                this.adjustCalendars();
	            }
	        },

	        nextMonth: function()
	        {
	            this.calendars[0].month++;
	            this.adjustCalendars();
	        },

	        prevMonth: function()
	        {
	            this.calendars[0].month--;
	            this.adjustCalendars();
	        },

	        /**
	         * change view to a specific full year (e.g. "2012")
	         */
	        gotoYear: function(year)
	        {
	            if (!isNaN(year)) {
	                this.calendars[0].year = parseInt(year, 10);
	                this.adjustCalendars();
	            }
	        },

	        /**
	         * change the minDate
	         */
	        setMinDate: function(value)
	        {
	            setToStartOfDay(value);
	            this._o.minDate = value;
	            this._o.minYear  = value.getFullYear();
	            this._o.minMonth = value.getMonth();
	            this.draw();
	        },

	        /**
	         * change the maxDate
	         */
	        setMaxDate: function(value)
	        {
	            setToStartOfDay(value);
	            this._o.maxDate = value;
	            this._o.maxYear = value.getFullYear();
	            this._o.maxMonth = value.getMonth();
	            this.draw();
	        },

	        setStartRange: function(value)
	        {
	            this._o.startRange = value;
	        },

	        setEndRange: function(value)
	        {
	            this._o.endRange = value;
	        },

	        /**
	         * refresh the HTML
	         */
	        draw: function(force)
	        {
	            if (!this._v && !force) {
	                return;
	            }
	            var opts = this._o,
	                minYear = opts.minYear,
	                maxYear = opts.maxYear,
	                minMonth = opts.minMonth,
	                maxMonth = opts.maxMonth,
	                html = '';

	            if (this._y <= minYear) {
	                this._y = minYear;
	                if (!isNaN(minMonth) && this._m < minMonth) {
	                    this._m = minMonth;
	                }
	            }
	            if (this._y >= maxYear) {
	                this._y = maxYear;
	                if (!isNaN(maxMonth) && this._m > maxMonth) {
	                    this._m = maxMonth;
	                }
	            }

	            for (var c = 0; c < opts.numberOfMonths; c++) {
	                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month) + '</div>';
	            }

	            this.el.innerHTML = html;

	            if (opts.bound) {
	                if(opts.field.type !== 'hidden') {
	                    sto(function() {
	                        opts.trigger.focus();
	                    }, 1);
	                }
	            }

	            if (typeof this._o.onDraw === 'function') {
	                var self = this;
	                sto(function() {
	                    self._o.onDraw.call(self);
	                }, 0);
	            }
	        },

	        adjustPosition: function()
	        {
	            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

	            if (this._o.container) return;

	            this.el.style.position = 'absolute';

	            field = this._o.trigger;
	            pEl = field;
	            width = this.el.offsetWidth;
	            height = this.el.offsetHeight;
	            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

	            if (typeof field.getBoundingClientRect === 'function') {
	                clientRect = field.getBoundingClientRect();
	                left = clientRect.left + window.pageXOffset;
	                top = clientRect.bottom + window.pageYOffset;
	            } else {
	                left = pEl.offsetLeft;
	                top  = pEl.offsetTop + pEl.offsetHeight;
	                while((pEl = pEl.offsetParent)) {
	                    left += pEl.offsetLeft;
	                    top  += pEl.offsetTop;
	                }
	            }

	            // default position is bottom & left
	            if ((this._o.reposition && left + width > viewportWidth) ||
	                (
	                    this._o.position.indexOf('right') > -1 &&
	                    left - width + field.offsetWidth > 0
	                )
	            ) {
	                left = left - width + field.offsetWidth;
	            }
	            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
	                (
	                    this._o.position.indexOf('top') > -1 &&
	                    top - height - field.offsetHeight > 0
	                )
	            ) {
	                top = top - height - field.offsetHeight;
	            }

	            this.el.style.left = left + 'px';
	            this.el.style.top = top + 'px';
	        },

	        /**
	         * render HTML for a particular month
	         */
	        render: function(year, month)
	        {
	            var opts   = this._o,
	                now    = new Date(),
	                days   = getDaysInMonth(year, month),
	                before = new Date(year, month, 1).getDay(),
	                data   = [],
	                row    = [];
	            setToStartOfDay(now);
	            if (opts.firstDay > 0) {
	                before -= opts.firstDay;
	                if (before < 0) {
	                    before += 7;
	                }
	            }
	            var cells = days + before,
	                after = cells;
	            while(after > 7) {
	                after -= 7;
	            }
	            cells += 7 - after;
	            for (var i = 0, r = 0; i < cells; i++)
	            {
	                var day = new Date(year, month, 1 + (i - before)),
	                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
	                    isToday = compareDates(day, now),
	                    isEmpty = i < before || i >= (days + before),
	                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
	                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
	                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
	                    isDisabled = (opts.minDate && day < opts.minDate) ||
	                                 (opts.maxDate && day > opts.maxDate) ||
	                                 (opts.disableWeekends && isWeekend(day)) ||
	                                 (opts.disableDayFn && opts.disableDayFn(day)),
	                    dayConfig = {
	                        day: 1 + (i - before),
	                        month: month,
	                        year: year,
	                        isSelected: isSelected,
	                        isToday: isToday,
	                        isDisabled: isDisabled,
	                        isEmpty: isEmpty,
	                        isStartRange: isStartRange,
	                        isEndRange: isEndRange,
	                        isInRange: isInRange
	                    };

	                row.push(renderDay(dayConfig));

	                if (++r === 7) {
	                    if (opts.showWeekNumber) {
	                        row.unshift(renderWeek(i - before, month, year));
	                    }
	                    data.push(renderRow(row, opts.isRTL));
	                    row = [];
	                    r = 0;
	                }
	            }
	            return renderTable(opts, data);
	        },

	        isVisible: function()
	        {
	            return this._v;
	        },

	        show: function()
	        {
	            if (!this._v) {
	                removeClass(this.el, 'is-hidden');
	                this._v = true;
	                this.draw();
	                if (this._o.bound) {
	                    addEvent(document, 'click', this._onClick);
	                    this.adjustPosition();
	                }
	                if (typeof this._o.onOpen === 'function') {
	                    this._o.onOpen.call(this);
	                }
	            }
	        },

	        hide: function()
	        {
	            var v = this._v;
	            if (v !== false) {
	                if (this._o.bound) {
	                    removeEvent(document, 'click', this._onClick);
	                }
	                this.el.style.position = 'static'; // reset
	                this.el.style.left = 'auto';
	                this.el.style.top = 'auto';
	                addClass(this.el, 'is-hidden');
	                this._v = false;
	                if (v !== undefined && typeof this._o.onClose === 'function') {
	                    this._o.onClose.call(this);
	                }
	            }
	        },

	        /**
	         * GAME OVER
	         */
	        destroy: function()
	        {
	            this.hide();
	            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
	            removeEvent(this.el, 'touchend', this._onMouseDown, true);
	            removeEvent(this.el, 'change', this._onChange);
	            if (this._o.field) {
	                removeEvent(this._o.field, 'change', this._onInputChange);
	                if (this._o.bound) {
	                    removeEvent(this._o.trigger, 'click', this._onInputClick);
	                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
	                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
	                }
	            }
	            if (this.el.parentNode) {
	                this.el.parentNode.removeChild(this.el);
	            }
	        }

	    };

	    return Pikaday;

	}));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.15.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isObject(input) {
	        // IE8 will treat undefined and null as object if it wasn't for
	        // input != null
	        return input != null && Object.prototype.toString.call(input) === '[object Object]';
	    }

	    function isObjectEmpty(obj) {
	        var k;
	        for (k in obj) {
	            // even if its not own property I'd still call it non-empty
	            return false;
	        }
	        return true;
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false,
	            parsedDateParts : [],
	            meridiem        : null
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this);
	            var len = t.length >>> 0;

	            for (var i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }

	            return false;
	        };
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            var parsedParts = some.call(flags.parsedDateParts, function (i) {
	                return i != null;
	            });
	            var isNowValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated &&
	                (!flags.meridiem || (flags.meridiem && parsedParts));

	            if (m._strict) {
	                isNowValid = isNowValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }

	            if (Object.isFrozen == null || !Object.isFrozen(m)) {
	                m._isValid = isNowValid;
	            }
	            else {
	                return isNowValid;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            // -0 -> 0
	            return Math.ceil(number) || 0;
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (utils_hooks__hooks.deprecationHandler != null) {
	                utils_hooks__hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                var args = [];
	                var arg;
	                for (var i = 0; i < arguments.length; i++) {
	                    arg = '';
	                    if (typeof arguments[i] === 'object') {
	                        arg += '\n[' + i + '] ';
	                        for (var key in arguments[0]) {
	                            arg += key + ': ' + arguments[0][key] + ', ';
	                        }
	                        arg = arg.slice(0, -2); // Remove trailing comma and space
	                    } else {
	                        arg = arguments[i];
	                    }
	                    args.push(arg);
	                }
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (utils_hooks__hooks.deprecationHandler != null) {
	            utils_hooks__hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	    utils_hooks__hooks.deprecationHandler = null;

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        for (prop in parentConfig) {
	            if (hasOwnProp(parentConfig, prop) &&
	                    !hasOwnProp(childConfig, prop) &&
	                    isObject(parentConfig[prop])) {
	                // make sure changes to properties don't modify parent config
	                res[prop] = extend({}, res[prop]);
	            }
	        }
	        return res;
	    }

	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }

	    var keys;

	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i, res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key] || this._calendar['sameElse'];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    var priorities = {};

	    function addUnitPriority(unit, priority) {
	        priorities[unit] = priority;
	    }

	    function getPrioritizedUnits(unitsObj) {
	        var units = [];
	        for (var u in unitsObj) {
	            units.push({unit: u, priority: priorities[u]});
	        }
	        units.sort(function (a, b) {
	            return a.priority - b.priority;
	        });
	        return units;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }

	    // MOMENTS

	    function stringGet (units) {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units]();
	        }
	        return this;
	    }


	    function stringSet (units, value) {
	        if (typeof units === 'object') {
	            units = normalizeObjectUnits(units);
	            var prioritized = getPrioritizedUnits(units);
	            for (var i = 0; i < prioritized.length; i++) {
	                this[prioritized[i].unit](units[prioritized[i].unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '', i;
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	    var regexes = {};

	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;

	    var indexOf;

	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PRIORITY

	    addUnitPriority('month', 8);

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        if (!m) {
	            return this._months;
	        }
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        if (!m) {
	            return this._monthsShort;
	        }
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function units_month__handleStrictParse(monthName, format, strict) {
	        var i, ii, mom, llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = create_utc__createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (this._monthsParseExact) {
	            return units_month__handleStrictParse.call(this, monthName, format, strict);
	        }

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsShortRegex')) {
	                this._monthsShortRegex = defaultMonthsShortRegex;
	            }
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }

	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                this._monthsRegex = defaultMonthsRegex;
	            }
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	        }
	        for (i = 0; i < 24; i++) {
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PRIORITIES

	    addUnitPriority('year', 1);

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));

	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PRIORITIES

	    addUnitPriority('week', 5);
	    addUnitPriority('isoWeek', 5);

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PRIORITY
	    addUnitPriority('day', 11);
	    addUnitPriority('weekday', 11);
	    addUnitPriority('isoWeekday', 11);

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd',   function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd',   function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    function parseIsoWeekday(input, locale) {
	        if (typeof input === 'string') {
	            return locale.weekdaysParse(input) % 7 || 7;
	        }
	        return isNaN(input) ? null : input;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        if (!m) {
	            return this._weekdays;
	        }
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	    }

	    function day_of_week__handleStrictParse(weekdayName, format, strict) {
	        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];

	            for (i = 0; i < 7; ++i) {
	                mom = create_utc__createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;

	        if (this._weekdaysParseExact) {
	            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
	        }

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = create_utc__createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }

	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.

	        if (input != null) {
	            var weekday = parseIsoWeekday(input, this.localeData());
	            return this.day(this.day() % 7 ? weekday : weekday - 7);
	        } else {
	            return this.day() || 7;
	        }
	    }

	    var defaultWeekdaysRegex = matchWord;
	    function weekdaysRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                this._weekdaysRegex = defaultWeekdaysRegex;
	            }
	            return this._weekdaysStrictRegex && isStrict ?
	                this._weekdaysStrictRegex : this._weekdaysRegex;
	        }
	    }

	    var defaultWeekdaysShortRegex = matchWord;
	    function weekdaysShortRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	            }
	            return this._weekdaysShortStrictRegex && isStrict ?
	                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	        }
	    }

	    var defaultWeekdaysMinRegex = matchWord;
	    function weekdaysMinRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	            }
	            return this._weekdaysMinStrictRegex && isStrict ?
	                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	        }
	    }


	    function computeWeekdaysParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom, minp, shortp, longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            minp = this.weekdaysMin(mom, '');
	            shortp = this.weekdaysShort(mom, '');
	            longp = this.weekdays(mom, '');
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 7; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;

	        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	        return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PRIORITY
	    addUnitPriority('hour', 13);

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    var baseConfig = {
	        calendar: defaultCalendar,
	        longDateFormat: defaultLongDateFormat,
	        invalidDate: defaultInvalidDate,
	        ordinal: defaultOrdinal,
	        ordinalParse: defaultOrdinalParse,
	        relativeTime: defaultRelativeTime,

	        months: defaultLocaleMonths,
	        monthsShort: defaultLocaleMonthsShort,

	        week: defaultLocaleWeek,

	        weekdays: defaultLocaleWeekdays,
	        weekdaysMin: defaultLocaleWeekdaysMin,
	        weekdaysShort: defaultLocaleWeekdaysShort,

	        meridiemParse: defaultLocaleMeridiemParse
	    };

	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.require) {
	            try {
	                oldLocale = globalLocale._abbr;
	                module.require('./locale/' + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, config) {
	        if (config !== null) {
	            var parentConfig = baseConfig;
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale ' +
	                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	                parentConfig = locales[name]._config;
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    parentConfig = locales[config.parentLocale]._config;
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/');
	                }
	            }
	            locales[name] = new Locale(mergeConfigs(parentConfig, config));

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale, parentConfig = baseConfig;
	            // MERGE
	            if (locales[name] != null) {
	                parentConfig = locales[name]._config;
	            }
	            config = mergeConfigs(parentConfig, config);
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    function locale_locales__listLocales() {
	        return keys(locales);
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
	        'which is not reliable across all browsers and versions. Non ISO date formats are ' +
	        'discouraged and will be removed in an upcoming major release. Please refer to ' +
	        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (config._a[HOUR] <= 12 &&
	            getParsingFlags(config).bigHour === true &&
	            config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }

	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else if (format) {
	            configFromStringAndFormat(config);
	        }  else {
	            configFromInput(config);
	        }

	        if (!valid__isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }

	        if ((isObject(input) && isObjectEmpty(input)) ||
	                (isArray(input) && input.length === 0)) {
	            input = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other < this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }

	    // FORMATTING

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            var tZone = offsetFromString(matchOffset, this._i);

	            if (tZone === 0) {
	                this.utcOffset(0, true);
	            } else {
	                this.utcOffset(offsetFromString(matchOffset, this._i));
	            }
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])                         * sign,
	                h  : toInt(match[HOUR])                         * sign,
	                m  : toInt(match[MINUTE])                       * sign,
	                s  : toInt(match[SECOND])                       * sign,
	                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function getCalendarFormat(myMoment, now) {
	        var diff = myMoment.diff(now, 'days', true);
	        return diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	    }

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            format = utils_hooks__hooks.calendarFormat(this, sod) || 'sameElse';

	        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }

	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }

	    function isBetween (from, to, units, inclusivity) {
	        inclusivity = inclusivity || '()';
	        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	    }

	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	        }
	    }

	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }

	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }

	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        if (!inputString) {
	            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	            case 'year':
	                this.month(0);
	                /* falls through */
	            case 'quarter':
	            case 'month':
	                this.date(1);
	                /* falls through */
	            case 'week':
	            case 'isoWeek':
	            case 'day':
	            case 'date':
	                this.hours(0);
	                /* falls through */
	            case 'hour':
	                this.minutes(0);
	                /* falls through */
	            case 'minute':
	                this.seconds(0);
	                /* falls through */
	            case 'second':
	                this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }

	        // 'date' is an alias for 'day', so it should be considered as such.
	        if (units === 'date') {
	            units = 'day';
	        }

	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return this._d.valueOf() - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate () {
	        return new Date(this.valueOf());
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PRIORITY

	    addUnitPriority('weekYear', 1);
	    addUnitPriority('isoWeekYear', 1);


	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PRIORITY

	    addUnitPriority('quarter', 7);

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PRIOROITY
	    addUnitPriority('date', 9);

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PRIORITY
	    addUnitPriority('dayOfYear', 4);

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PRIORITY

	    addUnitPriority('minute', 14);

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PRIORITY

	    addUnitPriority('second', 15);

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PRIORITY

	    addUnitPriority('millisecond', 16);

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = stringGet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = stringSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	    momentPrototype__proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    prototype__proto.weekdaysRegex       =        weekdaysRegex;
	    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
	    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function listMonthsImpl (format, index, field) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, 'month');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = lists__get(format, i, field, 'month');
	        }
	        return out;
	    }

	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl (localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;

	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        }

	        var locale = locale_locales__getLocale(),
	            shift = localeSorted ? locale._week.dow : 0;

	        if (index != null) {
	            return lists__get(format, (index + shift) % 7, field, 'day');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 7; i++) {
	            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }

	    function lists__listMonthsShort (format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function lists__listWeekdays (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function lists__listWeekdaysShort (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function lists__listWeekdaysMin (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set the rounding function for relative time strings
	    function duration_humanize__getSetRelativeTimeRounding (roundingFunction) {
	        if (roundingFunction === undefined) {
	            return round;
	        }
	        if (typeof(roundingFunction) === 'function') {
	            round = roundingFunction;
	            return true;
	        }
	        return false;
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.15.0';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeRounding = duration_humanize__getSetRelativeTimeRounding;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.calendarFormat        = getCalendarFormat;
	    utils_hooks__hooks.prototype             = momentPrototype;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)(module)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(14);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<input type=\"text\" class=\"date\">");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn fa fa-chevron-left\" data-go=\"prevMonth\"></a>");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn fa fa-angle-left\" data-go=\"prev\"></a>");t.b("\n");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn btn-today\" data-go=\"today\">Today</a>");t.b("\n");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn fa fa-angle-right\" data-go=\"next\"></a>");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn fa fa-chevron-right\" data-go=\"nextMonth\"></a>");return t.fl(); },partials: {}, subs: {  }}, "<input type=\"text\" class=\"date\">\n<a href=\"#\" class=\"btn fa fa-chevron-left\" data-go=\"prevMonth\"></a>\n<a href=\"#\" class=\"btn fa fa-angle-left\" data-go=\"prev\"></a>\n\n<a href=\"#\" class=\"btn btn-today\" data-go=\"today\">Today</a>\n\n<a href=\"#\" class=\"btn fa fa-angle-right\" data-go=\"next\"></a>\n<a href=\"#\" class=\"btn fa fa-chevron-right\" data-go=\"nextMonth\"></a>", H);return T.render.apply(T, arguments); };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	// This file is for use with Node.js. See dist/ for browser files.

	var Hogan = __webpack_require__(15);
	Hogan.Template = __webpack_require__(16).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;

	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };

	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';

	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }

	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }

	      return isAllWhitespace;
	    }

	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();

	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }

	      seenTag = false;
	      lineStart = tokens.length;
	    }

	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');

	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];

	      return closeIndex + close.length - 1;
	    }

	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }

	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }

	    filterLine(seenTag, true);

	    return tokens;
	  }

	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }

	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }

	    return s.replace(/^\s*|\s*$/g, '');
	  }

	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }

	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }

	    return true;
	  }

	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;

	    tail = stack[stack.length - 1];

	    while (tokens.length > 0) {
	      token = tokens.shift();

	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }

	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }

	      instructions.push(token);
	    }

	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }

	    return instructions;
	  }

	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }

	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }

	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }

	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }

	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }

	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);

	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }

	    return this.makeTemplate(context, text, options);
	  }

	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }

	  Hogan.template = Hogan.Template;

	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }

	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }

	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }

	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }

	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }

	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },

	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },

	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },

	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },

	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },

	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },

	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },

	    '{': tripleStache,

	    '&': tripleStache
	  }

	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }

	  function write(s) {
	    return 't.b(' + s + ');';
	  }

	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }

	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }

	  Hogan.cache = {};

	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }

	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];

	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }

	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})( true ? exports : Hogan);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	var Hogan = {};

	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }

	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },

	    // variable escaping
	    v: hoganEscape,

	    // triple stache
	    t: coerceToString,

	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },

	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },

	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];

	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }

	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }

	      if (!template) {
	        return null;
	      }

	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;

	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;

	      return template;
	    },

	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }

	      return partial.ri(context, partials, indent);
	    },

	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];

	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }

	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },

	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;

	      if (isArray(val) && val.length === 0) {
	        return false;
	      }

	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }

	      pass = !!val;

	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }

	      return pass;
	    },

	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;

	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }

	      if (returnFound && !val) {
	        return false;
	      }

	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }

	      return val;
	    },

	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;

	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }

	      if (!found) {
	        return (returnFound) ? false : "";
	      }

	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }

	      return val;
	    },

	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;

	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;

	      return false;
	    },

	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },

	    // template result buffering
	    b: function(s) { this.buf += s; },

	    fl: function() { var r = this.buf; this.buf = ''; return r; },

	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);

	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }

	      return result;
	    },

	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);

	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }

	      return result;
	    },

	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }

	  };

	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;

	    if (scope && typeof scope == 'object') {

	      if (scope[key] !== undefined) {
	        val = scope[key];

	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }

	    return val;
	  }

	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';

	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }

	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }

	    return partial;
	  }

	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;

	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }

	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }

	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };

	})( true ? exports : Hogan);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _expenses = __webpack_require__(18);

	var _expenses2 = _interopRequireDefault(_expenses);

	var _income = __webpack_require__(25);

	var _income2 = _interopRequireDefault(_income);

	var _stats = __webpack_require__(28);

	var _stats2 = _interopRequireDefault(_stats);

	var _categories = __webpack_require__(31);

	var _categories2 = _interopRequireDefault(_categories);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modules = { expenses: _expenses2.default, income: _income2.default, stats: _stats2.default, categories: _categories2.default };
	var el = void 0,
	    items = void 0,
	    contents = void 0,
	    selected = void 0;

	function onChange() {
		var hash = location.hash.substr(1);

		if (hash) selected = items.filter('[href="#' + hash + '"]');else selected = items.first();
		change(selected);
	}

	function change(item) {
		var id = item[0].hash.substr(1),
		    content = (0, _util2.default)('#' + id);

		items.removeClass('visible active');
		item.addClass('active');

		contents.removeClass('visible active');
		content.addClass('visible');
		setTimeout(function () {
			content.addClass('active');
		}, 100);

		// initialise module
		if (modules[id]) modules[id].init();
	}

	function init() {
		el = (0, _util2.default)('#menu');
		items = el.find('.fa');
		contents = (0, _util2.default)('#content .section');
		window.addEventListener('hashchange', onChange);
		onChange();
	}

	exports.default = {
		init: init
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _entries = __webpack_require__(19);

	var _entries2 = _interopRequireDefault(_entries);

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _grid = __webpack_require__(20);

	var _grid2 = _interopRequireDefault(_grid);

	var _form = __webpack_require__(21);

	var _form2 = _interopRequireDefault(_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var el,
	    grid,
	    previewGrid,
	    preview,
	    formContainer,
	    form,
	    isReady = false,
	    lastLoadDate;

	function load(force) {
		var date = _calendar2.default.get('YYYY-MM');
		// don't reload if month the same
		if (!lastLoadDate || lastLoadDate !== date || force === true) {
			lastLoadDate = date;
			grid.load({ date: date });
		}
		// update all inputs
		form.setDate(_calendar2.default.get(true));
		onPreview();
	}

	function onResp(resp) {
		if (resp.result === 'success') load(true);
		formContainer.removeClass('update');
	}

	function edit(item, row) {
		formContainer.addClass('update');
		grid.selectRow(row, true);
		_entries2.default.get(item.id).then(function (data) {
			_calendar2.default.set(data.date);
			form.set({ items: { 0: data }, repeat: 1 });
		});
	}

	function onDel(e) {
		if (e) e.preventDefault();
		var data = form.getData().items,
		    id = data && data[0] ? data[0].id : null;
		if (id && window.confirm('Are you sure you wish to delete this item?')) {
			_entries2.default.del(id).then(onResp).then(onReset);
		}
	}

	function onReset(e) {
		if (e) e.preventDefault();
		formContainer.removeClass('update');
		_calendar2.default.set(new Date());
		form.reset();
		grid.unselectRows();
		onPreview();
	}

	function onPreview() {
		var data = form.getData(),
		    sum = 0,
		    totalStr;
		preview.toggleClass('hidden', !(data.items && data.items.length));

		if (!data.items) return;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var r = _step.value;
				sum += r.amount;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		totalStr = _util2.default.formatNumber(sum);
		if (data.items) previewGrid.setData({ totalStr: totalStr, items: data.items });
	}

	/**
	 * Amount cell renderer/formatter
	 */
	function renderer(v, item) {
		if (v <= 0) {
			return '<span class="warn"><i class="fa fa-exclamation-circle"></i> €' + item.amount_str + '</span>';
		}
		return '€' + item.amount_str;
	}

	// Category & description renderer/formatter
	function categoryRenderer(v, item) {
		return v + ' - ' + item.description;
	}

	// Footer renderer/formatter
	function footer() /* data */{
		var total = this.items.reduce(function (pre, cur) {
			return pre + cur.amount;
		}, 0);
		console.log(total);
		total = _util2.default.formatNumber(total);
		// let total = data.totalStr;
		return '€' + total;
	}

	function init() {
		if (!isReady) {
			el = (0, _util2.default)('#expenses');
			preview = el.find('.preview');

			formContainer = el.find('.form');
			form = new _form2.default({
				target: formContainer,
				onAdd: onResp,
				onChange: onPreview
			});

			grid = new _grid2.default({
				target: el.find('.expenses-table')[0],
				sort: { by: 'date', order: 'desc' },
				dataSource: function dataSource(params) {
					return _entries2.default.get(params);
				},
				columns: [{ width: 27, icons: { pencil: edit } }, { name: 'Date', field: 'date', width: 90 }, { name: 'Category', field: 'category', renderer: categoryRenderer }, { name: 'Amount', field: 'amount', width: 100, renderer: renderer, footer: footer }]
			});

			previewGrid = new _grid2.default({
				target: el.find('.preview-table')[0],
				sort: { by: 'date', order: 'desc' },
				dataSource: function dataSource(params) {
					return _entries2.default.get(params);
				},
				columns: [{ name: 'Date', field: 'date', width: 90 }, { name: 'Category', field: 'category', width: '40%' }, { name: 'Description', field: 'description' }, { name: 'Amount', field: 'amount', width: 100, renderer: renderer, footer: footer }]
			});

			el.find('.btn-reset').on('click', onReset);
			el.find('.btn-del').on('click', onDel);
			_util2.default.on('calendar/changed', load);
		} else onReset();

		load();
		isReady = true;
	}

	exports.default = {
		init: init
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _url = 'entries';

	exports.default = {
		get: function get(params) {
			var id = typeof params === 'number' ? params : null;
			return _util2.default.get(_url + (id ? '/' + id : ''), params || {});
		},

		save: function save(params) {
			if (params.length === 1 && params[0].id) params = params[0]; // updating
			return _util2.default.post(_url + (params.id ? '/' + params.id : ''), params);
		},

		del: function del(id) {
			return _util2.default.del(_url + '/' + id);
		}
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else if(typeof exports === 'object')
			exports["grid"] = factory();
		else
			root["grid"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

		var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

		var data = _interopRequire(__webpack_require__(1));

		var events = _interopRequire(__webpack_require__(2));

		var html = _interopRequire(__webpack_require__(3));

		var columns = _interopRequire(__webpack_require__(4));

		var rows = _interopRequire(__webpack_require__(5));

		var Grid = function Grid(cfg) {
			_classCallCheck(this, Grid);

			var _defaults = {
				theme: "dark",
				target: document.body,
				sort: { by: "id", order: "asc" },
				dataSource: null,
				items: { label: "items", root: "items", itemId: "id" },
				columns: []
			};
			this.cfg = Object.assign(_defaults, cfg);
			this.processColumns().draw().initEvents();
		};

		Object.assign(Grid.prototype, data, events, html, columns, rows);
		module.exports = Grid;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		function _type(items, field) {
			if (!items || !items.length) {
				return "str";
			}var i, v, t, item;
			for (i = 0; item = items[i]; i++) {
				if (item && item[field]) v = typeof item[field];
				if (v === "number" || v === "string") t = v.substr(0, 3);
				if (t) break;
			}
			return t || "str";
		}

		function _sortFn(sort, items) {
			var by = sort.by,
			    order = sort.order,
			    sortType = _type(items, by),
			    strCmp = function (a, b) {
				return ("" + a[by]).toLowerCase().localeCompare(("" + b[by]).toLowerCase());
			};

			if (sortType === "num") {
				if (order === "asc") {
					return function (a, b) {
						return a[by] - b[by];
					};
				} else {
					return function (a, b) {
						return b[by] - a[by];
					};
				}
			} else {
				if (order === "asc") {
					return function (a, b) {
						return strCmp(a, b);
					};
				} else {
					return function (a, b) {
						return strCmp(b, a);
					};
				}
			}
		}

		function _fuzzy(haystack, s) {
			var hay = ("" + haystack).toLowerCase(),
			    i = 0,
			    n = -1,
			    l;
			s = ("" + s).toLowerCase();
			for (; l = s[i++];) if (! ~(n = hay.indexOf(l, n + 1))) {
				return false;
			}return true;
		}

		function load() {
			var params = arguments[0] === undefined ? {} : arguments[0];

			this.data = {};
			this.items = [];
			if (!this.cfg.dataSource) throw "No data source";
			var src = this.cfg.dataSource(params);
			if (src instanceof Promise) src.then(this.setData.bind(this));else this.setData(src);
			return this;
		}

		function setData(data) {
			if (!data) throw "No data!";
			this.data = data;
			if (this.cfg.items.root && data[this.cfg.items.root]) {
				this.items = data[this.cfg.items.root] || [];
			} else this.items = Array.isArray(data) ? data : [];
			this.originalItems = Object.assign([], this.items);
			return this.sortItems();
		}

		function sortItems(sortBy, order) {
			if (sortBy) this.cfg.sort.by = sortBy;
			if (order) this.cfg.sort.order = order;

			if (this.originalItems.length) {
				this.originalItems.sort(_sortFn({ by: "id", order: "desc" }, this.originalItems));
				if (sortBy) this.originalItems.sort(_sortFn(this.cfg.sort, this.originalItems));
			}
			this.populate();

			var all = this.el.head.querySelectorAll(".sort .fa-sort"),
			    cur = this.el.head.querySelector(".sort." + this.cfg.sort.by + " .fa-sort");
			for (var i = 0, l = all.length; i < l; i++) {
				all[i].classList.remove("fa-sort-asc", "fa-sort-desc");
			}
			if (cur) cur.classList.add("fa-sort-" + this.cfg.sort.order);
			return this;
		}

		function getItemById(id) {
			id = id.toString();
			return this.items.filter(function (item) {
				return item.id.toString() === id;
			})[0];
		}

		function filterData() {
			if (!this.filter) {
				this.items = Object.assign([], this.originalItems);
				return;
			}
			this.items = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.originalItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					for (var f in item) {
						if (_fuzzy(item[f], this.filter)) {
							this.items.push(item);
							break;
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}

		module.exports = {
			load: load,
			setData: setData,
			sortItems: sortItems,
			getItemById: getItemById,
			filterData: filterData
		};

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		function _closest(el, selector) {
			var has = false;
			while (!has && el) {
				has = el.matches(selector);
				if (has) {
					return el;
				}el = el.parentNode;
				if (el.tagName === "HTML") {
					return null;
				}
			}
			return null;
		}

		function _onClick(e) {
			var target = e.target,
			    action = "";

			if (_closest(target, "td.sort")) {
				target = _closest(target, "td.sort");
				var icon = target.querySelector(".fa-sort");
				var isDesc = icon.classList.contains("fa-sort-desc");
				this.sortItems(target.dataset.sortby, isDesc ? "asc" : "desc");
			} else if (_closest(target, ".grid-header-cell.action")) {
				target = _closest(target, ".row-action");
				if (target && target.dataset) action = target.dataset.action;
				if (action === "search") this.toggleSearchBox();
				e.preventDefault();
			} else if (_closest(target, ".row-action")) {
				target = _closest(target, ".row-action");
				e.preventDefault();
				var row = _closest(target, ".grid-row"),
				    id = row && +row.dataset.id,
				    item = row && this.getItemById(id);
				if (target.dataset) action = target.dataset.action;
				this.iconHandlers[action].call(this, item || null, row || null);
			}
		}

		function _onScroll() {
			var scrld = this.el.scroller.scrollTop > 0;
			this.el.headTable.classList.toggle("grid-header-scroll-over", scrld);
		}

		function _onResize() {
			if (this.resizeThrottle) window.clearTimeout(this.resizeThrottle);
			this.resizeThrottle = setTimeout(this.updateTableWidths.bind(this), 200);
		}

		function initEvents() {
			this.el.scroller.addEventListener("scroll", _onScroll.bind(this));
			this.el.target.addEventListener("click", _onClick.bind(this));
			window.addEventListener("resize", _onResize.bind(this));
		}

		function initFilterEvents() {
			if (!this.hasFilter) {
				return;
			}var self = this;
			this.el.filterInput.addEventListener("input", function () {
				self.populate.call(self, this.value);
			});
			this.el.filterInput.addEventListener("keyup", function (e) {
				if (e.keyCode === 27) {
					self.el.filterInput.value = "";
					self.el.filterBtn.focus();
					self.populate.call(self);
				}
			});
			this.el.filterInput.addEventListener("blur", function (e) {
				if (!e.target.value) self.toggleSearchBox.call(self);
			});
		}

		module.exports = {
			initEvents: initEvents,
			initFilterEvents: initFilterEvents
		};

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		var frameTpl = __webpack_require__(6);
		var rowTpl = __webpack_require__(7);
		var headerCellTpl = __webpack_require__(8);
		var footerCellTpl = __webpack_require__(9);

		function _getRowIcons(icons) {
			var iconHtml = "",
			    icon;
			for (icon in icons) {
				var title = icons[icon] && icons[icon].title || icon;
				iconHtml += "<a href=\"#\" class=\"row-action\" " + "data-action=\"" + icon + "\" " + "title=\"" + title + "\" " + "><i class=\"fa fa-" + icon + "\"></i></a>";
			}
			return iconHtml;
		}

		function _getHeaderRow() {
			var cells = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.cfg.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var col = _step.value;

					var sortCls = col.sortable ? "sort" : "";
					col.headerCls = ["grid-cell", "grid-header-cell", col.field, sortCls];
					if (!col.name && col.icons) {
						col.headerCls.push("action");
						col.name = "<a href=\"#\" class=\"row-action filter-btn\" data-action=\"search\" " + "title=\"Search\"><i class=\"fa fa-search\"></i></a>" + "<div class=\"filter-box\"><input class=\"filter-input\" type=\"text\"></div>";
						this.hasFilter = true;
					}
					col.headerCls = col.headerCls.join(" ");
					cells.push(headerCellTpl(col));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return cells.join("");
		}

		function _getFooterRow() {
			var cells = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.cfg.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var col = _step.value;

					col.footerCls = ["grid-cell", "grid-footer-cell", col.field].join(" ");
					if (typeof col.footer === "function") col.footerText = col.footer.call(this, this.data);else col.footerText = col.footer || "";
					cells.push(footerCellTpl(col));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return cells.join("");
		}

		function _getBodyRow(item) {
			var cells = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.cfg.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var col = _step.value;

					var cls = [col.field, col.icons ? "action" : ""].join(" ");
					var text = item[col.field];

					if (typeof col.renderer === "function") text = col.renderer.call(this, text, item);else if (col.icons) text = _getRowIcons(col.icons);

					cells.push({ cls: cls, text: text });
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return cells;
		}

		function _getEmptyRow() {
			return "<tr class=\"grid-row\">" + "<td class=\"grid-no-items\" colspan=\"" + this.cfg.columns.length + "\">" + "No entries</td><tr>";
		}

		function _getBody() {
			var _this = this;

			if (!this.items.length) {
				return _getEmptyRow.call(this);
			}return this.items.map(function (item) {
				return rowTpl({ id: item.id, cells: _getBodyRow.call(_this, item) });
			}, this).join("");
		}

		function populate(filter) {
			if (!this.isRendered) {
				this.el.head.innerHTML = _getHeaderRow.call(this);
				if (this.hasFilter) {
					this.el.filterBox = this.el.target.querySelector(".filter-box");
					this.el.filterInput = this.el.target.querySelector(".filter-input");
					this.el.filterBtn = this.el.target.querySelector(".filter-btn");
					this.initFilterEvents();
				}
				this.isRendered = true;
			}
			this.filter = filter;
			this.filterData();
			this.el.body.innerHTML = _getBody.call(this);
			this.el.foot.innerHTML = _getFooterRow.call(this);
			return this.updateColumnWidths();
		}

		function draw() {
			var theme = this.cfg.theme ? "grid-" + this.cfg.theme : "",
			    target = this.cfg.target;

			this.isRendered = false;
			target.innerHTML = frameTpl({ theme: theme });
			this.el = {
				target: target,
				scroller: target.querySelector(".grid-scroller"),
				head: target.querySelector(".grid-header"),
				body: target.querySelector(".grid-body"),
				foot: target.querySelector(".grid-footer"),
				headTable: target.querySelector(".grid-header-table"),
				bodyTable: target.querySelector(".grid-body-table")
			};
			return this;
		}

		function toggleSearchBox() {
			if (!this.hasFilter) {
				return;
			}var filterCell = this.el.filterBox.parentNode.classList;
			filterCell.toggle("filter-visible");
			if (filterCell.contains("filter-visible")) this.el.filterInput.focus();
		}

		module.exports = {
			populate: populate,
			draw: draw,
			toggleSearchBox: toggleSearchBox
		};

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		function processColumns() {
			var actions = {},
			    colWidths = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.cfg.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var col = _step.value;

					col.name = col.name || "";
					col.field = col.field || "";
					col.sortable = col.sortable !== false && !col.icons;

					if (col.icons) {
						for (var icon in col.icons) {
							var cb = function cb() {};
							if (typeof col.icons[icon] === "function") cb = col.icons[icon];else if (typeof col.icons[icon].cb === "function") cb = col.icons[icon].cb;
							actions[icon] = cb;
						}
					}
					if (typeof col.width === "string" && col.width.indexOf("%") === -1) {
						col.width = parseInt(col.width, 10);
					}
					colWidths.push(col.width || "auto");
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.columnWidths = colWidths;
			this.iconHandlers = actions;
			return this;
		}

		function updateColumnWidths() {
			var autos = 0,
			    sumW = 0,
			    remainingW,
			    autoPercent = 100,
			    autoW,
			    headCols = this.el.head.querySelectorAll(".grid-cell"),
			    bodyCols = this.el.body.querySelectorAll(".grid-row:first-of-type .grid-cell"),
			    footCols = this.el.foot.querySelectorAll(".grid-cell");

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.columnWidths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var col = _step.value;

					if (typeof col === "number") sumW += col;else if (col === "auto") autos++;else if (col.indexOf("%") > -1) autoPercent -= parseInt(col, 10);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			remainingW = this.el.head.offsetWidth - sumW;
			autoPercent = autoPercent / autos;
			autoW = remainingW * autoPercent / 100;

			this.columnWidths.forEach(function (col, i) {
				if (col === "auto") col = autoPercent + "%";else if (typeof col === "number") col = col + "px";

				if (headCols[i]) headCols[i].style.width = col;
				if (bodyCols[i]) bodyCols[i].style.width = col;
				if (footCols[i]) footCols[i].style.width = col;
			});

			return this.updateTableWidths();
		}

		function updateTableWidths() {
			var headW = undefined,
			    bodyW = undefined,
			    tabStyle = this.el.bodyTable.style;
			tabStyle.width = "100%";
			headW = this.el.headTable.offsetWidth;
			bodyW = this.el.bodyTable.offsetWidth;
			tabStyle.width = bodyW === headW ? "100%" : headW + "px";
			return this;
		}

		module.exports = {
			processColumns: processColumns,
			updateColumnWidths: updateColumnWidths,
			updateTableWidths: updateTableWidths
		};

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		function selectRow(row, unselectOther) {
			if (unselectOther) this.unselectRows();
			row.classList.add("selected");
			return this;
		}

		function unselectRows() {
			var rows = this.el.body.querySelectorAll(".grid-row.selected"),
			    i = 0,
			    l = rows.length;
			for (; i < l; i++) rows[i].classList.remove("selected");
			return this;
		}

		module.exports = {
			selectRow: selectRow,
			unselectRows: unselectRows
		};

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"grid ");t.b(t.v(t.f("theme",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<table class=\"grid-table grid-header-table\">\r");t.b("\n" + i);t.b("		<thead><tr class=\"grid-header\"></tr></thead>\r");t.b("\n" + i);t.b("	</table>\r");t.b("\n" + i);t.b("	<div class=\"grid-scroller\">\r");t.b("\n" + i);t.b("		<table class=\"grid-table grid-body-table\">\r");t.b("\n" + i);t.b("			<tbody class=\"grid-body\"></tbody>\r");t.b("\n" + i);t.b("		</table>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("	<table class=\"grid-table grid-footer-table\">\r");t.b("\n" + i);t.b("		<tfoot><tr class=\"grid-footer\"></tr></tfoot>\r");t.b("\n" + i);t.b("	</table>\r");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"grid {{theme}}\">\r\n\t<table class=\"grid-table grid-header-table\">\r\n\t\t<thead><tr class=\"grid-header\"></tr></thead>\r\n\t</table>\r\n\t<div class=\"grid-scroller\">\r\n\t\t<table class=\"grid-table grid-body-table\">\r\n\t\t\t<tbody class=\"grid-body\"></tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<table class=\"grid-table grid-footer-table\">\r\n\t\t<tfoot><tr class=\"grid-footer\"></tr></tfoot>\r\n\t</table>\r\n</div>", H); return T.render.apply(T, arguments); };

	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"grid-row\">\r");t.b("\n" + i);if(t.s(t.f("cells",c,p,1),c,p,0,51,140,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		<td class=\"grid-cell ");t.b(t.v(t.f("cls",c,p,0)));t.b("\"><span class=\"grid-cell-inner\">");t.b(t.t(t.f("text",c,p,0)));t.b("</span></td>\r");t.b("\n" + i);});c.pop();}t.b("</tr>");return t.fl(); },partials: {}, subs: {  }}, "<tr data-id=\"{{id}}\" class=\"grid-row\">\r\n\t{{#cells}}\r\n\t\t<td class=\"grid-cell {{cls}}\"><span class=\"grid-cell-inner\">{{{text}}}</span></td>\r\n\t{{/cells}}\r\n</tr>", H); return T.render.apply(T, arguments); };

	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<td class=\"");t.b(t.v(t.f("headerCls",c,p,0)));t.b("\" data-sortby=\"");t.b(t.v(t.f("field",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	");if(t.s(t.f("sortable",c,p,1),c,p,0,66,92,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<i class=\"fa fa-sort\"></i>");});c.pop();}t.b("\r");t.b("\n" + i);t.b("	<span class=\"grid-header-cell-inner\">");t.b(t.t(t.f("name",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("</td>");return t.fl(); },partials: {}, subs: {  }}, "<td class=\"{{headerCls}}\" data-sortby=\"{{field}}\">\r\n\t{{#sortable}}<i class=\"fa fa-sort\"></i>{{/sortable}}\r\n\t<span class=\"grid-header-cell-inner\">{{{name}}}</span>\r\n</td>", H); return T.render.apply(T, arguments); };

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<td class=\"");t.b(t.v(t.f("footerCls",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<span class=\"grid-footer-cell-inner\">");t.b(t.t(t.f("footerText",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("</td>");return t.fl(); },partials: {}, subs: {  }}, "<td class=\"{{footerCls}}\">\r\n\t<span class=\"grid-footer-cell-inner\">{{{footerText}}}</span>\r\n</td>", H); return T.render.apply(T, arguments); };

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		/*
		 *  Copyright 2011 Twitter, Inc.
		 *  Licensed under the Apache License, Version 2.0 (the "License");
		 *  you may not use this file except in compliance with the License.
		 *  You may obtain a copy of the License at
		 *
		 *  http://www.apache.org/licenses/LICENSE-2.0
		 *
		 *  Unless required by applicable law or agreed to in writing, software
		 *  distributed under the License is distributed on an "AS IS" BASIS,
		 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 *  See the License for the specific language governing permissions and
		 *  limitations under the License.
		 */

		// This file is for use with Node.js. See dist/ for browser files.

		var Hogan = __webpack_require__(11);
		Hogan.Template = __webpack_require__(12).Template;
		Hogan.template = Hogan.Template;
		module.exports = Hogan;


	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		/*
		 *  Copyright 2011 Twitter, Inc.
		 *  Licensed under the Apache License, Version 2.0 (the "License");
		 *  you may not use this file except in compliance with the License.
		 *  You may obtain a copy of the License at
		 *
		 *  http://www.apache.org/licenses/LICENSE-2.0
		 *
		 *  Unless required by applicable law or agreed to in writing, software
		 *  distributed under the License is distributed on an "AS IS" BASIS,
		 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 *  See the License for the specific language governing permissions and
		 *  limitations under the License.
		 */

		(function (Hogan) {
		  // Setup regex  assignments
		  // remove whitespace according to Mustache spec
		  var rIsWhitespace = /\S/,
		      rQuot = /\"/g,
		      rNewline =  /\n/g,
		      rCr = /\r/g,
		      rSlash = /\\/g,
		      rLineSep = /\u2028/,
		      rParagraphSep = /\u2029/;

		  Hogan.tags = {
		    '#': 1, '^': 2, '<': 3, '$': 4,
		    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
		    '{': 10, '&': 11, '_t': 12
		  };

		  Hogan.scan = function scan(text, delimiters) {
		    var len = text.length,
		        IN_TEXT = 0,
		        IN_TAG_TYPE = 1,
		        IN_TAG = 2,
		        state = IN_TEXT,
		        tagType = null,
		        tag = null,
		        buf = '',
		        tokens = [],
		        seenTag = false,
		        i = 0,
		        lineStart = 0,
		        otag = '{{',
		        ctag = '}}';

		    function addBuf() {
		      if (buf.length > 0) {
		        tokens.push({tag: '_t', text: new String(buf)});
		        buf = '';
		      }
		    }

		    function lineIsWhitespace() {
		      var isAllWhitespace = true;
		      for (var j = lineStart; j < tokens.length; j++) {
		        isAllWhitespace =
		          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
		          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
		        if (!isAllWhitespace) {
		          return false;
		        }
		      }

		      return isAllWhitespace;
		    }

		    function filterLine(haveSeenTag, noNewLine) {
		      addBuf();

		      if (haveSeenTag && lineIsWhitespace()) {
		        for (var j = lineStart, next; j < tokens.length; j++) {
		          if (tokens[j].text) {
		            if ((next = tokens[j+1]) && next.tag == '>') {
		              // set indent to token value
		              next.indent = tokens[j].text.toString()
		            }
		            tokens.splice(j, 1);
		          }
		        }
		      } else if (!noNewLine) {
		        tokens.push({tag:'\n'});
		      }

		      seenTag = false;
		      lineStart = tokens.length;
		    }

		    function changeDelimiters(text, index) {
		      var close = '=' + ctag,
		          closeIndex = text.indexOf(close, index),
		          delimiters = trim(
		            text.substring(text.indexOf('=', index) + 1, closeIndex)
		          ).split(' ');

		      otag = delimiters[0];
		      ctag = delimiters[delimiters.length - 1];

		      return closeIndex + close.length - 1;
		    }

		    if (delimiters) {
		      delimiters = delimiters.split(' ');
		      otag = delimiters[0];
		      ctag = delimiters[1];
		    }

		    for (i = 0; i < len; i++) {
		      if (state == IN_TEXT) {
		        if (tagChange(otag, text, i)) {
		          --i;
		          addBuf();
		          state = IN_TAG_TYPE;
		        } else {
		          if (text.charAt(i) == '\n') {
		            filterLine(seenTag);
		          } else {
		            buf += text.charAt(i);
		          }
		        }
		      } else if (state == IN_TAG_TYPE) {
		        i += otag.length - 1;
		        tag = Hogan.tags[text.charAt(i + 1)];
		        tagType = tag ? text.charAt(i + 1) : '_v';
		        if (tagType == '=') {
		          i = changeDelimiters(text, i);
		          state = IN_TEXT;
		        } else {
		          if (tag) {
		            i++;
		          }
		          state = IN_TAG;
		        }
		        seenTag = i;
		      } else {
		        if (tagChange(ctag, text, i)) {
		          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
		                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
		          buf = '';
		          i += ctag.length - 1;
		          state = IN_TEXT;
		          if (tagType == '{') {
		            if (ctag == '}}') {
		              i++;
		            } else {
		              cleanTripleStache(tokens[tokens.length - 1]);
		            }
		          }
		        } else {
		          buf += text.charAt(i);
		        }
		      }
		    }

		    filterLine(seenTag, true);

		    return tokens;
		  }

		  function cleanTripleStache(token) {
		    if (token.n.substr(token.n.length - 1) === '}') {
		      token.n = token.n.substring(0, token.n.length - 1);
		    }
		  }

		  function trim(s) {
		    if (s.trim) {
		      return s.trim();
		    }

		    return s.replace(/^\s*|\s*$/g, '');
		  }

		  function tagChange(tag, text, index) {
		    if (text.charAt(index) != tag.charAt(0)) {
		      return false;
		    }

		    for (var i = 1, l = tag.length; i < l; i++) {
		      if (text.charAt(index + i) != tag.charAt(i)) {
		        return false;
		      }
		    }

		    return true;
		  }

		  // the tags allowed inside super templates
		  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

		  function buildTree(tokens, kind, stack, customTags) {
		    var instructions = [],
		        opener = null,
		        tail = null,
		        token = null;

		    tail = stack[stack.length - 1];

		    while (tokens.length > 0) {
		      token = tokens.shift();

		      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
		        throw new Error('Illegal content in < super tag.');
		      }

		      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
		        stack.push(token);
		        token.nodes = buildTree(tokens, token.tag, stack, customTags);
		      } else if (token.tag == '/') {
		        if (stack.length === 0) {
		          throw new Error('Closing tag without opener: /' + token.n);
		        }
		        opener = stack.pop();
		        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
		          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
		        }
		        opener.end = token.i;
		        return instructions;
		      } else if (token.tag == '\n') {
		        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
		      }

		      instructions.push(token);
		    }

		    if (stack.length > 0) {
		      throw new Error('missing closing tag: ' + stack.pop().n);
		    }

		    return instructions;
		  }

		  function isOpener(token, tags) {
		    for (var i = 0, l = tags.length; i < l; i++) {
		      if (tags[i].o == token.n) {
		        token.tag = '#';
		        return true;
		      }
		    }
		  }

		  function isCloser(close, open, tags) {
		    for (var i = 0, l = tags.length; i < l; i++) {
		      if (tags[i].c == close && tags[i].o == open) {
		        return true;
		      }
		    }
		  }

		  function stringifySubstitutions(obj) {
		    var items = [];
		    for (var key in obj) {
		      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
		    }
		    return "{ " + items.join(",") + " }";
		  }

		  function stringifyPartials(codeObj) {
		    var partials = [];
		    for (var key in codeObj.partials) {
		      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
		    }
		    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
		  }

		  Hogan.stringify = function(codeObj, text, options) {
		    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
		  }

		  var serialNo = 0;
		  Hogan.generate = function(tree, text, options) {
		    serialNo = 0;
		    var context = { code: '', subs: {}, partials: {} };
		    Hogan.walk(tree, context);

		    if (options.asString) {
		      return this.stringify(context, text, options);
		    }

		    return this.makeTemplate(context, text, options);
		  }

		  Hogan.wrapMain = function(code) {
		    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
		  }

		  Hogan.template = Hogan.Template;

		  Hogan.makeTemplate = function(codeObj, text, options) {
		    var template = this.makePartials(codeObj);
		    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
		    return new this.template(template, text, this, options);
		  }

		  Hogan.makePartials = function(codeObj) {
		    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
		    for (key in template.partials) {
		      template.partials[key] = this.makePartials(template.partials[key]);
		    }
		    for (key in codeObj.subs) {
		      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
		    }
		    return template;
		  }

		  function esc(s) {
		    return s.replace(rSlash, '\\\\')
		            .replace(rQuot, '\\\"')
		            .replace(rNewline, '\\n')
		            .replace(rCr, '\\r')
		            .replace(rLineSep, '\\u2028')
		            .replace(rParagraphSep, '\\u2029');
		  }

		  function chooseMethod(s) {
		    return (~s.indexOf('.')) ? 'd' : 'f';
		  }

		  function createPartial(node, context) {
		    var prefix = "<" + (context.prefix || "");
		    var sym = prefix + node.n + serialNo++;
		    context.partials[sym] = {name: node.n, partials: {}};
		    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
		    return sym;
		  }

		  Hogan.codegen = {
		    '#': function(node, context) {
		      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
		                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
		                      't.rs(c,p,' + 'function(c,p,t){';
		      Hogan.walk(node.nodes, context);
		      context.code += '});c.pop();}';
		    },

		    '^': function(node, context) {
		      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
		      Hogan.walk(node.nodes, context);
		      context.code += '};';
		    },

		    '>': createPartial,
		    '<': function(node, context) {
		      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
		      Hogan.walk(node.nodes, ctx);
		      var template = context.partials[createPartial(node, context)];
		      template.subs = ctx.subs;
		      template.partials = ctx.partials;
		    },

		    '$': function(node, context) {
		      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
		      Hogan.walk(node.nodes, ctx);
		      context.subs[node.n] = ctx.code;
		      if (!context.inPartial) {
		        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
		      }
		    },

		    '\n': function(node, context) {
		      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
		    },

		    '_v': function(node, context) {
		      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
		    },

		    '_t': function(node, context) {
		      context.code += write('"' + esc(node.text) + '"');
		    },

		    '{': tripleStache,

		    '&': tripleStache
		  }

		  function tripleStache(node, context) {
		    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
		  }

		  function write(s) {
		    return 't.b(' + s + ');';
		  }

		  Hogan.walk = function(nodelist, context) {
		    var func;
		    for (var i = 0, l = nodelist.length; i < l; i++) {
		      func = Hogan.codegen[nodelist[i].tag];
		      func && func(nodelist[i], context);
		    }
		    return context;
		  }

		  Hogan.parse = function(tokens, text, options) {
		    options = options || {};
		    return buildTree(tokens, '', [], options.sectionTags || []);
		  }

		  Hogan.cache = {};

		  Hogan.cacheKey = function(text, options) {
		    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
		  }

		  Hogan.compile = function(text, options) {
		    options = options || {};
		    var key = Hogan.cacheKey(text, options);
		    var template = this.cache[key];

		    if (template) {
		      var partials = template.partials;
		      for (var name in partials) {
		        delete partials[name].instance;
		      }
		      return template;
		    }

		    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
		    return this.cache[key] = template;
		  }
		})(true ? exports : Hogan);


	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {

		/*
		 *  Copyright 2011 Twitter, Inc.
		 *  Licensed under the Apache License, Version 2.0 (the "License");
		 *  you may not use this file except in compliance with the License.
		 *  You may obtain a copy of the License at
		 *
		 *  http://www.apache.org/licenses/LICENSE-2.0
		 *
		 *  Unless required by applicable law or agreed to in writing, software
		 *  distributed under the License is distributed on an "AS IS" BASIS,
		 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 *  See the License for the specific language governing permissions and
		 *  limitations under the License.
		 */

		var Hogan = {};

		(function (Hogan) {
		  Hogan.Template = function (codeObj, text, compiler, options) {
		    codeObj = codeObj || {};
		    this.r = codeObj.code || this.r;
		    this.c = compiler;
		    this.options = options || {};
		    this.text = text || '';
		    this.partials = codeObj.partials || {};
		    this.subs = codeObj.subs || {};
		    this.buf = '';
		  }

		  Hogan.Template.prototype = {
		    // render: replaced by generated code.
		    r: function (context, partials, indent) { return ''; },

		    // variable escaping
		    v: hoganEscape,

		    // triple stache
		    t: coerceToString,

		    render: function render(context, partials, indent) {
		      return this.ri([context], partials || {}, indent);
		    },

		    // render internal -- a hook for overrides that catches partials too
		    ri: function (context, partials, indent) {
		      return this.r(context, partials, indent);
		    },

		    // ensurePartial
		    ep: function(symbol, partials) {
		      var partial = this.partials[symbol];

		      // check to see that if we've instantiated this partial before
		      var template = partials[partial.name];
		      if (partial.instance && partial.base == template) {
		        return partial.instance;
		      }

		      if (typeof template == 'string') {
		        if (!this.c) {
		          throw new Error("No compiler available.");
		        }
		        template = this.c.compile(template, this.options);
		      }

		      if (!template) {
		        return null;
		      }

		      // We use this to check whether the partials dictionary has changed
		      this.partials[symbol].base = template;

		      if (partial.subs) {
		        // Make sure we consider parent template now
		        if (!partials.stackText) partials.stackText = {};
		        for (key in partial.subs) {
		          if (!partials.stackText[key]) {
		            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
		          }
		        }
		        template = createSpecializedPartial(template, partial.subs, partial.partials,
		          this.stackSubs, this.stackPartials, partials.stackText);
		      }
		      this.partials[symbol].instance = template;

		      return template;
		    },

		    // tries to find a partial in the current scope and render it
		    rp: function(symbol, context, partials, indent) {
		      var partial = this.ep(symbol, partials);
		      if (!partial) {
		        return '';
		      }

		      return partial.ri(context, partials, indent);
		    },

		    // render a section
		    rs: function(context, partials, section) {
		      var tail = context[context.length - 1];

		      if (!isArray(tail)) {
		        section(context, partials, this);
		        return;
		      }

		      for (var i = 0; i < tail.length; i++) {
		        context.push(tail[i]);
		        section(context, partials, this);
		        context.pop();
		      }
		    },

		    // maybe start a section
		    s: function(val, ctx, partials, inverted, start, end, tags) {
		      var pass;

		      if (isArray(val) && val.length === 0) {
		        return false;
		      }

		      if (typeof val == 'function') {
		        val = this.ms(val, ctx, partials, inverted, start, end, tags);
		      }

		      pass = !!val;

		      if (!inverted && pass && ctx) {
		        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
		      }

		      return pass;
		    },

		    // find values with dotted names
		    d: function(key, ctx, partials, returnFound) {
		      var found,
		          names = key.split('.'),
		          val = this.f(names[0], ctx, partials, returnFound),
		          doModelGet = this.options.modelGet,
		          cx = null;

		      if (key === '.' && isArray(ctx[ctx.length - 2])) {
		        val = ctx[ctx.length - 1];
		      } else {
		        for (var i = 1; i < names.length; i++) {
		          found = findInScope(names[i], val, doModelGet);
		          if (found !== undefined) {
		            cx = val;
		            val = found;
		          } else {
		            val = '';
		          }
		        }
		      }

		      if (returnFound && !val) {
		        return false;
		      }

		      if (!returnFound && typeof val == 'function') {
		        ctx.push(cx);
		        val = this.mv(val, ctx, partials);
		        ctx.pop();
		      }

		      return val;
		    },

		    // find values with normal names
		    f: function(key, ctx, partials, returnFound) {
		      var val = false,
		          v = null,
		          found = false,
		          doModelGet = this.options.modelGet;

		      for (var i = ctx.length - 1; i >= 0; i--) {
		        v = ctx[i];
		        val = findInScope(key, v, doModelGet);
		        if (val !== undefined) {
		          found = true;
		          break;
		        }
		      }

		      if (!found) {
		        return (returnFound) ? false : "";
		      }

		      if (!returnFound && typeof val == 'function') {
		        val = this.mv(val, ctx, partials);
		      }

		      return val;
		    },

		    // higher order templates
		    ls: function(func, cx, partials, text, tags) {
		      var oldTags = this.options.delimiters;

		      this.options.delimiters = tags;
		      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
		      this.options.delimiters = oldTags;

		      return false;
		    },

		    // compile text
		    ct: function(text, cx, partials) {
		      if (this.options.disableLambda) {
		        throw new Error('Lambda features disabled.');
		      }
		      return this.c.compile(text, this.options).render(cx, partials);
		    },

		    // template result buffering
		    b: function(s) { this.buf += s; },

		    fl: function() { var r = this.buf; this.buf = ''; return r; },

		    // method replace section
		    ms: function(func, ctx, partials, inverted, start, end, tags) {
		      var textSource,
		          cx = ctx[ctx.length - 1],
		          result = func.call(cx);

		      if (typeof result == 'function') {
		        if (inverted) {
		          return true;
		        } else {
		          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
		          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
		        }
		      }

		      return result;
		    },

		    // method replace variable
		    mv: function(func, ctx, partials) {
		      var cx = ctx[ctx.length - 1];
		      var result = func.call(cx);

		      if (typeof result == 'function') {
		        return this.ct(coerceToString(result.call(cx)), cx, partials);
		      }

		      return result;
		    },

		    sub: function(name, context, partials, indent) {
		      var f = this.subs[name];
		      if (f) {
		        this.activeSub = name;
		        f(context, partials, this, indent);
		        this.activeSub = false;
		      }
		    }

		  };

		  //Find a key in an object
		  function findInScope(key, scope, doModelGet) {
		    var val;

		    if (scope && typeof scope == 'object') {

		      if (scope[key] !== undefined) {
		        val = scope[key];

		      // try lookup with get for backbone or similar model data
		      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
		        val = scope.get(key);
		      }
		    }

		    return val;
		  }

		  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
		    function PartialTemplate() {};
		    PartialTemplate.prototype = instance;
		    function Substitutions() {};
		    Substitutions.prototype = instance.subs;
		    var key;
		    var partial = new PartialTemplate();
		    partial.subs = new Substitutions();
		    partial.subsText = {};  //hehe. substext.
		    partial.buf = '';

		    stackSubs = stackSubs || {};
		    partial.stackSubs = stackSubs;
		    partial.subsText = stackText;
		    for (key in subs) {
		      if (!stackSubs[key]) stackSubs[key] = subs[key];
		    }
		    for (key in stackSubs) {
		      partial.subs[key] = stackSubs[key];
		    }

		    stackPartials = stackPartials || {};
		    partial.stackPartials = stackPartials;
		    for (key in partials) {
		      if (!stackPartials[key]) stackPartials[key] = partials[key];
		    }
		    for (key in stackPartials) {
		      partial.partials[key] = stackPartials[key];
		    }

		    return partial;
		  }

		  var rAmp = /&/g,
		      rLt = /</g,
		      rGt = />/g,
		      rApos = /\'/g,
		      rQuot = /\"/g,
		      hChars = /[&<>\"\']/;

		  function coerceToString(val) {
		    return String((val === null || val === undefined) ? '' : val);
		  }

		  function hoganEscape(str) {
		    str = coerceToString(str);
		    return hChars.test(str) ?
		      str
		        .replace(rAmp, '&amp;')
		        .replace(rLt, '&lt;')
		        .replace(rGt, '&gt;')
		        .replace(rApos, '&#39;')
		        .replace(rQuot, '&quot;') :
		      str;
		  }

		  var isArray = Array.isArray || function(a) {
		    return Object.prototype.toString.call(a) === '[object Array]';
		  };

		})(true ? exports : Hogan);


	/***/ }
	/******/ ])
	});


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _toaster = __webpack_require__(22);

	var _toaster2 = _interopRequireDefault(_toaster);

	var _entries = __webpack_require__(19);

	var _entries2 = _interopRequireDefault(_entries);

	var _categories = __webpack_require__(23);

	var _categories2 = _interopRequireDefault(_categories);

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _moment = __webpack_require__(11);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tpl = __webpack_require__(24);
	var _defaults = {
		onAdd: function onAdd() {}
	};

	function parseCategories(cats) {
		var map = {};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = cats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var p = _step.value;

				if (p.items) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = p.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var c = _step2.value;
							map[c.id] = c.name;
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return map;
	}

	function cloneItem(item) {
		var addMonths = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

		var newItem = JSON.parse(JSON.stringify(item));
		newItem.date = (0, _moment2.default)(newItem.date).add(addMonths, 'months').format('YYYY-MM-DD');
		return newItem;
	}

	// items repeat for X months
	function repeatItems(items, times) {
		if (!items || !items.length) return [];
		var newItems = [];
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var item = _step3.value;

				for (var i = 1; i < times; i++) {
					newItems.push(cloneItem(item, i));
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		items = items.concat(newItems);
		items.sort(function (a, b) {
			return a.date.localeCompare(b.date);
		});
		return items;
	}

	var Form = function () {
		function Form(config) {
			_classCallCheck(this, Form);

			this.cfg = Object.assign(_defaults, config);
			this.el = this.cfg.target;
			this.form = _util2.default.form(this.el[0]);
			this.subforms = this.cfg.target.find('.subforms');

			this.categories = [];
			this.catMap = {};

			this.el.on('submit', this.onSubmit.bind(this));
			this.el.on('click', this.onClick.bind(this));

			if (typeof this.cfg.onChange === 'function') {
				this.form.observe(function (nv, ov, f) {
					this.cfg.onChange.call(this.cfg.onChange, nv, ov, f);
				}.bind(this));
			}
			this.draw();
		}

		_createClass(Form, [{
			key: 'draw',
			value: function draw() {
				var _this = this;

				if (this.categories.length) this.reset();else _categories2.default.getTree().then(function (data) {
					_this.categories = data;
					_this.catMap = parseCategories(data);
					_this.reset();
				});
				return this;
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.subforms.html('');
				this.split(true);
				var rep = this.el.find('.repeat-in');
				if (rep) rep[0].value = 1;
				return this;
			}
		}, {
			key: 'set',
			value: function set(data) {
				this.reset();
				this.form.set(data);
				return this;
			}
		}, {
			key: 'unsplit',
			value: function unsplit(btn) {
				btn.closest('.form-row').remove();
				var rows = this.el.find('.form-row');
				_util2.default.each(rows, function (row, i) {
					var fields = (0, _util2.default)(row).find('input,select');
					_util2.default.each(fields, function (f) {
						if (!f.name) return;
						f.name = f.name.replace(/\[\d+\]/, '[' + i + ']');
					});
				});
				this.subforms.find('.form-row:last-of-type .category')[0].focus();
				this.cfg.onChange.call(this.cfg.onChange);
			}
		}, {
			key: 'split',
			value: function split(first) {
				var idx = this.subforms.find('.form-row').length;
				var firstDesc = this.subforms.find('.form-row:first-of-type .description')[0];
				var description = firstDesc ? firstDesc.value : '';
				var rec = { first: first === true, categories: this.categories, idx: idx, description: description };
				var subform = (0, _util2.default)(tpl(rec));
				subform.appendTo(this.subforms).find('select')[0].focus();
				this.addInputEvents(subform);
			}
		}, {
			key: 'setDate',
			value: function setDate(date) {
				var dates = this.subforms.find('input[name$="date"]');
				_util2.default.each(dates, function (f) {
					f.value = date;
				});
			}
		}, {
			key: 'getData',
			value: function getData() {
				var clean = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

				var date = _calendar2.default.get(true),
				    format = function format(n) {
					return _util2.default.formatNumber(n);
				},
				    formData = this.form.get(true),
				    data = [],
				    errors = [],
				    total = 0;

				_util2.default.each(formData.items, function (item, i) {
					if (!item.date) item.date = date;
					if (!item.amount) errors.push('Please enter amount!');else {
						item.amount = this.parseAmount(item.amount);
						if (i.toString() === '0') total = item.amount;else total -= item.amount;
						if (!clean) {
							item.amount_str = format(item.amount);
							item.category = this.catMap[item.category_id];
						}
						data.push(item);
					}
				}, this);
				if (errors.length && clean) return _toaster2.default.error(errors[0]);
				if (data && data.length) {
					data[0].amount = total;
					if (!clean) data[0].amount_str = format(total);
				}
				formData.items = repeatItems(data, formData.repeat);
				return formData;
			}
		}, {
			key: 'parseAmount',
			value: function parseAmount(amount) {
				/*jshint evil: true */
				amount = ('' + amount).replace(/\s/g, '');
				if (!/^[\+\-\\*\/\(\)\d\.]+$/i.test(amount)) return 0;
				if (/[\+\-\\*\/\.]+/i.test(amount)) {
					try {
						amount = eval(amount);
					} catch (e) {
						amount = 0;
					}
				}
				return parseFloat(amount);
			}
		}, {
			key: 'validate',
			value: function validate(data) {
				if (!data || !data.length) return false;
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var d = _step4.value;

						if (d.amount <= 0) return _toaster2.default.error('Amount cannot be negative');
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				return true;
			}
		}, {
			key: 'addInputEvents',
			value: function addInputEvents(subform) {
				var inputs = subform.find('.category, .amount, .description');
				var amount = subform.find('.amount');
				amount.on('keydown', this.onKeyDown.bind(this));
				inputs.on('keyup', this.onKeyUp.bind(this));
			}
		}, {
			key: 'onKeyUp',
			value: function onKeyUp(e) {
				var target = (0, _util2.default)(e.target);
				if (e.keyCode === _util2.default.keys.C && e.ctrlKey) this.split();else if (e.keyCode === _util2.default.keys.X && e.ctrlKey) this.unsplit(target);else return;
				e.preventDefault();
			}
		}, {
			key: 'onKeyDown',
			value: function onKeyDown(e) {
				if (e.keyCode === _util2.default.keys.ENTER) return true;
				if (_util2.default.isAllowed(e)) return true;
				e.preventDefault();
			}
		}, {
			key: 'onClick',
			value: function onClick(e) {
				var target = (0, _util2.default)(e.target);
				if (target.is('.btn-split')) this.split();else if (target.is('.btn-unsplit')) this.unsplit(target);else return;
				e.preventDefault();
			}
		}, {
			key: 'onSubmit',
			value: function onSubmit(e) {
				var _this2 = this;

				e.preventDefault();
				var data = this.getData(true).items;
				if (!this.validate(data)) return;
				if (data) _entries2.default.save(data).then(function (resp) {
					if (resp.result === 'success') _this2.reset();return resp;
				}).then(this.cfg.onAdd);
			}
		}]);

		return Form;
	}();

	exports.default = Form;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function Toaster(msg) {
		console.log(msg);
	}

	Toaster.error = function (msg) {
		console.error(msg);
		return false;
	};

	Toaster.warning = function (msg) {
		console.warn(msg);
		return false;
	};

	Toaster.info = function (msg) {
		console.info(msg);
	};

	Toaster.success = function (msg) {
		console.log(msg);
	};

	exports.default = Toaster;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _url = 'categories';

	exports.default = {
		get: function get() {
			return _util2.default.get(_url);
		},
		getTree: function getTree() {
			return _util2.default.get('categorytree');
		},
		save: function save(params) {
			if (!params.id) delete params.id;
			return _util2.default.post(_url + (params.id ? '/' + params.id : ''), params);
		},
		del: function del(params) {
			return _util2.default.del(_url + '/' + params.id);
		}
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(14);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-row\">");t.b("\n" + i);t.b("	<input type=\"hidden\" name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]id\">");t.b("\n");t.b("\n" + i);t.b("	<input type=\"hidden\" name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]date\">");t.b("\n");t.b("\n" + i);t.b("	<div class=\"select-wrap\">");t.b("\n" + i);t.b("		<select name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]category_id\" class=\"category\">");t.b("\n" + i);if(t.s(t.f("categories",c,p,1),c,p,0,227,342,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("			<optgroup label=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("				");if(t.s(t.f("items",c,p,1),c,p,0,273,313,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<option value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</option>");});c.pop();}t.b("\n" + i);t.b("			</optgroup>");t.b("\n" + i);});c.pop();}t.b("		</select>");t.b("\n" + i);t.b("	</div>");t.b("\n");t.b("\n" + i);t.b("	<input name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]description\" class=\"description\" placeholder=\"description\" value=\"");t.b(t.v(t.f("description",c,p,0)));t.b("\">");t.b("\n" + i);t.b("	<input name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]amount\" class=\"amount\" placeholder=\"0.00\">");t.b("\n" + i);t.b("	");if(t.s(t.f("first",c,p,1),c,p,0,573,675,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<button type=\"button\" title=\"Split\" class=\"btn-split\"><i class=\"fa fa-angle-double-down\"></i></button>");});c.pop();}t.b("\n" + i);t.b("	");if(!t.s(t.f("first",c,p,1),c,p,1,0,0,"")){t.b("<button type=\"button\" title=\"Remove\" class=\"btn-unsplit\"><i class=\"fa fa-trash-o\"></i></button>");};t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"form-row\">\n\t<input type=\"hidden\" name=\"items[{{idx}}]id\">\n\n\t<input type=\"hidden\" name=\"items[{{idx}}]date\">\n\n\t<div class=\"select-wrap\">\n\t\t<select name=\"items[{{idx}}]category_id\" class=\"category\">\n\t\t\t{{#categories}}\n\t\t\t<optgroup label=\"{{name}}\">\n\t\t\t\t{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}\n\t\t\t</optgroup>\n\t\t\t{{/categories}}\n\t\t</select>\n\t</div>\n\n\t<input name=\"items[{{idx}}]description\" class=\"description\" placeholder=\"description\" value=\"{{description}}\">\n\t<input name=\"items[{{idx}}]amount\" class=\"amount\" placeholder=\"0.00\">\n\t{{#first}}<button type=\"button\" title=\"Split\" class=\"btn-split\"><i class=\"fa fa-angle-double-down\"></i></button>{{/first}}\n\t{{^first}}<button type=\"button\" title=\"Remove\" class=\"btn-unsplit\"><i class=\"fa fa-trash-o\"></i></button>{{/first}}\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _incomes = __webpack_require__(26);

	var _incomes2 = _interopRequireDefault(_incomes);

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _grid = __webpack_require__(20);

	var _grid2 = _interopRequireDefault(_grid);

	var _form = __webpack_require__(27);

	var _form2 = _interopRequireDefault(_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var el,
	    grid,
	    previewGrid,
	    preview,
	    formContainer,
	    form,
	    isReady = false,
	    lastLoadDate;

	function load(force) {
		var date = _calendar2.default.get('YYYY-MM');
		// don't reload if month the same
		if (!lastLoadDate || lastLoadDate !== date || force === true) {
			lastLoadDate = date;
			grid.load({ date: date });
		}
		// update all inputs
		form.setDate(_calendar2.default.get(true));
		onPreview();
	}

	function onResp(resp) {
		if (resp.result === 'success') load(true);
		formContainer.removeClass('update');
	}

	function edit(item, row) {
		formContainer.addClass('update');
		grid.selectRow(row, true);
		_incomes2.default.get(item.id).then(function (data) {
			_calendar2.default.set(data.date);
			data.repeat = 1;
			form.set(data);
		});
	}

	function onDel(e) {
		if (e) e.preventDefault();
		var data = form.getData().items,
		    id = data && data[0] ? data[0].id : null;
		if (id && window.confirm('Are you sure you wish to delete this item?')) {
			_incomes2.default.del(id).then(onResp);
		}
	}

	function onReset(e) {
		if (e) e.preventDefault();
		formContainer.removeClass('update');
		_calendar2.default.set(new Date());
		form.reset();
		grid.unselectRows();
		onPreview();
	}

	function onPreview() {
		var data = form.getData(),
		    sum = 0,
		    total_str;
		preview.toggleClass('hidden', !(data.items && data.items.length));

		if (!data.items) return;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var r = _step.value;
				sum += r.amount;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		total_str = _util2.default.formatNumber(sum);
		if (data.items) previewGrid.setData({ total_str: total_str, items: data.items });
	}

	/**
	 * Amount cell renderer/formatter
	 */
	function renderer(v, item) {
		if (v <= 0) {
			return '<span class="warn"><i class="fa fa-exclamation-circle"></i> €' + item.amount_str + '</span>';
		}
		return '€' + item.amount_str;
	}

	/**
	 * Footer renderer/formatter
	 */
	function footer(data) {
		return '€' + data.total_str;
	}

	function init() {
		if (!isReady) {
			el = (0, _util2.default)('#income');
			preview = el.find('.preview');
			formContainer = el.find('.form');

			form = new _form2.default({
				target: formContainer,
				onAdd: onResp,
				onChange: onPreview
			});
			grid = new _grid2.default({
				target: el.find('.income-table')[0],
				sort: { by: 'date', order: 'desc' },
				dataSource: function dataSource(params) {
					return _incomes2.default.get(params);
				},
				columns: [{ width: 27, icons: { pencil: edit } }, { name: 'Date', field: 'date', width: 90 }, { name: 'Description', field: 'description' }, { name: 'Amount', field: 'amount', width: 105, renderer: renderer, footer: footer }]
			});

			previewGrid = new _grid2.default({
				target: el.find('.preview-table')[0],
				sort: { by: 'date', order: 'desc' },
				dataSource: function dataSource(params) {
					return _incomes2.default.get(params);
				},
				columns: [{ name: 'Date', field: 'date', width: 90 }, { name: 'Description', field: 'description' }, { name: 'Amount', field: 'amount', width: 105, renderer: renderer, footer: footer }]
			});

			el.find('.btn-reset').on('click', onReset);
			el.find('.btn-del').on('click', onDel);
			_util2.default.on('calendar/changed', load);
		} else onReset();

		load();
		isReady = true;
	}

	exports.default = {
		init: init
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _url = 'incomes';

	exports.default = {
		get: function get(params) {
			var id = typeof params === 'number' ? params : null;
			return _util2.default.get(_url + (id ? '/' + id : ''), params || {});
		},

		save: function save(params) {
			if (params.length === 1 && params[0].id) params = params[0]; // updating
			return _util2.default.post(_url + (params.id ? '/' + params.id : ''), params);
		},

		del: function del(id) {
			return _util2.default.del(_url + '/' + id);
		}
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _toaster = __webpack_require__(22);

	var _toaster2 = _interopRequireDefault(_toaster);

	var _incomes = __webpack_require__(26);

	var _incomes2 = _interopRequireDefault(_incomes);

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _moment = __webpack_require__(11);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _defaults = {
		onAdd: function onAdd() {}
	};

	function cloneItem(item) {
		var addMonths = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

		var newItem = JSON.parse(JSON.stringify(item));
		newItem.date = (0, _moment2.default)(newItem.date).add(addMonths, 'months').format('YYYY-MM-DD');
		return newItem;
	}

	// items repeat for X months
	function repeatItems(items, times) {
		if (!items || !items.length) return [];
		var newItems = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;

				for (var i = 1; i < times; i++) {
					newItems.push(cloneItem(item, i));
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		items = items.concat(newItems);
		items.sort(function (a, b) {
			return a.date.localeCompare(b.date);
		});
		return items;
	}

	var Form = function () {
		function Form(config) {
			_classCallCheck(this, Form);

			this.cfg = Object.assign(_defaults, config);
			this.el = this.cfg.target;
			this.form = _util2.default.form(this.el[0]);
			this.subforms = this.cfg.target.find('.subforms');

			this.categories = [];
			this.catMap = {};

			this.el.on('submit', this.onSubmit.bind(this));

			if (typeof this.cfg.onChange === 'function') {
				this.form.observe(function (nv, ov, f) {
					this.cfg.onChange.call(this.cfg.onChange, nv, ov, f);
				}.bind(this));
			}

			var subform = this.subforms.find('.form-row');
			subform.find('input')[0].focus();
			this.addInputEvents(subform);

			return this.reset();
		}

		_createClass(Form, [{
			key: 'reset',
			value: function reset() {
				this.form.reset();
				var rep = this.el.find('.repeat-in');
				if (rep) rep[0].value = 1;
				return this;
			}
		}, {
			key: 'set',
			value: function set(data) {
				this.reset();
				this.form.set(data);
				return this;
			}
		}, {
			key: 'setDate',
			value: function setDate(date) {
				var dates = this.subforms.find('input[name$="date"]');
				_util2.default.each(dates, function (f) {
					f.value = date;
				});
			}
		}, {
			key: 'getData',
			value: function getData() {
				var clean = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

				var date = _calendar2.default.get(true),
				    format = function format(n) {
					return _util2.default.formatNumber(n);
				},
				    item = this.form.get(true),
				    repeat = item.repeat,
				    errors = [];

				delete item.repeat;
				if (!item.date) item.date = date;
				if (!item.amount) errors.push('Please enter amount!');else {
					item.amount = this.parseAmount(item.amount);
					if (!clean) item.amount_str = format(item.amount);
				}
				if (errors.length && clean) return _toaster2.default.error(errors[0]);
				if (!errors.length) return { items: repeatItems([item], repeat) };
				return {};
			}
		}, {
			key: 'parseAmount',
			value: function parseAmount(amount) {
				/*jshint evil: true */
				amount = ('' + amount).replace(/\s/g, '');
				if (!/^[\+\-\\*\/\(\)\d\.]+$/i.test(amount)) return 0;
				if (/[\+\-\\*\/\.]+/i.test(amount)) {
					try {
						amount = eval(amount);
					} catch (e) {
						amount = 0;
					}
				}
				return parseFloat(amount);
			}
		}, {
			key: 'validate',
			value: function validate(data) {
				if (!data || !data.length) return false;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var d = _step2.value;

						if (d.amount <= 0) return _toaster2.default.error('Amount cannot be negative');
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				return true;
			}
		}, {
			key: 'addInputEvents',
			value: function addInputEvents(subform) {
				var inputs = subform.find('.amount');
				inputs.on('keydown', this.onKeyDown.bind(this));
			}
		}, {
			key: 'onKeyDown',
			value: function onKeyDown(e) {
				if (e.keyCode === _util2.default.keys.ENTER) return true;
				if (_util2.default.isAllowed(e)) return true;
				e.preventDefault();
			}
		}, {
			key: 'onSubmit',
			value: function onSubmit(e) {
				var _this = this;

				e.preventDefault();
				var data = this.getData(true);
				if (!this.validate(data.items)) return;
				if (data.items) _incomes2.default.save(data.items).then(function (resp) {
					if (resp.result === 'success') _this.reset();return resp;
				}).then(this.cfg.onAdd);
			}
		}]);

		return Form;
	}();

	exports.default = Form;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _stats = __webpack_require__(29);

	var _stats2 = _interopRequireDefault(_stats);

	var _Chart = __webpack_require__(30);

	var _Chart2 = _interopRequireDefault(_Chart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var lastLoadDate,
	    _chart0,
	    _chart1,
	    _chart2,
	    isReady = false;

	function chart0(data) {
		if (!_chart0) _chart0 = (0, _Chart2.default)('pie', 'chart0', 'Spending by category (this month)', data);else {
			_chart0.series[0].remove();
			_chart0.addSeries(data);
		}
	}

	function chart1(data) {
		if (!_chart1) _chart1 = (0, _Chart2.default)('line', 'chart1', 'Income vs Expenses (this year)', data);else {
			_chart1.xAxis[0].removePlotBand('m');
			var m = +_calendar2.default.get('M') - 1.5;
			_chart1.xAxis[0].addPlotBand({ id: 'm', from: m, to: m + 1, color: 'rgba(80,80,80,0.3)' });
		}
	}

	function chart2(data) {
		if (!_chart2) _chart2 = (0, _Chart2.default)('stock', 'chart2', 'Spending by time (day-by-day, current month), for [categories dropdown]', data);
	}

	function load(force) {
		var date = _calendar2.default.get('YYYY-MM');
		// don't reload if month the same
		if (!lastLoadDate || lastLoadDate !== date || force === true) {
			lastLoadDate = date;
			_stats2.default.spendingByCategory({ date: date }).then(chart0);
			_stats2.default.incomeVsExpenses({ year: _calendar2.default.get('YYYY') }).then(chart1);
			_stats2.default.spendingByDay({ date: date }).then(chart2);
		}
	}

	function init() {
		if (!isReady) {
			_util2.default.on('calendar/changed', load);
			load();
			isReady = true;
		}
	}

	exports.default = {
		init: init
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		spendingByCategory: function spendingByCategory(params) {
			return _util2.default.get('spendingByCategory', params || {});
		},

		incomeVsExpenses: function incomeVsExpenses(params) {
			return _util2.default.get('incomeVsExpenses', params || {});
		},

		spendingByDay: function spendingByDay(params) {
			return _util2.default.get('spendingByDay', params || {});
		}

	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (type, containerId, title, data) {
		window.Highcharts.setOptions({ lang: { thousandsSep: ',' } });

		var chart = 'Chart';
		var options = _clone(_options);
		options.chart.renderTo = containerId;
		options.title.text = title;
		if (data) options.series = [data];

		if (type === 'pie') {
			options.chart.type = type;
			options.legend.layout = 'vertical';
			options.legend.align = 'left';
			options.tooltip.headerFormat = '<span style="font-size: 10px">Expenses</span><br/>';
			options.tooltip.pointFormatter = function () {
				return '<span style="color: ' + this.color + '">●</span> ' + this.name + ': €' + this.y;
			};
			options.plotOptions.pie = {
				borderWidth: 0,
				innerSize: '50%',
				showInLegend: true,
				allowPointSelect: false,
				dataLabels: { enabled: false }
			};
		} else if (type === 'line') {
			if (data) options.series = data;
			options.chart.type = type;
			options.tooltip.crosshairs = true;
			options.tooltip.shared = true;
			options.tooltip.formatter = function () {
				var html = this.x + '<br>',
				    sum = this.points[0].y - this.points[1].y;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var point = _step.value;

						html += '<span style="color: ' + point.series.color + '">●</span> ' + point.series.name + ' €' + _util2.default.formatNumber(point.y) + '<br>';
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				html += '<span style="color: green">●</span> savings: €' + _util2.default.formatNumber(sum) + '<br>';

				return html;
			};

			options.legend.align = 'right';
			options.yAxis = _clone(_yAxis);
			options.xAxis = _clone(_xAxis);
			options.xAxis.categories = _util2.default.months;

			var m = new Date().getMonth() - 0.5;
			options.xAxis.plotBands = [{ id: 'm', from: m, to: m + 1, color: 'rgba(80,80,80,0.3)' }];
		} else if (type === 'stock') {
			chart = 'StockChart';
			options.rangeSelector = { enabled: false };
			options.tooltip.xDateFormat = '%a, %e %b %Y';
			options.xAxis = _clone(_xAxis);
			options.yAxis = _clone(_yAxis);
		}
		return new window.Highcharts[chart](options);
	};

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Moment from 'moment';

	var _clone = function _clone(o) {
		return JSON.parse(JSON.stringify(o));
	},
	    _options = {
		chart: { renderTo: '', type: '', backgroundColor: null, spacing: [20, 10, 10, 10] },
		title: { align: 'left', style: { color: '#eee' }, text: '' },
		colors: _util2.default.colors,
		credits: { enabled: false },
		tooltip: {
			hideDelay: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			style: { color: '#F0F0F0' },
			valuePrefix: '€'
		},
		legend: {
			verticalAlign: 'top',
			align: 'left',
			x: 0,
			y: 30,
			itemStyle: { color: '#ccc' },
			itemHoverStyle: { color: '#fff' },
			itemHiddenStyle: { color: '#888' }
		},
		plotOptions: {}
	},
	    _xAxis = { labels: { style: { color: '#ccc' } } },
	    _yAxis = {
		title: { text: null },
		labels: {
			style: { color: '#ccc' },
			formatter: function formatter() {
				return '€' + this.value;
			}
		},
		showFirstLabel: false,
		min: 0,
		tickPixelInterval: 50,
		gridLineColor: '#444'
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _categories = __webpack_require__(23);

	var _categories2 = _interopRequireDefault(_categories);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var el,
	    treeContainer,
	    formContainer,
	    form,
	    btn = {},
	    catSel;
	var tpl = __webpack_require__(32);
	var isReady = false;

	function updateCatSelect(data) {
		var options = ['<option value="0">[root]</option>'];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var c = _step.value;
				options.push('<option value="' + c.id + '">' + c.name + '</option>');
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		catSel.html(options.join(''));
		return data;
	}

	function createTree(data) {
		var html = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		if (!data.length) data = [data];
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var item = _step2.value;

				html.push('<li>' + tpl(item));
				if (item.items) html.push(createTree(item.items));
				html.push('</li>');
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return '<ul class="category-tree">' + html.join('') + '</ul>';
	}

	function edit(cat) {
		formContainer.toggleClass('update', !_util2.default.isObjectEmpty(cat));
		form.set(cat, true);
	}

	function save() {
		_categories2.default.save(form.get(true)).then(function () {
			formContainer.removeClass('update');
			loadTree();
		});
	}

	function del() {
		var data = form.get(true);
		if (window.confirm('Are you sure you wish to remove "' + data.name + '"')) {
			_categories2.default.del(data).then(function () {
				formContainer.removeClass('update');
				loadTree();
			});
		}
	}

	function onClick(e) {
		var target = (0, _util2.default)(e.target);
		if (target.is('.cat')) edit(target.data());else if (target.is('.btn-reset')) edit({});else if (target.is('.btn-del')) del();else return;
		e.preventDefault();
	}

	function loadTree() {
		form.reset();
		_categories2.default.getTree().then(updateCatSelect).then(createTree).then(function (html) {
			treeContainer.html(html);
		}).catch(function (e) {
			console.error('ERROR:', e);
		});
	}

	function init() {
		if (!isReady) {
			el = (0, _util2.default)('#categories');
			treeContainer = el.find('.tree');
			formContainer = el.find('.form');
			form = _util2.default.form(formContainer[0]);
			btn.add = formContainer.find('.btn-add');
			btn.del = formContainer.find('.btn-del');
			btn.sav = formContainer.find('.btn-sav');
			catSel = formContainer.find('.category');

			el.on('click', onClick);
			formContainer.on('submit', function (e) {
				save();
				e.preventDefault();
			});
			loadTree();
			isReady = true;
		} else {
			edit({}); // reset form
		}
	}

	exports.default = {
		init: init
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(14);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"#\" class=\"cat\"");t.b("\n" + i);t.b("	data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");t.b("\n" + i);t.b("	data-name=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"");t.b("\n" + i);t.b("	data-parent_id=\"");t.b(t.v(t.f("parent_id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"#\" class=\"cat\"\n\tdata-id=\"{{id}}\"\n\tdata-name=\"{{name}}\"\n\tdata-parent_id=\"{{parent_id}}\">{{name}}</a>\n", H);return T.render.apply(T, arguments); };

/***/ }
/******/ ]);