/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "./public/assets/";
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
	
	var menu = _interopRequire(__webpack_require__(1));
	
	menu.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	var expenses = _interopRequire(__webpack_require__(3));
	
	var income = _interopRequire(__webpack_require__(4));
	
	var stats = _interopRequire(__webpack_require__(5));
	
	var categories = _interopRequire(__webpack_require__(6));
	
	var modules = { expenses: expenses, income: income, stats: stats, categories: categories };
	var el, items, contents, selected;
	
	function onChange() {
		var hash = location.hash.substr(1);
	
		if (hash) selected = items.filter("[href=\"#" + hash + "\"]");else selected = items.first();
		change(selected);
	}
	
	function change(item) {
		var id = item[0].hash.substr(1),
		    content = $("#" + id);
	
		items.removeClass("visible active");
		item.addClass("active");
	
		contents.removeClass("visible active");
		content.addClass("visible");
		setTimeout(function () {
			content.addClass("active");
		}, 100);
	
		if (modules[id]) modules[id].init();
	}
	
	function init() {
		el = $("#menu");
		items = el.find(".fa");
		contents = $("#content .section");
		window.addEventListener("hashchange", onChange);
		onChange();
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var sizzle = _interopRequire(__webpack_require__(7));
	
	var ajax = _interopRequire(__webpack_require__(8));
	
	var form = _interopRequire(__webpack_require__(9));
	
	var pubsub = _interopRequire(__webpack_require__(10));
	
	var util = _interopRequire(__webpack_require__(11));
	
	var all = { ajax: ajax, form: form };
	Object.assign(all, ajax, pubsub, util);
	for (var prop in all) {
	  sizzle[prop] = all[prop];
	}module.exports = sizzle;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	var Data = _interopRequire(__webpack_require__(13));
	
	var Categories = _interopRequire(__webpack_require__(12));
	
	var el,
	    form,
	    table,
	    subforms,
	    catList = [];
	var tableTpl = __webpack_require__(14);
	var formTpl = __webpack_require__(15);
	
	function loadCategories() {
		Categories.get().then(function (data) {
			catList = data;
			split(true);
			form.find(".btn-split").on("click", split);
		});
	}
	
	function load() {
		Data.get().then(function (entries) {
			table.html(tableTpl({ entries: entries }));
		});
	}
	
	function split(first) {
		var subform = $(formTpl({ first: first === true, categories: catList }));
		subform.appendTo(subforms).find("select")[0].focus();
	}
	
	function add() {
		console.log("add");
	}
	
	function init() {
		el = $("#expenses");
		table = el.find(".expenses-table");
		form = el.find(".expenses-form");
		subforms = form.find(".subforms");
	
		form.on("submit", function (e) {
			e.preventDefault();
		});
		form.find(".btn-add").on("click", add);
	
		load();
		loadCategories();
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	var el;
	
	function init() {
		el = $("#income");
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	var el;
	
	function init() {
		el = $("#stats");
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	var Data = _interopRequire(__webpack_require__(12));
	
	var el;
	
	function createTree(data) {
		var html = arguments[1] === undefined ? [] : arguments[1];
	
		if (!data.length) data = [data];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;
	
				html.push("<li>" + item.name);
				if (item.items) html.push(createTree(item.items));
				html.push("</li>");
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
	
		return "<ul class=\"category-tree\">" + html.join("") + "</ul>";
	}
	
	function init() {
		el = $("#categories");
		Data.getTree().then(createTree).then(function (html) {
			el[0].innerHTML = html;
		})["catch"](function (e) {
			console.error("ERROR:", e);
		});
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var util = _interopRequire(__webpack_require__(11));
	
	function sizzle(mixed, context) {
		if (!mixed) {
			return [];
		}var el;
		if (typeof mixed !== "string") el = mixed;else if (/<[a-z][\s\S]*>/i.test(mixed)) {
			el = new DOMParser().parseFromString(mixed, "text/html").body.firstChild;
		} else el = (context || document).querySelectorAll(mixed);
	
		if (el.nodeType) el = [el];else if (util.isNodeList(el)) el = Array.prototype.slice.call(el);
	
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
		if (typeof parent === "string") parent = sizzle(parent);
		parent[0].appendChild(this[0]);
		return this;
	};
	
	sizzle.fn.append = function (child) {
		if (!this || !this.length) return this;
		if (typeof child === "string") child = sizzle(child);
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
		var el = this && this.length ? this[0] : null,
		    has = false;
		cls = ("" + cls).replace(/\./g, "");
		while (!has && el) {
			has = el.matches(cls);
			if (has) return el;
			el = el.parentNode;
		}
		return null;
	};
	
	sizzle.fn.is = function (selector) {
		if (!this || !this.length) return false;
		return this[0].matches(selector);
	};
	
	sizzle.fn.isIn = function () {
		for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
			classes[_key] = arguments[_key];
		}
	
		var target = this && this.length ? this : null;
		if (target) {
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
		return false;
	};
	
	function modElCls(el, action, cls, cond) {
		if (!el || !el.length) {
			return el;
		}cls = cls.split(" ");
		if (typeof cond === "boolean") {
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
		return modElCls(this, "add", cls);
	};
	sizzle.fn.removeClass = function (cls) {
		return modElCls(this, "remove", cls);
	};
	sizzle.fn.toggleClass = function (cls, cond) {
		return modElCls(this, "toggle", cls, cond);
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
	
	module.exports = sizzle;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var base_url = "../api/";
	
	module.exports = function (options, data) {
		var req = new XMLHttpRequest(),
		    resp;
	
		if (typeof options === "string") options = { url: options };
		data = data || options.data || "";
		options.url = base_url + options.url;
	
		if (data) {
			options.method = options.method || "POST";
			options.type = "json";
		}
	
		options.type = options.type || "x-www-form-urlencoded";
		if (data && options.type === "json") data = JSON.stringify(data);
	
		return new Promise(function (resolve, reject) {
	
			req.open(options.method || "GET", options.url, true);
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
			req.setRequestHeader("Content-Type", "application/" + options.type + "; charset=UTF-8");
			req.send(data);
		});
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var keyBreaker = /[^\[\]]+/g;
	var numberMatcher = /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/;
	
	function _isNumber(value) {
		if (typeof value === "number") {
			return true;
		}if (typeof value !== "string") {
			return false;
		}return value.match(numberMatcher);
	}
	
	function _decodeEntities(str) {
		var d = document.createElement("div");
		d.innerHTML = str;
		return d.innerText || d.textContent;
	}
	
	function _getInputs(form) {
		var inputs = form.querySelectorAll("[name]");
		return Array.prototype.slice.call(inputs) || [];
	}
	
	function Form(el) {
		if (!el) {
			return null;
		}this.form = el;
	}
	
	Form.prototype.set = function (params, clear) {
		_getInputs(this.form).forEach(function (input) {
			var name = input.name,
			    value = params[name] || "",
			    names,
			    i,
			    n,
			    v;
	
			if (name.indexOf("[") > -1) {
				names = name.replace(/\]/g, "").split("[");
				n = null;
				v = params;
				for (i = 0; n = names[i++];) {
					if (v[n]) v = v[n];else {
						v = undefined;break;
					}
				}
				value = v;
			}
	
			if (clear !== true && value === undefined) return;
	
			if (value === null || value === undefined) value = "";
	
			if (typeof value === "string" && value.indexOf("&") > -1) value = _decodeEntities(value);
	
			if (input.type === "radio") input.checked = input.value.toString() === value.toString();else if (input.type === "checkbox") input.checked = value;else input.value = value;
		});
		return this;
	};
	
	Form.prototype.get = function () {
		var convert = arguments[0] === undefined ? false : arguments[0];
	
		var data = {},
		    current,
		    i;
	
		_getInputs(this.form).forEach(function (el) {
			var type = el.type && el.type.toLowerCase(),
			    key,
			    value,
			    parts,
			    lastPart,
			    tv,
			    cmp,
			    last;
	
			if (type === "submit" || !el.name || el.disabled) return;
	
			key = el.name;
			value = el.value;
			parts = key.match(keyBreaker);
	
			if (type === "radio" && !el.checked) return;
	
			if (type === "checkbox") value = el.checked;
	
			if (convert) {
				if (_isNumber(value)) {
					tv = parseFloat(value);
					cmp = tv + "";
	
					if (value.indexOf(".") > 0) cmp = tv.toFixed(value.split(".")[1].length);
					if (cmp === value) value = tv;
				} else if (value === "true") value = true;else if (value === "false") value = false;
				if (value === "") value = null;
			}
	
			current = data;
	
			for (i = 0; i < parts.length - 1; i++) {
				if (!current[parts[i]]) current[parts[i]] = {};
				current = current[parts[i]];
			}
			lastPart = parts[parts.length - 1];
	
			last = current[lastPart];
			if (last) {
				if (!Array.isArray(last)) current[lastPart] = last === undefined ? [] : [last];
				last.push(value);
			} else if (!last) current[lastPart] = value;
		});
		return data;
	};
	
	Form.prototype.reset = function () {
		this.set({});
	};
	
	Form.prototype.clear = function () {
		this.set({}, true);
	};
	
	module.exports = Form;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _cache = {};
	
	function trigger(topic) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}
	
		if (!_cache[topic]) {
			return;
		}_cache[topic].forEach(function (cb) {
			return cb.apply(cb, args);
		});
	}
	
	function on(topic, callback) {
		if (!_cache[topic]) _cache[topic] = [];
		_cache[topic].push(callback);
		return [topic, callback];
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
	
	module.exports = { on: on, off: off, trigger: trigger };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function type(obj) {
		return obj ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : "undefined";
	}
	
	function isNumber(v) {
		if (typeof v === "number") {
			return true;
		}if (typeof v !== "string") {
			return false;
		}return /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/.test(v);
	}
	
	function varToRealType(v) {
		if (isNumber(v)) {
			var originalv = v;
			v = parseFloat("" + v);
			if ("" + v !== originalv) v = originalv;
		} else if (v === "true") v = true;else if (v === "false") v = false;
		if (v === "") v = undefined;
		if (type(v) === "array") v = v.map(function (val) {
			return varToRealType(val);
		});
		return v;
	}
	
	function isObjectEmpty(x) {
		if (!x || typeof x !== "object") {
			return true;
		}return Object.keys(x).length;
	}
	
	function rand(max) {
		var min = arguments[1] === undefined ? 0 : arguments[1];
	
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	function each(arr, cb) {
		if (type(arr) === "object") for (var key in arr) cb.call(cb, arr[key], key);else for (var i = 0, item; item = arr[i]; i++) cb.call(cb, item, i);
	}
	
	function sanitize(v) {
		var div = document.createElement("DIV");
		div.innerHTML = v || "";
		return div.textContent || div.innerText || "";
	}
	
	function merge(target) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}
	
		if (!target) throw new TypeError("Cannot convert first argument to object");
		var to = Object(target);
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
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
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
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return to;
	}
	
	if (!Object.assign) Object.defineProperty(Object, "assign", { value: merge,
		enumerable: false, configurable: true, writable: true
	});
	
	function isNodeList(nodes) {
		return typeof nodes === "object" && /^(htmlcollection|nodelist|object)$/.test(type(nodes)) && (nodes.length === 0 || typeof nodes[0] === "object" && nodes[0].nodeType > 0);
	}
	
	module.exports = {
		type: type,
		rand: rand,
		each: each,
		isNumber: isNumber,
		varToRealType: varToRealType,
		isObjectEmpty: isObjectEmpty,
		merge: merge,
		sanitize: sanitize,
		isNodeList: isNodeList
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	function _get() {
		return $.ajax("categories");
	}
	
	function getTree() {
		return $.ajax("categorytree");
	}
	
	module.exports = {
		get: _get, getTree: getTree
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(2));
	
	function _get() {
		return $.ajax("entries");
	}
	
	module.exports = {
		get: _get
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(16);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<table>\r");t.b("\n" + i);t.b("<thead><tr>\r");t.b("\n" + i);t.b("	<td>Date</td>\r");t.b("\n" + i);t.b("	<td>Category</td>\r");t.b("\n" + i);t.b("	<td>Description</td>\r");t.b("\n" + i);t.b("	<td class=\"amount\">Amount</td>\r");t.b("\n" + i);t.b("</tr></thead>\r");t.b("\n" + i);t.b("<tbody>\r");t.b("\n" + i);if(t.s(t.f("entries",c,p,1),c,p,0,150,283,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<tr>\r");t.b("\n" + i);t.b("	<td>");t.b(t.v(t.f("date",c,p,0)));t.b("</td>\r");t.b("\n" + i);t.b("	<td>");t.b(t.v(t.f("category",c,p,0)));t.b("</td>\r");t.b("\n" + i);t.b("	<td>");t.b(t.v(t.f("description",c,p,0)));t.b("</td>\r");t.b("\n" + i);t.b("	<td class=\"amount\">&euro;");t.b(t.v(t.f("amount_str",c,p,0)));t.b("</td>\r");t.b("\n" + i);t.b("</tr>\r");t.b("\n" + i);});c.pop();}t.b("</tbody>\r");t.b("\n" + i);t.b("</table>");return t.fl(); },partials: {}, subs: {  }}, "<table>\r\n<thead><tr>\r\n\t<td>Date</td>\r\n\t<td>Category</td>\r\n\t<td>Description</td>\r\n\t<td class=\"amount\">Amount</td>\r\n</tr></thead>\r\n<tbody>\r\n{{#entries}}\r\n<tr>\r\n\t<td>{{date}}</td>\r\n\t<td>{{category}}</td>\r\n\t<td>{{description}}</td>\r\n\t<td class=\"amount\">&euro;{{amount_str}}</td>\r\n</tr>\r\n{{/entries}}\r\n</tbody>\r\n</table>", H); return T.render.apply(T, arguments); };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(16);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-row\">\r");t.b("\n" + i);t.b("	<select name=\"category\" class=\"category\">\r");t.b("\n" + i);t.b("		<option id=\"0\">Category</option>\r");t.b("\n" + i);if(t.s(t.f("categories",c,p,1),c,p,0,121,162,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("			<option id=\"0\">");t.b(t.v(t.f("name",c,p,0)));t.b("</option>\r");t.b("\n" + i);});c.pop();}t.b("	</select>\r");t.b("\n" + i);t.b("	<input name=\"amount\" class=\"amount\">\r");t.b("\n" + i);t.b("	");if(t.s(t.f("first",c,p,1),c,p,0,241,295,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<button type=\"button\" class=\"btn-split\">Split</button>");});c.pop();}t.b("\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"form-row\">\r\n\t<select name=\"category\" class=\"category\">\r\n\t\t<option id=\"0\">Category</option>\r\n\t\t{{#categories}}\r\n\t\t\t<option id=\"0\">{{name}}</option>\r\n\t\t{{/categories}}\r\n\t</select>\r\n\t<input name=\"amount\" class=\"amount\">\r\n\t{{#first}}<button type=\"button\" class=\"btn-split\">Split</button>{{/first}}\r\n</div>\r\n", H); return T.render.apply(T, arguments); };

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
	
	// This file is for use with Node.js. See dist/ for browser files.
	
	var Hogan = __webpack_require__(17);
	Hogan.Template = __webpack_require__(18).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 17 */
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
/* 18 */
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
//# sourceMappingURL=app.map.js