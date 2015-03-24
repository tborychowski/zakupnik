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
/******/ 	__webpack_require__.p = "./assets/";
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
	
	var calendar = _interopRequire(__webpack_require__(1));
	
	calendar.init();
	
	var menu = _interopRequire(__webpack_require__(2));
	
	menu.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Pikaday = _interopRequire(__webpack_require__(9));
	
	var Moment = _interopRequire(__webpack_require__(8));
	
	var tpl = __webpack_require__(10);
	var el,
	    picker,
	    isReady = false,
	    gotoMap = {
		prev: function prev(c) {
			return c.subtract(1, "days");
		},
		next: function next(c) {
			return c.add(1, "days");
		},
		today: function today() {
			return Moment();
		}
	};
	
	function goTo(where) {
		picker.setMoment(gotoMap[where](picker.getMoment()));
	}
	
	function onSelect() {
		$.trigger("calendar/changed", picker.getMoment());
	}
	
	function _set(date) {
		picker.setMoment(Moment(date));
	}
	function _get(format) {
		if (!isReady) init();
		if (!format) {
			return picker.getMoment();
		}if (format === true) format = "YYYY-MM-DD";
		return picker.getMoment().format(format);
	}
	
	function onClick(e) {
		var target = $(e.target);
		if (target.is(".btn")) {
			goTo(target.data("go"));
			e.preventDefault();
		}
	}
	
	function init() {
		if (isReady) {
			return;
		}el = $("#calendar").html(tpl()).on("click", onClick);
	
		var today = new Date();
		picker = new Pikaday({
			firstDay: 1,
			defaultDate: today,
			setDefaultDate: true,
			format: "ddd, D MMM YYYY",
			field: el.find(".date")[0],
			yearRange: [2014, today.getFullYear()],
			onSelect: onSelect
		});
		onSelect();
		isReady = true;
	}
	
	module.exports = {
		init: init,
		set: _set,
		get: _get
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var expenses = _interopRequire(__webpack_require__(4));
	
	var income = _interopRequire(__webpack_require__(5));
	
	var stats = _interopRequire(__webpack_require__(6));
	
	var categories = _interopRequire(__webpack_require__(7));
	
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var sizzle = _interopRequire(__webpack_require__(11));
	
	var ajax = _interopRequire(__webpack_require__(12));
	
	var form = _interopRequire(__webpack_require__(13));
	
	var pubsub = _interopRequire(__webpack_require__(14));
	
	var keys = _interopRequire(__webpack_require__(15));
	
	var colors = _interopRequire(__webpack_require__(16));
	
	var util = _interopRequire(__webpack_require__(17));
	
	var all = { ajax: ajax, form: form };
	Object.assign(all, ajax, pubsub, keys, colors, util);
	for (var prop in all) {
	  sizzle[prop] = all[prop];
	}module.exports = sizzle;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Data = _interopRequire(__webpack_require__(22));
	
	var Calendar = _interopRequire(__webpack_require__(1));
	
	var Grid = _interopRequire(__webpack_require__(26));
	
	var Form = _interopRequire(__webpack_require__(18));
	
	var el,
	    grid,
	    previewGrid,
	    preview,
	    form,
	    isReady = false,
	    lastLoadDate;
	
	function load(force) {
		var date = Calendar.get("YYYY-MM");
	
		if (!lastLoadDate || lastLoadDate !== date || force === true) {
			lastLoadDate = date;
			grid.load({ date: date });
		}
	
		form.setDate(Calendar.get(true));
		onPreview();
	}
	
	function onResp(resp) {
		if (resp.result === "success") load(true);
	}
	
	function del(item, row) {
		grid.selectRow(row, true);
		if (window.confirm("Are you sure you wish to delete this row?")) {
			Data.del(item.id).then(onResp);
		}
	}
	
	function edit(item, row) {
		grid.selectRow(row, true);
		Data.get(item.id).then(function (data) {
			Calendar.set(data.date);
			form.set({ items: { 0: data } });
		});
	}
	
	function onReset(e) {
		e.preventDefault();
		Calendar.set(new Date());
		form.reset();
		onPreview();
	}
	
	function onPreview() {
		var data = form.getData(),
		    sum = 0,
		    total_str;
		preview.toggleClass("hidden", !(data.items && data.items.length));
	
		if (!data.items) {
			return;
		}var _iteratorNormalCompletion = true;
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
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		total_str = sum.toLocaleString("en-GB", { minimumFractionDigits: 2 });
		if (data.items) previewGrid.setData({ total_str: total_str, items: data.items });
	}
	
	function renderer(v, item) {
		if (v <= 0) {
			return "<span class=\"warn\"><i class=\"fa fa-exclamation-circle\"></i> €" + item.amount_str + "</span>";
		}
		return "€" + item.amount_str;
	}
	
	function footer(data) {
		return "€" + data.total_str;
	}
	
	function init() {
		if (!isReady) {
			el = $("#expenses");
			preview = el.find(".preview");
	
			form = new Form({
				target: el.find(".expenses-form"),
				onAdd: onResp,
				onChange: onPreview
			});
	
			grid = new Grid({
				target: el.find(".expenses-table")[0],
				sort: { by: "date", order: "desc" },
				dataSource: function (params) {
					return Data.get(params);
				},
				columns: [{ width: 52, icons: { pencil: edit, "trash-o": del } }, { name: "Date", field: "date", width: 90 }, { name: "Category", field: "category", width: "40%" }, { name: "Description", field: "description" }, { name: "Amount", field: "amount", width: 100, renderer: renderer, footer: footer }]
			});
	
			previewGrid = new Grid({
				target: el.find(".preview-table")[0],
				sort: { by: "date", order: "desc" },
				dataSource: function (params) {
					return Data.get(params);
				},
				columns: [{ name: "Date", field: "date", width: 90 }, { name: "Category", field: "category", width: "40%" }, { name: "Description", field: "description" }, { name: "Amount", field: "amount", width: 100, renderer: renderer, footer: footer }]
			});
	
			el.find(".btn-reset").on("click", onReset);
			$.on("calendar/changed", load);
		}
	
		load();
		isReady = true;
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Data = _interopRequire(__webpack_require__(25));
	
	var Calendar = _interopRequire(__webpack_require__(1));
	
	var Grid = _interopRequire(__webpack_require__(26));
	
	var Form = _interopRequire(__webpack_require__(21));
	
	var el,
	    grid,
	    previewGrid,
	    preview,
	    form,
	    isReady = false,
	    lastLoadDate;
	
	function load(force) {
		var date = Calendar.get("YYYY-MM");
	
		if (!lastLoadDate || lastLoadDate !== date || force === true) {
			lastLoadDate = date;
			grid.load({ date: date });
		}
	
		form.setDate(Calendar.get(true));
		onPreview();
	}
	
	function onResp(resp) {
		if (resp.result === "success") load(true);
	}
	
	function del(item, row) {
		grid.selectRow(row, true);
		if (window.confirm("Are you sure you wish to delete this row?")) {
			Data.del(item.id).then(onResp);
		}
	}
	
	function edit(item, row) {
		grid.selectRow(row, true);
		Data.get(item.id).then(function (data) {
			Calendar.set(data.date);
			form.set(data);
		});
	}
	
	function onReset(e) {
		e.preventDefault();
		Calendar.set(new Date());
		form.reset();
		onPreview();
	}
	
	function onPreview() {
		var data = form.getData(),
		    sum = 0,
		    total_str;
		preview.toggleClass("hidden", !(data.items && data.items.length));
	
		if (!data.items) {
			return;
		}var _iteratorNormalCompletion = true;
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
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		total_str = sum.toLocaleString("en-GB", { minimumFractionDigits: 2 });
		if (data.items) previewGrid.setData({ total_str: total_str, items: data.items });
	}
	
	function renderer(v, item) {
		if (v <= 0) {
			return "<span class=\"warn\"><i class=\"fa fa-exclamation-circle\"></i> €" + item.amount_str + "</span>";
		}
		return "€" + item.amount_str;
	}
	
	function footer(data) {
		return "€" + data.total_str;
	}
	
	function init() {
		if (!isReady) {
			el = $("#income");
			preview = el.find(".preview");
	
			form = new Form({
				target: el.find(".income-form"),
				onAdd: onResp,
				onChange: onPreview
			});
			grid = new Grid({
				target: el.find(".income-table")[0],
				sort: { by: "date", order: "desc" },
				dataSource: function (params) {
					return Data.get(params);
				},
				columns: [{ width: 52, icons: { pencil: edit, "trash-o": del } }, { name: "Date", field: "date", width: 90 }, { name: "Description", field: "description" }, { name: "Amount", field: "amount", width: 100, renderer: renderer, footer: footer }]
			});
	
			previewGrid = new Grid({
				target: el.find(".preview-table")[0],
				sort: { by: "date", order: "desc" },
				dataSource: function (params) {
					return Data.get(params);
				},
				columns: [{ name: "Date", field: "date", width: 90 }, { name: "Description", field: "description" }, { name: "Amount", field: "amount", width: 100, renderer: renderer, footer: footer }]
			});
	
			el.find(".btn-reset").on("click", onReset);
			$.on("calendar/changed", load);
		}
	
		load();
		isReady = true;
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Calendar = _interopRequire(__webpack_require__(1));
	
	var Data = _interopRequire(__webpack_require__(24));
	
	var Chart = _interopRequire(__webpack_require__(20));
	
	var lastLoadDate, _chart0, _chart1, _chart2;
	
	function chart0(data) {
		if (!_chart0) _chart0 = Chart("pie", "chart0", "Spending by category (this month)", data);else _chart0.setSeries(data);
	}
	
	function chart1(data) {
		if (!_chart1) _chart1 = Chart("line", "chart1", "Income vs Expenses (this year)", data);else _chart1.setSeries(data);
	}
	
	function chart2(data) {
		if (!_chart2) _chart2 = Chart("stock", "chart2", "Spending by time (day-by-day, current month), for [categories dropdown]", data);else _chart2.setSeries(data);
	}
	
	function load(force) {
		var date = Calendar.get("YYYY-MM");
	
		if (!lastLoadDate || lastLoadDate !== date || force === true) {
			lastLoadDate = date;
			Data.spendingByCategory({ date: date }).then(chart0);
			Data.incomeVsExpenses({ year: Calendar.get("YYYY") }).then(chart1);
			Data.spendingByDay({ date: date }).then(chart2);
		}
	}
	
	function init() {
		$.on("calendar/changed", load);
		load();
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Data = _interopRequire(__webpack_require__(23));
	
	var el,
	    treeContainer,
	    formContainer,
	    form,
	    btn = {},
	    catSel;
	var tpl = __webpack_require__(19);
	
	function updateCatSelect(data) {
		var options = ["<option value=\"0\"></option>"];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var c = _step.value;
				options.push("<option value=\"" + c.id + "\">" + c.name + "</option>");
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
	
		catSel.html(options.join(""));
		return data;
	}
	
	function createTree(data) {
		var html = arguments[1] === undefined ? [] : arguments[1];
	
		if (!data.length) data = [data];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;
	
				html.push("<li>" + tpl(item));
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
	
	function edit(cat) {
		formContainer.toggleClass("update", !$.isObjectEmpty(cat));
		form.set(cat, true);
	}
	
	function save() {
		Data.save(form.get(true)).then(function () {
			formContainer.removeClass("update");
			loadTree();
		});
	}
	
	function del() {
		var data = form.get(true);
		if (window.confirm("Are you sure you wish to remove \"" + data.name + "\"")) {
			Data.del(data).then(function () {
				formContainer.removeClass("update");
				loadTree();
			});
		}
	}
	
	function onClick(e) {
		var target = $(e.target);
		if (target.is(".cat")) edit(target.data());else if (target.is(".btn-reset")) edit({});else if (target.is(".btn-del")) del();else {
			return;
		}e.preventDefault();
	}
	
	function loadTree() {
		form.reset();
		Data.getTree().then(updateCatSelect).then(createTree).then(function (html) {
			treeContainer.html(html);
		})["catch"](function (e) {
			console.error("ERROR:", e);
		});
	}
	
	function init() {
		el = $("#categories");
		treeContainer = el.find(".tree");
		formContainer = el.find(".form form");
		form = $.form(formContainer[0]);
		btn.add = formContainer.find(".btn-add");
		btn.del = formContainer.find(".btn-del");
		btn.sav = formContainer.find(".btn-sav");
		catSel = formContainer.find(".category");
	
		el.on("click", onClick);
		formContainer.on("submit", function (e) {
			save();e.preventDefault();
		});
	
		loadTree();
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {//! moment.js
	//! version : 2.9.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	(function (undefined) {
	    /************************************
	        Constants
	    ************************************/
	
	    var moment,
	        VERSION = '2.9.0',
	        // the global-scope this is NOT the global object in Node.js
	        globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this,
	        oldGlobalMoment,
	        round = Math.round,
	        hasOwnProperty = Object.prototype.hasOwnProperty,
	        i,
	
	        YEAR = 0,
	        MONTH = 1,
	        DATE = 2,
	        HOUR = 3,
	        MINUTE = 4,
	        SECOND = 5,
	        MILLISECOND = 6,
	
	        // internal storage for locale config files
	        locales = {},
	
	        // extra moment internal properties (plugins register props here)
	        momentProperties = [],
	
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module && module.exports),
	
	        // ASP.NET json date format regex
	        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
	        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
	
	        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
	
	        // format tokens
	        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
	        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
	
	        // parsing token regexes
	        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
	        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
	        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
	        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
	        parseTokenDigits = /\d+/, // nonzero number of digits
	        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
	        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
	        parseTokenT = /T/i, // T (ISO separator)
	        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123
	        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
	
	        //strict parsing regexes
	        parseTokenOneDigit = /\d/, // 0 - 9
	        parseTokenTwoDigits = /\d\d/, // 00 - 99
	        parseTokenThreeDigits = /\d{3}/, // 000 - 999
	        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
	        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
	        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf
	
	        // iso 8601 regex
	        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
	
	        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',
	
	        isoDates = [
	            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
	            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
	            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
	            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
	            ['YYYY-DDD', /\d{4}-\d{3}/]
	        ],
	
	        // iso time formats and regexes
	        isoTimes = [
	            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
	            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
	            ['HH:mm', /(T| )\d\d:\d\d/],
	            ['HH', /(T| )\d\d/]
	        ],
	
	        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-', '15', '30']
	        parseTimezoneChunker = /([\+\-]|\d\d)/gi,
	
	        // getter and setter names
	        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
	        unitMillisecondFactors = {
	            'Milliseconds' : 1,
	            'Seconds' : 1e3,
	            'Minutes' : 6e4,
	            'Hours' : 36e5,
	            'Days' : 864e5,
	            'Months' : 2592e6,
	            'Years' : 31536e6
	        },
	
	        unitAliases = {
	            ms : 'millisecond',
	            s : 'second',
	            m : 'minute',
	            h : 'hour',
	            d : 'day',
	            D : 'date',
	            w : 'week',
	            W : 'isoWeek',
	            M : 'month',
	            Q : 'quarter',
	            y : 'year',
	            DDD : 'dayOfYear',
	            e : 'weekday',
	            E : 'isoWeekday',
	            gg: 'weekYear',
	            GG: 'isoWeekYear'
	        },
	
	        camelFunctions = {
	            dayofyear : 'dayOfYear',
	            isoweekday : 'isoWeekday',
	            isoweek : 'isoWeek',
	            weekyear : 'weekYear',
	            isoweekyear : 'isoWeekYear'
	        },
	
	        // format function strings
	        formatFunctions = {},
	
	        // default relative time thresholds
	        relativeTimeThresholds = {
	            s: 45,  // seconds to minute
	            m: 45,  // minutes to hour
	            h: 22,  // hours to day
	            d: 26,  // days to month
	            M: 11   // months to year
	        },
	
	        // tokens to ordinalize and pad
	        ordinalizeTokens = 'DDD w W M D d'.split(' '),
	        paddedTokens = 'M D H h m s w W'.split(' '),
	
	        formatTokenFunctions = {
	            M    : function () {
	                return this.month() + 1;
	            },
	            MMM  : function (format) {
	                return this.localeData().monthsShort(this, format);
	            },
	            MMMM : function (format) {
	                return this.localeData().months(this, format);
	            },
	            D    : function () {
	                return this.date();
	            },
	            DDD  : function () {
	                return this.dayOfYear();
	            },
	            d    : function () {
	                return this.day();
	            },
	            dd   : function (format) {
	                return this.localeData().weekdaysMin(this, format);
	            },
	            ddd  : function (format) {
	                return this.localeData().weekdaysShort(this, format);
	            },
	            dddd : function (format) {
	                return this.localeData().weekdays(this, format);
	            },
	            w    : function () {
	                return this.week();
	            },
	            W    : function () {
	                return this.isoWeek();
	            },
	            YY   : function () {
	                return leftZeroFill(this.year() % 100, 2);
	            },
	            YYYY : function () {
	                return leftZeroFill(this.year(), 4);
	            },
	            YYYYY : function () {
	                return leftZeroFill(this.year(), 5);
	            },
	            YYYYYY : function () {
	                var y = this.year(), sign = y >= 0 ? '+' : '-';
	                return sign + leftZeroFill(Math.abs(y), 6);
	            },
	            gg   : function () {
	                return leftZeroFill(this.weekYear() % 100, 2);
	            },
	            gggg : function () {
	                return leftZeroFill(this.weekYear(), 4);
	            },
	            ggggg : function () {
	                return leftZeroFill(this.weekYear(), 5);
	            },
	            GG   : function () {
	                return leftZeroFill(this.isoWeekYear() % 100, 2);
	            },
	            GGGG : function () {
	                return leftZeroFill(this.isoWeekYear(), 4);
	            },
	            GGGGG : function () {
	                return leftZeroFill(this.isoWeekYear(), 5);
	            },
	            e : function () {
	                return this.weekday();
	            },
	            E : function () {
	                return this.isoWeekday();
	            },
	            a    : function () {
	                return this.localeData().meridiem(this.hours(), this.minutes(), true);
	            },
	            A    : function () {
	                return this.localeData().meridiem(this.hours(), this.minutes(), false);
	            },
	            H    : function () {
	                return this.hours();
	            },
	            h    : function () {
	                return this.hours() % 12 || 12;
	            },
	            m    : function () {
	                return this.minutes();
	            },
	            s    : function () {
	                return this.seconds();
	            },
	            S    : function () {
	                return toInt(this.milliseconds() / 100);
	            },
	            SS   : function () {
	                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
	            },
	            SSS  : function () {
	                return leftZeroFill(this.milliseconds(), 3);
	            },
	            SSSS : function () {
	                return leftZeroFill(this.milliseconds(), 3);
	            },
	            Z    : function () {
	                var a = this.utcOffset(),
	                    b = '+';
	                if (a < 0) {
	                    a = -a;
	                    b = '-';
	                }
	                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
	            },
	            ZZ   : function () {
	                var a = this.utcOffset(),
	                    b = '+';
	                if (a < 0) {
	                    a = -a;
	                    b = '-';
	                }
	                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
	            },
	            z : function () {
	                return this.zoneAbbr();
	            },
	            zz : function () {
	                return this.zoneName();
	            },
	            x    : function () {
	                return this.valueOf();
	            },
	            X    : function () {
	                return this.unix();
	            },
	            Q : function () {
	                return this.quarter();
	            }
	        },
	
	        deprecations = {},
	
	        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'],
	
	        updateInProgress = false;
	
	    // Pick the first defined of two or three arguments. dfl comes from
	    // default.
	    function dfl(a, b, c) {
	        switch (arguments.length) {
	            case 2: return a != null ? a : b;
	            case 3: return a != null ? a : b != null ? b : c;
	            default: throw new Error('Implement me');
	        }
	    }
	
	    function hasOwnProp(a, b) {
	        return hasOwnProperty.call(a, b);
	    }
	
	    function defaultParsingFlags() {
	        // We need to deep clone this object, and es5 standard is not very
	        // helpful.
	        return {
	            empty : false,
	            unusedTokens : [],
	            unusedInput : [],
	            overflow : -2,
	            charsLeftOver : 0,
	            nullInput : false,
	            invalidMonth : null,
	            invalidFormat : false,
	            userInvalidated : false,
	            iso: false
	        };
	    }
	
	    function printMsg(msg) {
	        if (moment.suppressDeprecationWarnings === false &&
	                typeof console !== 'undefined' && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }
	
	    function deprecate(msg, fn) {
	        var firstTime = true;
	        return extend(function () {
	            if (firstTime) {
	                printMsg(msg);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }
	
	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            printMsg(msg);
	            deprecations[name] = true;
	        }
	    }
	
	    function padToken(func, count) {
	        return function (a) {
	            return leftZeroFill(func.call(this, a), count);
	        };
	    }
	    function ordinalizeToken(func, period) {
	        return function (a) {
	            return this.localeData().ordinal(func.call(this, a), period);
	        };
	    }
	
	    function monthDiff(a, b) {
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
	
	        return -(wholeMonthDiff + adjust);
	    }
	
	    while (ordinalizeTokens.length) {
	        i = ordinalizeTokens.pop();
	        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
	    }
	    while (paddedTokens.length) {
	        i = paddedTokens.pop();
	        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
	    }
	    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);
	
	
	    function meridiemFixWrap(locale, hour, meridiem) {
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
	            // thie is not supposed to happen
	            return hour;
	        }
	    }
	
	    /************************************
	        Constructors
	    ************************************/
	
	    function Locale() {
	    }
	
	    // Moment prototype object
	    function Moment(config, skipOverflow) {
	        if (skipOverflow !== false) {
	            checkOverflow(config);
	        }
	        copyConfig(this, config);
	        this._d = new Date(+config._d);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            moment.updateOffset(this);
	            updateInProgress = false;
	        }
	    }
	
	    // Duration Constructor
	    function Duration(duration) {
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
	            hours * 36e5; // 1000 * 60 * 60
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
	
	        this._locale = moment.localeData();
	
	        this._bubble();
	    }
	
	    /************************************
	        Helpers
	    ************************************/
	
	
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
	
	    function copyConfig(to, from) {
	        var i, prop, val;
	
	        if (typeof from._isAMomentObject !== 'undefined') {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (typeof from._i !== 'undefined') {
	            to._i = from._i;
	        }
	        if (typeof from._f !== 'undefined') {
	            to._f = from._f;
	        }
	        if (typeof from._l !== 'undefined') {
	            to._l = from._l;
	        }
	        if (typeof from._strict !== 'undefined') {
	            to._strict = from._strict;
	        }
	        if (typeof from._tzm !== 'undefined') {
	            to._tzm = from._tzm;
	        }
	        if (typeof from._isUTC !== 'undefined') {
	            to._isUTC = from._isUTC;
	        }
	        if (typeof from._offset !== 'undefined') {
	            to._offset = from._offset;
	        }
	        if (typeof from._pf !== 'undefined') {
	            to._pf = from._pf;
	        }
	        if (typeof from._locale !== 'undefined') {
	            to._locale = from._locale;
	        }
	
	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (typeof val !== 'undefined') {
	                    to[prop] = val;
	                }
	            }
	        }
	
	        return to;
	    }
	
	    function absRound(number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }
	
	    // left zero fill a number
	    // see http://jsperf.com/left-zero-filling for performance comparison
	    function leftZeroFill(number, targetLength, forceSign) {
	        var output = '' + Math.abs(number),
	            sign = number >= 0;
	
	        while (output.length < targetLength) {
	            output = '0' + output;
	        }
	        return (sign ? (forceSign ? '+' : '') : '-') + output;
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
	        other = makeAs(other, base);
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
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }
	
	            val = typeof val === 'string' ? +val : val;
	            dur = moment.duration(val, period);
	            addOrSubtractDurationFromMoment(this, dur, direction);
	            return this;
	        };
	    }
	
	    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = duration._days,
	            months = duration._months;
	        updateOffset = updateOffset == null ? true : updateOffset;
	
	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            moment.updateOffset(mom, days || months);
	        }
	    }
	
	    // check if is an array
	    function isArray(input) {
	        return Object.prototype.toString.call(input) === '[object Array]';
	    }
	
	    function isDate(input) {
	        return Object.prototype.toString.call(input) === '[object Date]' ||
	            input instanceof Date;
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
	
	    function normalizeUnits(units) {
	        if (units) {
	            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
	            units = unitAliases[units] || camelFunctions[lowered] || lowered;
	        }
	        return units;
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
	
	    function makeList(field) {
	        var count, setter;
	
	        if (field.indexOf('week') === 0) {
	            count = 7;
	            setter = 'day';
	        }
	        else if (field.indexOf('month') === 0) {
	            count = 12;
	            setter = 'month';
	        }
	        else {
	            return;
	        }
	
	        moment[field] = function (format, index) {
	            var i, getter,
	                method = moment._locale[field],
	                results = [];
	
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }
	
	            getter = function (i) {
	                var m = moment().utc().set(setter, i);
	                return method.call(moment._locale, m, format || '');
	            };
	
	            if (index != null) {
	                return getter(index);
	            }
	            else {
	                for (i = 0; i < count; i++) {
	                    results.push(getter(i));
	                }
	                return results;
	            }
	        };
	    }
	
	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;
	
	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            if (coercedNumber >= 0) {
	                value = Math.floor(coercedNumber);
	            } else {
	                value = Math.ceil(coercedNumber);
	            }
	        }
	
	        return value;
	    }
	
	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }
	
	    function weeksInYear(year, dow, doy) {
	        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
	    }
	
	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }
	
	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }
	
	    function checkOverflow(m) {
	        var overflow;
	        if (m._a && m._pf.overflow === -2) {
	            overflow =
	                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
	                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
	                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
	                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
	                                           m._a[SECOND] !== 0 ||
	                                           m._a[MILLISECOND] !== 0)) ? HOUR :
	                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
	                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
	                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;
	
	            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	
	            m._pf.overflow = overflow;
	        }
	    }
	
	    function isValid(m) {
	        if (m._isValid == null) {
	            m._isValid = !isNaN(m._d.getTime()) &&
	                m._pf.overflow < 0 &&
	                !m._pf.empty &&
	                !m._pf.invalidMonth &&
	                !m._pf.nullInput &&
	                !m._pf.invalidFormat &&
	                !m._pf.userInvalidated;
	
	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    m._pf.charsLeftOver === 0 &&
	                    m._pf.unusedTokens.length === 0 &&
	                    m._pf.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }
	
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
	        if (!locales[name] && hasModule) {
	            try {
	                oldLocale = moment.locale();
	                !(function webpackMissingModule() { var e = new Error("Cannot find module \"./locale\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
	                moment.locale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }
	
	    // Return a moment from input, that is local/utc/utcOffset equivalent to
	    // model.
	    function makeAs(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (moment.isMoment(input) || isDate(input) ?
	                    +input : +moment(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            moment.updateOffset(res, false);
	            return res;
	        } else {
	            return moment(input).local();
	        }
	    }
	
	    /************************************
	        Locale
	    ************************************/
	
	
	    extend(Locale.prototype, {
	
	        set : function (config) {
	            var prop, i;
	            for (i in config) {
	                prop = config[i];
	                if (typeof prop === 'function') {
	                    this[i] = prop;
	                } else {
	                    this['_' + i] = prop;
	                }
	            }
	            // Lenient ordinal parsing accepts just a number in addition to
	            // number + (possibly) stuff coming from _ordinalParseLenient.
	            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
	        },
	
	        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        months : function (m) {
	            return this._months[m.month()];
	        },
	
	        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        monthsShort : function (m) {
	            return this._monthsShort[m.month()];
	        },
	
	        monthsParse : function (monthName, format, strict) {
	            var i, mom, regex;
	
	            if (!this._monthsParse) {
	                this._monthsParse = [];
	                this._longMonthsParse = [];
	                this._shortMonthsParse = [];
	            }
	
	            for (i = 0; i < 12; i++) {
	                // make the regex if we don't have it already
	                mom = moment.utc([2000, i]);
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
	        },
	
	        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdays : function (m) {
	            return this._weekdays[m.day()];
	        },
	
	        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysShort : function (m) {
	            return this._weekdaysShort[m.day()];
	        },
	
	        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        weekdaysMin : function (m) {
	            return this._weekdaysMin[m.day()];
	        },
	
	        weekdaysParse : function (weekdayName) {
	            var i, mom, regex;
	
	            if (!this._weekdaysParse) {
	                this._weekdaysParse = [];
	            }
	
	            for (i = 0; i < 7; i++) {
	                // make the regex if we don't have it already
	                if (!this._weekdaysParse[i]) {
	                    mom = moment([2000, 1]).day(i);
	                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	                }
	                // test the regex
	                if (this._weekdaysParse[i].test(weekdayName)) {
	                    return i;
	                }
	            }
	        },
	
	        _longDateFormat : {
	            LTS : 'h:mm:ss A',
	            LT : 'h:mm A',
	            L : 'MM/DD/YYYY',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY LT',
	            LLLL : 'dddd, MMMM D, YYYY LT'
	        },
	        longDateFormat : function (key) {
	            var output = this._longDateFormat[key];
	            if (!output && this._longDateFormat[key.toUpperCase()]) {
	                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
	                    return val.slice(1);
	                });
	                this._longDateFormat[key] = output;
	            }
	            return output;
	        },
	
	        isPM : function (input) {
	            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	            // Using charAt should be more compatible.
	            return ((input + '').toLowerCase().charAt(0) === 'p');
	        },
	
	        _meridiemParse : /[ap]\.?m?\.?/i,
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'pm' : 'PM';
	            } else {
	                return isLower ? 'am' : 'AM';
	            }
	        },
	
	
	        _calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        calendar : function (key, mom, now) {
	            var output = this._calendar[key];
	            return typeof output === 'function' ? output.apply(mom, [now]) : output;
	        },
	
	        _relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	
	        relativeTime : function (number, withoutSuffix, string, isFuture) {
	            var output = this._relativeTime[string];
	            return (typeof output === 'function') ?
	                output(number, withoutSuffix, string, isFuture) :
	                output.replace(/%d/i, number);
	        },
	
	        pastFuture : function (diff, output) {
	            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
	        },
	
	        ordinal : function (number) {
	            return this._ordinal.replace('%d', number);
	        },
	        _ordinal : '%d',
	        _ordinalParse : /\d{1,2}/,
	
	        preparse : function (string) {
	            return string;
	        },
	
	        postformat : function (string) {
	            return string;
	        },
	
	        week : function (mom) {
	            return weekOfYear(mom, this._week.dow, this._week.doy).week;
	        },
	
	        _week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        },
	
	        firstDayOfWeek : function () {
	            return this._week.dow;
	        },
	
	        firstDayOfYear : function () {
	            return this._week.doy;
	        },
	
	        _invalidDate: 'Invalid date',
	        invalidDate: function () {
	            return this._invalidDate;
	        }
	    });
	
	    /************************************
	        Formatting
	    ************************************/
	
	
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
	            var output = '';
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
	
	        if (!formatFunctions[format]) {
	            formatFunctions[format] = makeFormatFunction(format);
	        }
	
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
	
	
	    /************************************
	        Parsing
	    ************************************/
	
	
	    // get the regex to find the next token
	    function getParseRegexForToken(token, config) {
	        var a, strict = config._strict;
	        switch (token) {
	        case 'Q':
	            return parseTokenOneDigit;
	        case 'DDDD':
	            return parseTokenThreeDigits;
	        case 'YYYY':
	        case 'GGGG':
	        case 'gggg':
	            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
	        case 'Y':
	        case 'G':
	        case 'g':
	            return parseTokenSignedNumber;
	        case 'YYYYYY':
	        case 'YYYYY':
	        case 'GGGGG':
	        case 'ggggg':
	            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
	        case 'S':
	            if (strict) {
	                return parseTokenOneDigit;
	            }
	            /* falls through */
	        case 'SS':
	            if (strict) {
	                return parseTokenTwoDigits;
	            }
	            /* falls through */
	        case 'SSS':
	            if (strict) {
	                return parseTokenThreeDigits;
	            }
	            /* falls through */
	        case 'DDD':
	            return parseTokenOneToThreeDigits;
	        case 'MMM':
	        case 'MMMM':
	        case 'dd':
	        case 'ddd':
	        case 'dddd':
	            return parseTokenWord;
	        case 'a':
	        case 'A':
	            return config._locale._meridiemParse;
	        case 'x':
	            return parseTokenOffsetMs;
	        case 'X':
	            return parseTokenTimestampMs;
	        case 'Z':
	        case 'ZZ':
	            return parseTokenTimezone;
	        case 'T':
	            return parseTokenT;
	        case 'SSSS':
	            return parseTokenDigits;
	        case 'MM':
	        case 'DD':
	        case 'YY':
	        case 'GG':
	        case 'gg':
	        case 'HH':
	        case 'hh':
	        case 'mm':
	        case 'ss':
	        case 'ww':
	        case 'WW':
	            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
	        case 'M':
	        case 'D':
	        case 'd':
	        case 'H':
	        case 'h':
	        case 'm':
	        case 's':
	        case 'w':
	        case 'W':
	        case 'e':
	        case 'E':
	            return parseTokenOneOrTwoDigits;
	        case 'Do':
	            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
	        default :
	            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
	            return a;
	        }
	    }
	
	    function utcOffsetFromString(string) {
	        string = string || '';
	        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
	            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
	            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
	            minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	        return parts[0] === '+' ? minutes : -minutes;
	    }
	
	    // function to convert string input to date
	    function addTimeToArrayFromToken(token, input, config) {
	        var a, datePartArray = config._a;
	
	        switch (token) {
	        // QUARTER
	        case 'Q':
	            if (input != null) {
	                datePartArray[MONTH] = (toInt(input) - 1) * 3;
	            }
	            break;
	        // MONTH
	        case 'M' : // fall through to MM
	        case 'MM' :
	            if (input != null) {
	                datePartArray[MONTH] = toInt(input) - 1;
	            }
	            break;
	        case 'MMM' : // fall through to MMMM
	        case 'MMMM' :
	            a = config._locale.monthsParse(input, token, config._strict);
	            // if we didn't find a month name, mark the date as invalid.
	            if (a != null) {
	                datePartArray[MONTH] = a;
	            } else {
	                config._pf.invalidMonth = input;
	            }
	            break;
	        // DAY OF MONTH
	        case 'D' : // fall through to DD
	        case 'DD' :
	            if (input != null) {
	                datePartArray[DATE] = toInt(input);
	            }
	            break;
	        case 'Do' :
	            if (input != null) {
	                datePartArray[DATE] = toInt(parseInt(
	                            input.match(/\d{1,2}/)[0], 10));
	            }
	            break;
	        // DAY OF YEAR
	        case 'DDD' : // fall through to DDDD
	        case 'DDDD' :
	            if (input != null) {
	                config._dayOfYear = toInt(input);
	            }
	
	            break;
	        // YEAR
	        case 'YY' :
	            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
	            break;
	        case 'YYYY' :
	        case 'YYYYY' :
	        case 'YYYYYY' :
	            datePartArray[YEAR] = toInt(input);
	            break;
	        // AM / PM
	        case 'a' : // fall through to A
	        case 'A' :
	            config._meridiem = input;
	            // config._isPm = config._locale.isPM(input);
	            break;
	        // HOUR
	        case 'h' : // fall through to hh
	        case 'hh' :
	            config._pf.bigHour = true;
	            /* falls through */
	        case 'H' : // fall through to HH
	        case 'HH' :
	            datePartArray[HOUR] = toInt(input);
	            break;
	        // MINUTE
	        case 'm' : // fall through to mm
	        case 'mm' :
	            datePartArray[MINUTE] = toInt(input);
	            break;
	        // SECOND
	        case 's' : // fall through to ss
	        case 'ss' :
	            datePartArray[SECOND] = toInt(input);
	            break;
	        // MILLISECOND
	        case 'S' :
	        case 'SS' :
	        case 'SSS' :
	        case 'SSSS' :
	            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
	            break;
	        // UNIX OFFSET (MILLISECONDS)
	        case 'x':
	            config._d = new Date(toInt(input));
	            break;
	        // UNIX TIMESTAMP WITH MS
	        case 'X':
	            config._d = new Date(parseFloat(input) * 1000);
	            break;
	        // TIMEZONE
	        case 'Z' : // fall through to ZZ
	        case 'ZZ' :
	            config._useUTC = true;
	            config._tzm = utcOffsetFromString(input);
	            break;
	        // WEEKDAY - human
	        case 'dd':
	        case 'ddd':
	        case 'dddd':
	            a = config._locale.weekdaysParse(input);
	            // if we didn't get a weekday name, mark the date as invalid
	            if (a != null) {
	                config._w = config._w || {};
	                config._w['d'] = a;
	            } else {
	                config._pf.invalidWeekday = input;
	            }
	            break;
	        // WEEK, WEEK DAY - numeric
	        case 'w':
	        case 'ww':
	        case 'W':
	        case 'WW':
	        case 'd':
	        case 'e':
	        case 'E':
	            token = token.substr(0, 1);
	            /* falls through */
	        case 'gggg':
	        case 'GGGG':
	        case 'GGGGG':
	            token = token.substr(0, 2);
	            if (input) {
	                config._w = config._w || {};
	                config._w[token] = toInt(input);
	            }
	            break;
	        case 'gg':
	        case 'GG':
	            config._w = config._w || {};
	            config._w[token] = moment.parseTwoDigitYear(input);
	        }
	    }
	
	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp;
	
	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;
	
	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
	            week = dfl(w.W, 1);
	            weekday = dfl(w.E, 1);
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;
	
	            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
	            week = dfl(w.w, 1);
	
	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < dow) {
	                    ++week;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
	
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	
	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function dateFromConfig(config) {
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
	            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
	
	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                config._pf._overflowDayOfYear = true;
	            }
	
	            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
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
	
	        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }
	
	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }
	
	    function dateFromObject(config) {
	        var normalizedInput;
	
	        if (config._d) {
	            return;
	        }
	
	        normalizedInput = normalizeObjectUnits(config._i);
	        config._a = [
	            normalizedInput.year,
	            normalizedInput.month,
	            normalizedInput.day || normalizedInput.date,
	            normalizedInput.hour,
	            normalizedInput.minute,
	            normalizedInput.second,
	            normalizedInput.millisecond
	        ];
	
	        dateFromConfig(config);
	    }
	
	    function currentDateArray(config) {
	        var now = new Date();
	        if (config._useUTC) {
	            return [
	                now.getUTCFullYear(),
	                now.getUTCMonth(),
	                now.getUTCDate()
	            ];
	        } else {
	            return [now.getFullYear(), now.getMonth(), now.getDate()];
	        }
	    }
	
	    // date from string and format string
	    function makeDateFromStringAndFormat(config) {
	        if (config._f === moment.ISO_8601) {
	            parseISO(config);
	            return;
	        }
	
	        config._a = [];
	        config._pf.empty = true;
	
	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;
	
	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    config._pf.unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    config._pf.empty = false;
	                }
	                else {
	                    config._pf.unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                config._pf.unusedTokens.push(token);
	            }
	        }
	
	        // add remaining unparsed input length to the string
	        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            config._pf.unusedInput.push(string);
	        }
	
	        // clear _12h flag if hour is <= 12
	        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
	            config._pf.bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR],
	                config._meridiem);
	        dateFromConfig(config);
	        checkOverflow(config);
	    }
	
	    function unescapeFormat(s) {
	        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        });
	    }
	
	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function regexpEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }
	
	    // date from string and array of format strings
	    function makeDateFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,
	
	            scoreToBeat,
	            i,
	            currentScore;
	
	        if (config._f.length === 0) {
	            config._pf.invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }
	
	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._pf = defaultParsingFlags();
	            tempConfig._f = config._f[i];
	            makeDateFromStringAndFormat(tempConfig);
	
	            if (!isValid(tempConfig)) {
	                continue;
	            }
	
	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += tempConfig._pf.charsLeftOver;
	
	            //or tokens
	            currentScore += tempConfig._pf.unusedTokens.length * 10;
	
	            tempConfig._pf.score = currentScore;
	
	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }
	
	        extend(config, bestMoment || tempConfig);
	    }
	
	    // date from iso format
	    function parseISO(config) {
	        var i, l,
	            string = config._i,
	            match = isoRegex.exec(string);
	
	        if (match) {
	            config._pf.iso = true;
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(string)) {
	                    // match[5] should be 'T' or undefined
	                    config._f = isoDates[i][0] + (match[6] || ' ');
	                    break;
	                }
	            }
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(string)) {
	                    config._f += isoTimes[i][0];
	                    break;
	                }
	            }
	            if (string.match(parseTokenTimezone)) {
	                config._f += 'Z';
	            }
	            makeDateFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }
	
	    // date from iso format or fallback
	    function makeDateFromString(config) {
	        parseISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            moment.createFromInputFallback(config);
	        }
	    }
	
	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }
	
	    function makeDateFromInput(config) {
	        var input = config._i, matched;
	        if (input === undefined) {
	            config._d = new Date();
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
	            config._d = new Date(+matched[1]);
	        } else if (typeof input === 'string') {
	            makeDateFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            dateFromConfig(config);
	        } else if (typeof(input) === 'object') {
	            dateFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            moment.createFromInputFallback(config);
	        }
	    }
	
	    function makeDate(y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);
	
	        //the date constructor doesn't accept years < 1970
	        if (y < 1970) {
	            date.setFullYear(y);
	        }
	        return date;
	    }
	
	    function makeUTCDate(y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	        if (y < 1970) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }
	
	    function parseWeekday(input, locale) {
	        if (typeof input === 'string') {
	            if (!isNaN(input)) {
	                input = parseInt(input, 10);
	            }
	            else {
	                input = locale.weekdaysParse(input);
	                if (typeof input !== 'number') {
	                    return null;
	                }
	            }
	        }
	        return input;
	    }
	
	    /************************************
	        Relative Time
	    ************************************/
	
	
	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }
	
	    function relativeTime(posNegDuration, withoutSuffix, locale) {
	        var duration = moment.duration(posNegDuration).abs(),
	            seconds = round(duration.as('s')),
	            minutes = round(duration.as('m')),
	            hours = round(duration.as('h')),
	            days = round(duration.as('d')),
	            months = round(duration.as('M')),
	            years = round(duration.as('y')),
	
	            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
	                minutes === 1 && ['m'] ||
	                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
	                hours === 1 && ['h'] ||
	                hours < relativeTimeThresholds.h && ['hh', hours] ||
	                days === 1 && ['d'] ||
	                days < relativeTimeThresholds.d && ['dd', days] ||
	                months === 1 && ['M'] ||
	                months < relativeTimeThresholds.M && ['MM', months] ||
	                years === 1 && ['y'] || ['yy', years];
	
	        args[2] = withoutSuffix;
	        args[3] = +posNegDuration > 0;
	        args[4] = locale;
	        return substituteTimeAgo.apply({}, args);
	    }
	
	
	    /************************************
	        Week of Year
	    ************************************/
	
	
	    // firstDayOfWeek       0 = sun, 6 = sat
	    //                      the day of the week that starts the week
	    //                      (usually sunday or monday)
	    // firstDayOfWeekOfYear 0 = sun, 6 = sat
	    //                      the first week is the week that contains the first
	    //                      of this day of the week
	    //                      (eg. ISO weeks use thursday (4))
	    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
	        var end = firstDayOfWeekOfYear - firstDayOfWeek,
	            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
	            adjustedMoment;
	
	
	        if (daysToDayOfWeek > end) {
	            daysToDayOfWeek -= 7;
	        }
	
	        if (daysToDayOfWeek < end - 7) {
	            daysToDayOfWeek += 7;
	        }
	
	        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
	        return {
	            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
	            year: adjustedMoment.year()
	        };
	    }
	
	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
	        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;
	
	        d = d === 0 ? 7 : d;
	        weekday = weekday != null ? weekday : firstDayOfWeek;
	        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
	        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
	
	        return {
	            year: dayOfYear > 0 ? year : year - 1,
	            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
	        };
	    }
	
	    /************************************
	        Top Level Functions
	    ************************************/
	
	    function makeMoment(config) {
	        var input = config._i,
	            format = config._f,
	            res;
	
	        config._locale = config._locale || moment.localeData(config._l);
	
	        if (input === null || (format === undefined && input === '')) {
	            return moment.invalid({nullInput: true});
	        }
	
	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }
	
	        if (moment.isMoment(input)) {
	            return new Moment(input, true);
	        } else if (format) {
	            if (isArray(format)) {
	                makeDateFromStringAndArray(config);
	            } else {
	                makeDateFromStringAndFormat(config);
	            }
	        } else {
	            makeDateFromInput(config);
	        }
	
	        res = new Moment(config);
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }
	
	        return res;
	    }
	
	    moment = function (input, format, locale, strict) {
	        var c;
	
	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c = {};
	        c._isAMomentObject = true;
	        c._i = input;
	        c._f = format;
	        c._l = locale;
	        c._strict = strict;
	        c._isUTC = false;
	        c._pf = defaultParsingFlags();
	
	        return makeMoment(c);
	    };
	
	    moment.suppressDeprecationWarnings = false;
	
	    moment.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
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
	            return moment();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }
	
	    moment.min = function () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isBefore', args);
	    };
	
	    moment.max = function () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isAfter', args);
	    };
	
	    // creating with utc
	    moment.utc = function (input, format, locale, strict) {
	        var c;
	
	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c = {};
	        c._isAMomentObject = true;
	        c._useUTC = true;
	        c._isUTC = true;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;
	        c._pf = defaultParsingFlags();
	
	        return makeMoment(c).utc();
	    };
	
	    // creating with unix timestamp (in seconds)
	    moment.unix = function (input) {
	        return moment(input * 1000);
	    };
	
	    // duration
	    moment.duration = function (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            parseIso,
	            diffRes;
	
	        if (moment.isDuration(input)) {
	            duration = {
	                ms: input._milliseconds,
	                d: input._days,
	                M: input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y: 0,
	                d: toInt(match[DATE]) * sign,
	                h: toInt(match[HOUR]) * sign,
	                m: toInt(match[MINUTE]) * sign,
	                s: toInt(match[SECOND]) * sign,
	                ms: toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = isoDurationRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            parseIso = function (inp) {
	                // We'd normally use ~~inp for this, but unfortunately it also
	                // converts floats to ints.
	                // inp may be undefined, so careful calling replace on it.
	                var res = inp && parseFloat(inp.replace(',', '.'));
	                // apply sign while we're at it
	                return (isNaN(res) ? 0 : res) * sign;
	            };
	            duration = {
	                y: parseIso(match[2]),
	                M: parseIso(match[3]),
	                d: parseIso(match[4]),
	                h: parseIso(match[5]),
	                m: parseIso(match[6]),
	                s: parseIso(match[7]),
	                w: parseIso(match[8])
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' &&
	                ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(moment(duration.from), moment(duration.to));
	
	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }
	
	        ret = new Duration(duration);
	
	        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }
	
	        return ret;
	    };
	
	    // version number
	    moment.version = VERSION;
	
	    // default format
	    moment.defaultFormat = isoFormat;
	
	    // constant that refers to the ISO standard
	    moment.ISO_8601 = function () {};
	
	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    moment.momentProperties = momentProperties;
	
	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    moment.updateOffset = function () {};
	
	    // This function allows you to set a threshold for relative time strings
	    moment.relativeTimeThreshold = function (threshold, limit) {
	        if (relativeTimeThresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return relativeTimeThresholds[threshold];
	        }
	        relativeTimeThresholds[threshold] = limit;
	        return true;
	    };
	
	    moment.lang = deprecate(
	        'moment.lang is deprecated. Use moment.locale instead.',
	        function (key, value) {
	            return moment.locale(key, value);
	        }
	    );
	
	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    moment.locale = function (key, values) {
	        var data;
	        if (key) {
	            if (typeof(values) !== 'undefined') {
	                data = moment.defineLocale(key, values);
	            }
	            else {
	                data = moment.localeData(key);
	            }
	
	            if (data) {
	                moment.duration._locale = moment._locale = data;
	            }
	        }
	
	        return moment._locale._abbr;
	    };
	
	    moment.defineLocale = function (name, values) {
	        if (values !== null) {
	            values.abbr = name;
	            if (!locales[name]) {
	                locales[name] = new Locale();
	            }
	            locales[name].set(values);
	
	            // backwards compat for now: also set the locale
	            moment.locale(name);
	
	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    };
	
	    moment.langData = deprecate(
	        'moment.langData is deprecated. Use moment.localeData instead.',
	        function (key) {
	            return moment.localeData(key);
	        }
	    );
	
	    // returns locale data
	    moment.localeData = function (key) {
	        var locale;
	
	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }
	
	        if (!key) {
	            return moment._locale;
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
	    };
	
	    // compare moment object
	    moment.isMoment = function (obj) {
	        return obj instanceof Moment ||
	            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
	    };
	
	    // for typechecking Duration objects
	    moment.isDuration = function (obj) {
	        return obj instanceof Duration;
	    };
	
	    for (i = lists.length - 1; i >= 0; --i) {
	        makeList(lists[i]);
	    }
	
	    moment.normalizeUnits = function (units) {
	        return normalizeUnits(units);
	    };
	
	    moment.invalid = function (flags) {
	        var m = moment.utc(NaN);
	        if (flags != null) {
	            extend(m._pf, flags);
	        }
	        else {
	            m._pf.userInvalidated = true;
	        }
	
	        return m;
	    };
	
	    moment.parseZone = function () {
	        return moment.apply(null, arguments).parseZone();
	    };
	
	    moment.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };
	
	    moment.isDate = isDate;
	
	    /************************************
	        Moment Prototype
	    ************************************/
	
	
	    extend(moment.fn = Moment.prototype, {
	
	        clone : function () {
	            return moment(this);
	        },
	
	        valueOf : function () {
	            return +this._d - ((this._offset || 0) * 60000);
	        },
	
	        unix : function () {
	            return Math.floor(+this / 1000);
	        },
	
	        toString : function () {
	            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	        },
	
	        toDate : function () {
	            return this._offset ? new Date(+this) : this._d;
	        },
	
	        toISOString : function () {
	            var m = moment(this).utc();
	            if (0 < m.year() && m.year() <= 9999) {
	                if ('function' === typeof Date.prototype.toISOString) {
	                    // native implementation is ~50x faster, use it when we can
	                    return this.toDate().toISOString();
	                } else {
	                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	                }
	            } else {
	                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        },
	
	        toArray : function () {
	            var m = this;
	            return [
	                m.year(),
	                m.month(),
	                m.date(),
	                m.hours(),
	                m.minutes(),
	                m.seconds(),
	                m.milliseconds()
	            ];
	        },
	
	        isValid : function () {
	            return isValid(this);
	        },
	
	        isDSTShifted : function () {
	            if (this._a) {
	                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
	            }
	
	            return false;
	        },
	
	        parsingFlags : function () {
	            return extend({}, this._pf);
	        },
	
	        invalidAt: function () {
	            return this._pf.overflow;
	        },
	
	        utc : function (keepLocalTime) {
	            return this.utcOffset(0, keepLocalTime);
	        },
	
	        local : function (keepLocalTime) {
	            if (this._isUTC) {
	                this.utcOffset(0, keepLocalTime);
	                this._isUTC = false;
	
	                if (keepLocalTime) {
	                    this.subtract(this._dateUtcOffset(), 'm');
	                }
	            }
	            return this;
	        },
	
	        format : function (inputString) {
	            var output = formatMoment(this, inputString || moment.defaultFormat);
	            return this.localeData().postformat(output);
	        },
	
	        add : createAdder(1, 'add'),
	
	        subtract : createAdder(-1, 'subtract'),
	
	        diff : function (input, units, asFloat) {
	            var that = makeAs(input, this),
	                zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4,
	                anchor, diff, output, daysAdjust;
	
	            units = normalizeUnits(units);
	
	            if (units === 'year' || units === 'month' || units === 'quarter') {
	                output = monthDiff(this, that);
	                if (units === 'quarter') {
	                    output = output / 3;
	                } else if (units === 'year') {
	                    output = output / 12;
	                }
	            } else {
	                diff = this - that;
	                output = units === 'second' ? diff / 1e3 : // 1000
	                    units === 'minute' ? diff / 6e4 : // 1000 * 60
	                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
	                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                    diff;
	            }
	            return asFloat ? output : absRound(output);
	        },
	
	        from : function (time, withoutSuffix) {
	            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        },
	
	        fromNow : function (withoutSuffix) {
	            return this.from(moment(), withoutSuffix);
	        },
	
	        calendar : function (time) {
	            // We want to compare the start of today, vs this.
	            // Getting start-of-today depends on whether we're locat/utc/offset
	            // or not.
	            var now = time || moment(),
	                sod = makeAs(now, this).startOf('day'),
	                diff = this.diff(sod, 'days', true),
	                format = diff < -6 ? 'sameElse' :
	                    diff < -1 ? 'lastWeek' :
	                    diff < 0 ? 'lastDay' :
	                    diff < 1 ? 'sameDay' :
	                    diff < 2 ? 'nextDay' :
	                    diff < 7 ? 'nextWeek' : 'sameElse';
	            return this.format(this.localeData().calendar(format, this, moment(now)));
	        },
	
	        isLeapYear : function () {
	            return isLeapYear(this.year());
	        },
	
	        isDST : function () {
	            return (this.utcOffset() > this.clone().month(0).utcOffset() ||
	                this.utcOffset() > this.clone().month(5).utcOffset());
	        },
	
	        day : function (input) {
	            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	            if (input != null) {
	                input = parseWeekday(input, this.localeData());
	                return this.add(input - day, 'd');
	            } else {
	                return day;
	            }
	        },
	
	        month : makeAccessor('Month', true),
	
	        startOf : function (units) {
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
	                /* falls through */
	            }
	
	            // weeks are a special case
	            if (units === 'week') {
	                this.weekday(0);
	            } else if (units === 'isoWeek') {
	                this.isoWeekday(1);
	            }
	
	            // quarters are also special
	            if (units === 'quarter') {
	                this.month(Math.floor(this.month() / 3) * 3);
	            }
	
	            return this;
	        },
	
	        endOf: function (units) {
	            units = normalizeUnits(units);
	            if (units === undefined || units === 'millisecond') {
	                return this;
	            }
	            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	        },
	
	        isAfter: function (input, units) {
	            var inputMs;
	            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	            if (units === 'millisecond') {
	                input = moment.isMoment(input) ? input : moment(input);
	                return +this > +input;
	            } else {
	                inputMs = moment.isMoment(input) ? +input : +moment(input);
	                return inputMs < +this.clone().startOf(units);
	            }
	        },
	
	        isBefore: function (input, units) {
	            var inputMs;
	            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	            if (units === 'millisecond') {
	                input = moment.isMoment(input) ? input : moment(input);
	                return +this < +input;
	            } else {
	                inputMs = moment.isMoment(input) ? +input : +moment(input);
	                return +this.clone().endOf(units) < inputMs;
	            }
	        },
	
	        isBetween: function (from, to, units) {
	            return this.isAfter(from, units) && this.isBefore(to, units);
	        },
	
	        isSame: function (input, units) {
	            var inputMs;
	            units = normalizeUnits(units || 'millisecond');
	            if (units === 'millisecond') {
	                input = moment.isMoment(input) ? input : moment(input);
	                return +this === +input;
	            } else {
	                inputMs = +moment(input);
	                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	            }
	        },
	
	        min: deprecate(
	                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	                 function (other) {
	                     other = moment.apply(null, arguments);
	                     return other < this ? this : other;
	                 }
	         ),
	
	        max: deprecate(
	                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	                function (other) {
	                    other = moment.apply(null, arguments);
	                    return other > this ? this : other;
	                }
	        ),
	
	        zone : deprecate(
	                'moment().zone is deprecated, use moment().utcOffset instead. ' +
	                'https://github.com/moment/moment/issues/1779',
	                function (input, keepLocalTime) {
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
	        ),
	
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
	        utcOffset : function (input, keepLocalTime) {
	            var offset = this._offset || 0,
	                localAdjust;
	            if (input != null) {
	                if (typeof input === 'string') {
	                    input = utcOffsetFromString(input);
	                }
	                if (Math.abs(input) < 16) {
	                    input = input * 60;
	                }
	                if (!this._isUTC && keepLocalTime) {
	                    localAdjust = this._dateUtcOffset();
	                }
	                this._offset = input;
	                this._isUTC = true;
	                if (localAdjust != null) {
	                    this.add(localAdjust, 'm');
	                }
	                if (offset !== input) {
	                    if (!keepLocalTime || this._changeInProgress) {
	                        addOrSubtractDurationFromMoment(this,
	                                moment.duration(input - offset, 'm'), 1, false);
	                    } else if (!this._changeInProgress) {
	                        this._changeInProgress = true;
	                        moment.updateOffset(this, true);
	                        this._changeInProgress = null;
	                    }
	                }
	
	                return this;
	            } else {
	                return this._isUTC ? offset : this._dateUtcOffset();
	            }
	        },
	
	        isLocal : function () {
	            return !this._isUTC;
	        },
	
	        isUtcOffset : function () {
	            return this._isUTC;
	        },
	
	        isUtc : function () {
	            return this._isUTC && this._offset === 0;
	        },
	
	        zoneAbbr : function () {
	            return this._isUTC ? 'UTC' : '';
	        },
	
	        zoneName : function () {
	            return this._isUTC ? 'Coordinated Universal Time' : '';
	        },
	
	        parseZone : function () {
	            if (this._tzm) {
	                this.utcOffset(this._tzm);
	            } else if (typeof this._i === 'string') {
	                this.utcOffset(utcOffsetFromString(this._i));
	            }
	            return this;
	        },
	
	        hasAlignedHourOffset : function (input) {
	            if (!input) {
	                input = 0;
	            }
	            else {
	                input = moment(input).utcOffset();
	            }
	
	            return (this.utcOffset() - input) % 60 === 0;
	        },
	
	        daysInMonth : function () {
	            return daysInMonth(this.year(), this.month());
	        },
	
	        dayOfYear : function (input) {
	            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
	            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	        },
	
	        quarter : function (input) {
	            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	        },
	
	        weekYear : function (input) {
	            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
	            return input == null ? year : this.add((input - year), 'y');
	        },
	
	        isoWeekYear : function (input) {
	            var year = weekOfYear(this, 1, 4).year;
	            return input == null ? year : this.add((input - year), 'y');
	        },
	
	        week : function (input) {
	            var week = this.localeData().week(this);
	            return input == null ? week : this.add((input - week) * 7, 'd');
	        },
	
	        isoWeek : function (input) {
	            var week = weekOfYear(this, 1, 4).week;
	            return input == null ? week : this.add((input - week) * 7, 'd');
	        },
	
	        weekday : function (input) {
	            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	            return input == null ? weekday : this.add(input - weekday, 'd');
	        },
	
	        isoWeekday : function (input) {
	            // behaves the same as moment#day except
	            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	            // as a setter, sunday should belong to the previous week.
	            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	        },
	
	        isoWeeksInYear : function () {
	            return weeksInYear(this.year(), 1, 4);
	        },
	
	        weeksInYear : function () {
	            var weekInfo = this.localeData()._week;
	            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	        },
	
	        get : function (units) {
	            units = normalizeUnits(units);
	            return this[units]();
	        },
	
	        set : function (units, value) {
	            var unit;
	            if (typeof units === 'object') {
	                for (unit in units) {
	                    this.set(unit, units[unit]);
	                }
	            }
	            else {
	                units = normalizeUnits(units);
	                if (typeof this[units] === 'function') {
	                    this[units](value);
	                }
	            }
	            return this;
	        },
	
	        // If passed a locale key, it will set the locale for this
	        // instance.  Otherwise, it will return the locale configuration
	        // variables for this instance.
	        locale : function (key) {
	            var newLocaleData;
	
	            if (key === undefined) {
	                return this._locale._abbr;
	            } else {
	                newLocaleData = moment.localeData(key);
	                if (newLocaleData != null) {
	                    this._locale = newLocaleData;
	                }
	                return this;
	            }
	        },
	
	        lang : deprecate(
	            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	            function (key) {
	                if (key === undefined) {
	                    return this.localeData();
	                } else {
	                    return this.locale(key);
	                }
	            }
	        ),
	
	        localeData : function () {
	            return this._locale;
	        },
	
	        _dateUtcOffset : function () {
	            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	            // https://github.com/moment/moment/pull/1871
	            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
	        }
	
	    });
	
	    function rawMonthSetter(mom, value) {
	        var dayOfMonth;
	
	        // TODO: Move this out of here!
	        if (typeof value === 'string') {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (typeof value !== 'number') {
	                return mom;
	            }
	        }
	
	        dayOfMonth = Math.min(mom.date(),
	                daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }
	
	    function rawGetter(mom, unit) {
	        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
	    }
	
	    function rawSetter(mom, unit, value) {
	        if (unit === 'Month') {
	            return rawMonthSetter(mom, value);
	        } else {
	            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }
	
	    function makeAccessor(unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                rawSetter(this, unit, value);
	                moment.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return rawGetter(this, unit);
	            }
	        };
	    }
	
	    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
	    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
	    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
	    // moment.fn.month is defined separately
	    moment.fn.date = makeAccessor('Date', true);
	    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
	    moment.fn.year = makeAccessor('FullYear', true);
	    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));
	
	    // add plural methods
	    moment.fn.days = moment.fn.day;
	    moment.fn.months = moment.fn.month;
	    moment.fn.weeks = moment.fn.week;
	    moment.fn.isoWeeks = moment.fn.isoWeek;
	    moment.fn.quarters = moment.fn.quarter;
	
	    // add aliased format methods
	    moment.fn.toJSON = moment.fn.toISOString;
	
	    // alias isUtc for dev-friendliness
	    moment.fn.isUTC = moment.fn.isUtc;
	
	    /************************************
	        Duration Prototype
	    ************************************/
	
	
	    function daysToYears (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        return days * 400 / 146097;
	    }
	
	    function yearsToDays (years) {
	        // years * 365 + absRound(years / 4) -
	        //     absRound(years / 100) + absRound(years / 400);
	        return years * 146097 / 400;
	    }
	
	    extend(moment.duration.fn = Duration.prototype, {
	
	        _bubble : function () {
	            var milliseconds = this._milliseconds,
	                days = this._days,
	                months = this._months,
	                data = this._data,
	                seconds, minutes, hours, years = 0;
	
	            // The following code bubbles up values, see the tests for
	            // examples of what that means.
	            data.milliseconds = milliseconds % 1000;
	
	            seconds = absRound(milliseconds / 1000);
	            data.seconds = seconds % 60;
	
	            minutes = absRound(seconds / 60);
	            data.minutes = minutes % 60;
	
	            hours = absRound(minutes / 60);
	            data.hours = hours % 24;
	
	            days += absRound(hours / 24);
	
	            // Accurately convert days to years, assume start from year 0.
	            years = absRound(daysToYears(days));
	            days -= absRound(yearsToDays(years));
	
	            // 30 days to a month
	            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
	            months += absRound(days / 30);
	            days %= 30;
	
	            // 12 months -> 1 year
	            years += absRound(months / 12);
	            months %= 12;
	
	            data.days = days;
	            data.months = months;
	            data.years = years;
	        },
	
	        abs : function () {
	            this._milliseconds = Math.abs(this._milliseconds);
	            this._days = Math.abs(this._days);
	            this._months = Math.abs(this._months);
	
	            this._data.milliseconds = Math.abs(this._data.milliseconds);
	            this._data.seconds = Math.abs(this._data.seconds);
	            this._data.minutes = Math.abs(this._data.minutes);
	            this._data.hours = Math.abs(this._data.hours);
	            this._data.months = Math.abs(this._data.months);
	            this._data.years = Math.abs(this._data.years);
	
	            return this;
	        },
	
	        weeks : function () {
	            return absRound(this.days() / 7);
	        },
	
	        valueOf : function () {
	            return this._milliseconds +
	              this._days * 864e5 +
	              (this._months % 12) * 2592e6 +
	              toInt(this._months / 12) * 31536e6;
	        },
	
	        humanize : function (withSuffix) {
	            var output = relativeTime(this, !withSuffix, this.localeData());
	
	            if (withSuffix) {
	                output = this.localeData().pastFuture(+this, output);
	            }
	
	            return this.localeData().postformat(output);
	        },
	
	        add : function (input, val) {
	            // supports only 2.0-style add(1, 's') or add(moment)
	            var dur = moment.duration(input, val);
	
	            this._milliseconds += dur._milliseconds;
	            this._days += dur._days;
	            this._months += dur._months;
	
	            this._bubble();
	
	            return this;
	        },
	
	        subtract : function (input, val) {
	            var dur = moment.duration(input, val);
	
	            this._milliseconds -= dur._milliseconds;
	            this._days -= dur._days;
	            this._months -= dur._months;
	
	            this._bubble();
	
	            return this;
	        },
	
	        get : function (units) {
	            units = normalizeUnits(units);
	            return this[units.toLowerCase() + 's']();
	        },
	
	        as : function (units) {
	            var days, months;
	            units = normalizeUnits(units);
	
	            if (units === 'month' || units === 'year') {
	                days = this._days + this._milliseconds / 864e5;
	                months = this._months + daysToYears(days) * 12;
	                return units === 'month' ? months : months / 12;
	            } else {
	                // handle milliseconds separately because of floating point math errors (issue #1867)
	                days = this._days + Math.round(yearsToDays(this._months / 12));
	                switch (units) {
	                    case 'week': return days / 7 + this._milliseconds / 6048e5;
	                    case 'day': return days + this._milliseconds / 864e5;
	                    case 'hour': return days * 24 + this._milliseconds / 36e5;
	                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
	                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
	                    // Math.floor prevents floating point math errors here
	                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
	                    default: throw new Error('Unknown unit ' + units);
	                }
	            }
	        },
	
	        lang : moment.fn.lang,
	        locale : moment.fn.locale,
	
	        toIsoString : deprecate(
	            'toIsoString() is deprecated. Please use toISOString() instead ' +
	            '(notice the capitals)',
	            function () {
	                return this.toISOString();
	            }
	        ),
	
	        toISOString : function () {
	            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	            var years = Math.abs(this.years()),
	                months = Math.abs(this.months()),
	                days = Math.abs(this.days()),
	                hours = Math.abs(this.hours()),
	                minutes = Math.abs(this.minutes()),
	                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);
	
	            if (!this.asSeconds()) {
	                // this is the same as C#'s (Noda) and python (isodate)...
	                // but not other JS (goog.date)
	                return 'P0D';
	            }
	
	            return (this.asSeconds() < 0 ? '-' : '') +
	                'P' +
	                (years ? years + 'Y' : '') +
	                (months ? months + 'M' : '') +
	                (days ? days + 'D' : '') +
	                ((hours || minutes || seconds) ? 'T' : '') +
	                (hours ? hours + 'H' : '') +
	                (minutes ? minutes + 'M' : '') +
	                (seconds ? seconds + 'S' : '');
	        },
	
	        localeData : function () {
	            return this._locale;
	        },
	
	        toJSON : function () {
	            return this.toISOString();
	        }
	    });
	
	    moment.duration.fn.toString = moment.duration.fn.toISOString;
	
	    function makeDurationGetter(name) {
	        moment.duration.fn[name] = function () {
	            return this._data[name];
	        };
	    }
	
	    for (i in unitMillisecondFactors) {
	        if (hasOwnProp(unitMillisecondFactors, i)) {
	            makeDurationGetter(i.toLowerCase());
	        }
	    }
	
	    moment.duration.fn.asMilliseconds = function () {
	        return this.as('ms');
	    };
	    moment.duration.fn.asSeconds = function () {
	        return this.as('s');
	    };
	    moment.duration.fn.asMinutes = function () {
	        return this.as('m');
	    };
	    moment.duration.fn.asHours = function () {
	        return this.as('h');
	    };
	    moment.duration.fn.asDays = function () {
	        return this.as('d');
	    };
	    moment.duration.fn.asWeeks = function () {
	        return this.as('weeks');
	    };
	    moment.duration.fn.asMonths = function () {
	        return this.as('M');
	    };
	    moment.duration.fn.asYears = function () {
	        return this.as('y');
	    };
	
	    /************************************
	        Default Locale
	    ************************************/
	
	
	    // Set default locale, other locale will inherit from English.
	    moment.locale('en', {
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
	
	    /* EMBED_LOCALES */
	
	    /************************************
	        Exposing Moment
	    ************************************/
	
	    function makeGlobal(shouldDeprecate) {
	        /*global ender:false */
	        if (typeof ender !== 'undefined') {
	            return;
	        }
	        oldGlobalMoment = globalScope.moment;
	        if (shouldDeprecate) {
	            globalScope.moment = deprecate(
	                    'Accessing Moment through the global scope is ' +
	                    'deprecated, and will be removed in an upcoming ' +
	                    'release.',
	                    moment);
	        } else {
	            globalScope.moment = moment;
	        }
	    }
	
	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = moment;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	            if (module.config && module.config() && module.config().noGlobal === true) {
	                // release the global variable
	                globalScope.moment = oldGlobalMoment;
	            }
	
	            return moment;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        makeGlobal(true);
	    } else {
	        makeGlobal();
	    }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(28)(module)))

/***/ },
/* 9 */
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
	        try { moment = __webpack_require__(8); } catch (e) {}
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
	
	    renderDay = function(d, m, y, isSelected, isToday, isDisabled, isEmpty)
	    {
	        if (isEmpty) {
	            return '<td class="is-empty"></td>';
	        }
	        var arr = [];
	        if (isDisabled) {
	            arr.push('is-disabled');
	        }
	        if (isToday) {
	            arr.push('is-today');
	        }
	        if (isSelected) {
	            arr.push('is-selected');
	        }
	        return '<td data-day="' + d + '" class="' + arr.join(' ') + '">' +
	                 '<button class="pika-button pika-day" type="button" ' +
	                    'data-pika-year="' + y + '" data-pika-month="' + m + '" data-pika-day="' + d + '">' +
	                        d +
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
	        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month">' + arr.join('') + '</select></div>';
	
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
	        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year">' + arr.join('') + '</select></div>';
	
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
	                    return;
	                }
	                else if (hasClass(target, 'pika-prev')) {
	                    self.prevMonth();
	                }
	                else if (hasClass(target, 'pika-next')) {
	                    self.nextMonth();
	                }
	            }
	            if (!hasClass(target, 'pika-select')) {
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
	            self.setDate(isDate(date) ? date : null);
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
	        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '');
	
	        addEvent(self.el, 'mousedown', self._onMouseDown, true);
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
	
	            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);
	
	            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;
	
	            opts.disableWeekends = !!opts.disableWeekends;
	
	            opts.disableDayFn = (typeof opts.disableDayFn) == "function" ? opts.disableDayFn : null;
	
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
	                setToStartOfDay(opts.minDate);
	                opts.minYear  = opts.minDate.getFullYear();
	                opts.minMonth = opts.minDate.getMonth();
	            }
	            if (opts.maxDate) {
	                setToStartOfDay(opts.maxDate);
	                opts.maxYear  = opts.maxDate.getFullYear();
	                opts.maxMonth = opts.maxDate.getMonth();
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
	            this._o.minDate = value;
	        },
	
	        /**
	         * change the maxDate
	         */
	        setMaxDate: function(value)
	        {
	            this._o.maxDate = value;
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
	            if (this._o.container) return;
	            var field = this._o.trigger, pEl = field,
	            width = this.el.offsetWidth, height = this.el.offsetHeight,
	            viewportWidth = window.innerWidth || document.documentElement.clientWidth,
	            viewportHeight = window.innerHeight || document.documentElement.clientHeight,
	            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
	            left, top, clientRect;
	
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
	
	            this.el.style.cssText = [
	                'position: absolute',
	                'left: ' + left + 'px',
	                'top: ' + top + 'px'
	            ].join(';');
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
	                    isDisabled = (opts.minDate && day < opts.minDate) ||
	                                 (opts.maxDate && day > opts.maxDate) ||
	                                 (opts.disableWeekends && isWeekend(day)) ||
	                                 (opts.disableDayFn && opts.disableDayFn(day));
	
	                row.push(renderDay(1 + (i - before), month, year, isSelected, isToday, isDisabled, isEmpty));
	
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
	                this.el.style.cssText = '';
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(30);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<input type=\"text\" class=\"date\">\r");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn fa fa-chevron-left\" data-go=\"prev\"></a>\r");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn btn-today\" data-go=\"today\">Today</a>\r");t.b("\n" + i);t.b("<a href=\"#\" class=\"btn fa fa-chevron-right\" data-go=\"next\"></a>");return t.fl(); },partials: {}, subs: {  }}, "<input type=\"text\" class=\"date\">\r\n<a href=\"#\" class=\"btn fa fa-chevron-left\" data-go=\"prev\"></a>\r\n<a href=\"#\" class=\"btn btn-today\" data-go=\"today\">Today</a>\r\n<a href=\"#\" class=\"btn fa fa-chevron-right\" data-go=\"next\"></a>", H);return T.render.apply(T, arguments); };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var util = _interopRequire(__webpack_require__(17));
	
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
		if (!this || !this.length) return false;
		var has = false,
		    el = this[0];
		while (!has && el) {
			has = el.matches(cls);
			if (has) return sizzle(el);
			el = el.parentNode;
			if (el.tagName === "HTML") return null;
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
	
	module.exports = sizzle;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var util = _interopRequire(__webpack_require__(17));
	
	var base_url = "api/";
	
	function ajax(options) {
		if (typeof options === "string") options = { url: options };
	
		var req = new XMLHttpRequest(),
		    resp,
		    data = options.data || "";
		options.url = base_url + options.url;
		options.method = options.method || "GET";
		options.type = options.type || "json";
	
		if (data) {
			if (options.method.toLowerCase() === "get") options.url += util.serialize(data);else if (options.type === "json") data = JSON.stringify(data);
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
			req.setRequestHeader("Content-Type", "application/" + options.type + "; charset=UTF-8");
			req.send(data);
		});
	}
	
	module.exports = {
		ajax: ajax,
		get: function (url, data) {
			return ajax({ url: url, data: data || {} });
		},
		post: function (url, data) {
			return ajax({ url: url, data: data || {}, method: "POST" });
		},
		put: function (url, data) {
			return ajax({ url: url, data: data || {}, method: "PUT" });
		},
		del: function (url, data) {
			return ajax({ url: url, data: data || {}, method: "DELETE" });
		} };

/***/ },
/* 13 */
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
		}if (!(this instanceof Form)) {
			return new Form(el);
		}this.form = el;
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
				    value = typeof params[name] === "undefined" ? "" : params[name];
	
				if (name.indexOf("[") > -1) {
					var v = params;
					var names = name.replace(/[\[\]]/g, "|").split("|");
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var n = _step2.value;
	
							if (v[n]) v = v[n];else {
								v = undefined;if (_iterator2["return"]) _iterator2["return"]();
								break;
							}
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
	
					value = v;
				}
	
				if (clear !== true && value === undefined) return;
	
				if (value === null || value === undefined) value = "";
	
				if (typeof value === "string" && value.indexOf("&") > -1) value = _decodeEntities(value);
	
				if (input.type === "radio") input.checked = input.value.toString() === value.toString();else if (input.type === "checkbox") input.checked = value;else if (input.tagName === "SELECT") {
					if (value === "" || value === undefined) input.selectedIndex = 0;else input.value = value;
				} else input.value = value;
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
	
		return this;
	};
	
	Form.prototype.get = function () {
		var convert = arguments[0] === undefined ? false : arguments[0];
	
		var inputs = _getInputs(this.form),
		    data = {},
		    current;
	
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var input = _step.value;
	
				var type = input.type && input.type.toLowerCase(),
				    value = undefined,
				    parts = undefined,
				    lastPart = undefined,
				    last = undefined;
	
				if (type === "submit" || !input.name || input.disabled) return;
	
				value = input.value;
				parts = input.name.match(keyBreaker);
	
				if (type === "radio" && !input.checked) return;
	
				if (type === "checkbox") value = input.checked;
	
				if (convert) {
					if (_isNumber(value)) {
						var tv = parseFloat(value);
						var cmp = tv + "";
	
						if (value.indexOf(".") > 0) cmp = tv.toFixed(value.split(".")[1].length);
						if (cmp === value) value = tv;
					} else if (value === "true") value = true;else if (value === "false") value = false;
					if (value === "") value = null;
				}
	
				current = data;
	
				for (var i = 0; i < parts.length - 1; i++) {
					current[parts[i]] = current[parts[i]] || {};
					current = current[parts[i]];
				}
				lastPart = parts[parts.length - 1];
	
				last = current[lastPart];
				if (last) {
					if (!Array.isArray(last)) current[lastPart] = last === undefined ? [] : [last];
					current[lastPart].push(value);
				} else current[lastPart] = value;
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
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = this.form.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var field = _step.value;
	
				var fname = field.name.replace(/[\[\]]/g, "_") + "val",
				    ov = this.form.dataset[fname],
				    v = field.value;
				if (fname === "val") continue;
				if (field.type === "checkbox") {
					v = field.checked;
					ov = ov === "true";
				} else if (field.type === "radio" && !field.checked) continue;
				if (typeof ov === "undefined" && typeof v !== "undefined") {
					if (field.type === "radio") this.observeCb(v, ov, field);
					ov = this.form.dataset[fname] = v;
				} else if (ov !== v) {
					this.form.dataset[fname] = v;
					this.observeCb(v, ov, field);
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
		NUMSLASH: 111 },
	    digits = {
		48: 1,
		49: 1,
		50: 1,
		51: 1,
		52: 1,
		53: 1,
		54: 1,
		55: 1,
		56: 1,
		57: 1,
		96: 1,
		97: 1,
		98: 1,
		99: 1,
		100: 1,
		101: 1,
		102: 1,
		103: 1,
		104: 1,
		105: 1 },
	    allowedChars = {
		8: 1,
		9: 1,
		46: 1,
		35: 1,
		36: 1,
		37: 1,
		39: 1 };
	
	function isMath(e) {
		var k = e.keyCode;
		if (k === keys.SPACE) {
			return true;
		}if (k === keys.NUMDOT || k === keys.DOT && !e.shiftKey) {
			return true;
		}if (k === keys.NUMMINUS || k === keys.MINUS && !e.shiftKey) {
			return true;
		}if (k === keys.NUMPLUS || k === keys.PLUS && e.shiftKey) {
			return true;
		}if (k === keys.NUMSLASH || k === keys.SLASH && !e.shiftKey) {
			return true;
		}if (e.shiftKey) {
			if (k === 56 || k === 57 || k === 48) {
				return true;
			}
		}
		return false;
	}
	
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
	
	function isAlpha(e) {
		return e.keyCode >= 65 && e.keyCode <= 90 && !e.ctrlKey;
	}
	
	function isAlphaNumeric(e) {
		return isAlpha(e) || isDigit(e);
	}
	
	module.exports = {
		keys: keys,
		isAllowed: isAllowed,
		isDigit: isDigit,
		isAlpha: isAlpha,
		isAlphaNumeric: isAlphaNumeric
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var colors = ["#3498db", "#d35400", "#9b59b6", "#bdc3c7", "#e74c3c", "#1abc9c", "#ecf0f1", "#27ae60", "#8e44ad", "#e67e22", "#2980b9", "#f1c40f", "#16a085", "#95a5a6", "#f39c12", "#2ecc71", "#c0392b", "#7f8c8d", "#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"];
	
	function lighter(hex) {
		var lum = arguments[1] === undefined ? 0.2 : arguments[1];
	
		hex = String(hex).replace(/[^0-9a-f]/gi, "");
		if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		lum = lum || 0;
	
		var rgb = "#",
		    c,
		    i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
			rgb += ("00" + c).substr(c.length);
		}
		return rgb;
	}
	
	function addColors(items) {
		return items.map(function (item, i) {
			item.color = colors[i];
			item.highlight = lighter(colors[i]);
			return item;
		});
	}
	
	module.exports = {
		colors: colors,
		lighter: lighter,
		addColors: addColors
	};

/***/ },
/* 17 */
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
	
	function serialize(obj) {
		var keys = Object.keys(obj);
		if (!keys || !keys.length) {
			return "";
		}return "?" + keys.reduce(function (a, k) {
			a.push(k + "=" + encodeURIComponent(obj[k]));
			return a;
		}, []).join("&");
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
		}return Object.keys(x).length === 0;
	}
	
	function rand(max) {
		var min = arguments[1] === undefined ? 0 : arguments[1];
	
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	function each(arr, cb, scope) {
		if (!arr) {
			return;
		}if (type(arr) === "object") for (var key in arr) cb.call(scope || cb, arr[key], key);else for (var i = 0, item; item = arr[i]; i++) cb.call(scope || cb, item, i);
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
		serialize: serialize,
		isNodeList: isNodeList,
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Toaster = _interopRequire(__webpack_require__(29));
	
	var Data = _interopRequire(__webpack_require__(22));
	
	var Categories = _interopRequire(__webpack_require__(23));
	
	var Calendar = _interopRequire(__webpack_require__(1));
	
	var Moment = _interopRequire(__webpack_require__(8));
	
	var tpl = __webpack_require__(27);
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
	
		return map;
	}
	
	function cloneItem(item) {
		var addMonths = arguments[1] === undefined ? 1 : arguments[1];
	
		var newItem = JSON.parse(JSON.stringify(item));
		newItem.date = Moment(newItem.date).add(addMonths, "months").format("YYYY-MM-DD");
		return newItem;
	}
	
	function repeatItems(items, times) {
		if (!items || !items.length) {
			return [];
		}var newItems = [];
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
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
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
	
	var Form = (function () {
		function Form(config) {
			_classCallCheck(this, Form);
	
			this.cfg = Object.assign(_defaults, config);
			this.el = this.cfg.target;
			this.form = $.form(this.el[0]);
			this.subforms = this.cfg.target.find(".subforms");
	
			this.categories = [];
			this.catMap = {};
	
			this.el.on("submit", this.onSubmit.bind(this));
			this.el.on("click", this.onClick.bind(this));
	
			if (typeof this.cfg.onChange === "function") {
				this.form.observe((function (nv, ov, f) {
					this.cfg.onChange.call(this.cfg.onChange, nv, ov, f);
				}).bind(this));
			}
			this.draw();
		}
	
		_prototypeProperties(Form, null, {
			draw: {
				value: function draw() {
					var _this = this;
	
					if (this.categories.length) this.reset();else Categories.getTree().then(function (data) {
						_this.categories = data;
						_this.catMap = parseCategories(data);
						_this.reset();
					});
					return this;
				},
				writable: true,
				configurable: true
			},
			reset: {
				value: function reset() {
					this.subforms.html("");
					this.split(true);
					var rep = this.el.find(".repeat-in");
					if (rep) rep[0].value = 1;
					return this;
				},
				writable: true,
				configurable: true
			},
			set: {
				value: function set(data) {
					this.reset();
					this.form.set(data);
					return this;
				},
				writable: true,
				configurable: true
			},
			unsplit: {
				value: function unsplit(btn) {
					btn.closest(".form-row").remove();
					var rows = this.el.find(".form-row");
					$.each(rows, function (row, i) {
						var fields = $(row).find("input,select");
						$.each(fields, function (f) {
							if (!f.name) return;
							f.name = f.name.replace(/\[\d+\]/, "[" + i + "]");
						});
					});
					this.cfg.onChange.call(this.cfg.onChange);
				},
				writable: true,
				configurable: true
			},
			split: {
				value: function split(first) {
					var idx = this.subforms.find(".form-row").length;
					var subform = $(tpl({ first: first === true, categories: this.categories, idx: idx }));
					subform.appendTo(this.subforms).find("select")[0].focus();
					this.addInputEvents(subform);
				},
				writable: true,
				configurable: true
			},
			setDate: {
				value: function setDate(date) {
					var dates = this.subforms.find("input[name$=\"date\"]");
					$.each(dates, function (f) {
						f.value = date;
					});
				},
				writable: true,
				configurable: true
			},
			getData: {
				value: function getData() {
					var clean = arguments[0] === undefined ? false : arguments[0];
	
					var date = Calendar.get(true),
					    format = function (n) {
						return n.toLocaleString("en-GB", { minimumFractionDigits: 2 });
					},
					    formData = this.form.get(true),
					    data = [],
					    errors = [],
					    total = 0;
	
					$.each(formData.items, function (item, i) {
						if (!item.date) item.date = date;
						if (!item.amount) errors.push("Please enter amount!");else {
							item.amount = this.parseAmount(item.amount);
							if (i.toString() === "0") total = item.amount;else total -= item.amount;
							if (!clean) {
								item.amount_str = format(item.amount);
								item.category = this.catMap[item.category_id];
							}
							data.push(item);
						}
					}, this);
					if (errors.length && clean) {
						return Toaster.error(errors[0]);
					}if (data && data.length) {
						data[0].amount = total;
						if (!clean) data[0].amount_str = format(total);
					}
					formData.items = repeatItems(data, formData.repeat);
					return formData;
				},
				writable: true,
				configurable: true
			},
			parseAmount: {
				value: function parseAmount(amount) {
					amount = ("" + amount).replace(/\s/g, "");
					if (!/^[\+\-\\*\/\(\)\d\.]+$/i.test(amount)) {
						return 0;
					}if (/[\+\-\\*\/\.]+/i.test(amount)) {
						try {
							amount = eval(amount);
						} catch (e) {
							amount = 0;
						}
					}
					return parseFloat(amount);
				},
				writable: true,
				configurable: true
			},
			validate: {
				value: function validate(data) {
					if (!data || !data.length) {
						return false;
					}var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var d = _step.value;
	
							if (d.amount <= 0) return Toaster.error("Amount cannot be negative");
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
	
					return true;
				},
				writable: true,
				configurable: true
			},
			addInputEvents: {
				value: function addInputEvents(subform) {
					var inputs = subform.find(".amount");
					inputs.on("keydown", this.onKeyDown.bind(this));
				},
				writable: true,
				configurable: true
			},
			onKeyDown: {
				value: function onKeyDown(e) {
					if ($.isAllowed(e)) {
						return true;
					}e.preventDefault();
				},
				writable: true,
				configurable: true
			},
			onClick: {
				value: function onClick(e) {
					var target = $(e.target);
					if (target.is(".btn-split")) this.split();else if (target.is(".btn-del")) this.unsplit(target);else {
						return;
					}e.preventDefault();
				},
				writable: true,
				configurable: true
			},
			onSubmit: {
				value: function onSubmit(e) {
					var _this = this;
	
					e.preventDefault();
					var data = this.getData(true).items;
					if (!this.validate(data)) {
						return;
					}if (data) Data.save(data).then(function (resp) {
						if (resp.result === "success") _this.reset();return resp;
					}).then(this.cfg.onAdd);
				},
				writable: true,
				configurable: true
			}
		});
	
		return Form;
	})();
	
	module.exports = Form;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(30);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"#\" class=\"cat\"\r");t.b("\n" + i);t.b("	data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"\r");t.b("\n" + i);t.b("	data-name=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"\r");t.b("\n" + i);t.b("	data-parent_id=\"");t.b(t.v(t.f("parent_id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"#\" class=\"cat\"\r\n\tdata-id=\"{{id}}\"\r\n\tdata-name=\"{{name}}\"\r\n\tdata-parent_id=\"{{parent_id}}\">{{name}}</a>\r\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var _clone = function _clone(o) {
		return JSON.parse(JSON.stringify(o));
	},
	    _options = {
		chart: { renderTo: "", type: "", backgroundColor: null, spacing: [20, 10, 10, 10] },
		title: { align: "left", style: { color: "#eee" }, text: "" },
		colors: $.colors,
		credits: { enabled: false },
		tooltip: {
			hideDelay: 0,
			backgroundColor: "rgba(0, 0, 0, 0.9)",
			style: { color: "#F0F0F0" },
			valuePrefix: "€"
		},
		legend: {
			verticalAlign: "top",
			align: "left",
			x: 0,
			y: 30,
			itemStyle: { color: "#ccc" },
			itemHoverStyle: { color: "#fff" },
			itemHiddenStyle: { color: "#888" }
		},
		plotOptions: {}
	},
	    _xAxis = { labels: { style: { color: "#ccc" } } },
	    _yAxis = {
		title: { text: null },
		labels: {
			style: { color: "#ccc" },
			formatter: function formatter() {
				return "€" + this.value;
			}
		},
		showFirstLabel: false,
		min: 0,
		tickPixelInterval: 50,
		gridLineColor: "#444"
	};
	
	module.exports = function (type, containerId, title, data) {
		var chart = "Chart";
		var options = _clone(_options);
		options.chart.renderTo = containerId;
		options.title.text = title;
		if (data) options.series = [data];
	
		if (type === "pie") {
			options.chart.type = type;
			options.legend.layout = "vertical";
			options.legend.align = "left";
			options.tooltip.headerFormat = "<span style=\"font-size: 10px\">Expenses</span><br/>";
			options.tooltip.pointFormatter = function () {
				return "<span style=\"color: " + this.color + "\">●</span> " + this.name + ": €" + this.y;
			};
			options.plotOptions.pie = {
				borderWidth: 0,
				showInLegend: true,
				allowPointSelect: false,
				dataLabels: { enabled: false }
			};
		} else if (type === "line") {
			if (data) options.series = data;
			options.chart.type = type;
			options.tooltip.crosshairs = true;
			options.tooltip.shared = true;
			options.legend.align = "right";
			options.yAxis = _clone(_yAxis);
			options.xAxis = _clone(_xAxis);
			options.xAxis.categories = $.months;
		} else if (type === "stock") {
			chart = "StockChart";
			options.rangeSelector = { enabled: false };
			options.tooltip.xDateFormat = "%a, %e %b %Y";
			options.xAxis = _clone(_xAxis);
			options.yAxis = _clone(_yAxis);
		}
		return new window.Highcharts[chart](options);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var Toaster = _interopRequire(__webpack_require__(29));
	
	var Data = _interopRequire(__webpack_require__(25));
	
	var Calendar = _interopRequire(__webpack_require__(1));
	
	var Moment = _interopRequire(__webpack_require__(8));
	
	var _defaults = {
		onAdd: function onAdd() {}
	};
	
	function cloneItem(item) {
		var addMonths = arguments[1] === undefined ? 1 : arguments[1];
	
		var newItem = JSON.parse(JSON.stringify(item));
		newItem.date = Moment(newItem.date).add(addMonths, "months").format("YYYY-MM-DD");
		return newItem;
	}
	
	function repeatItems(items, times) {
		if (!items || !items.length) {
			return [];
		}var newItems = [];
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
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
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
	
	var Form = (function () {
		function Form(config) {
			_classCallCheck(this, Form);
	
			this.cfg = Object.assign(_defaults, config);
			this.el = this.cfg.target;
			this.form = $.form(this.el[0]);
			this.subforms = this.cfg.target.find(".subforms");
	
			this.categories = [];
			this.catMap = {};
	
			this.el.on("submit", this.onSubmit.bind(this));
	
			if (typeof this.cfg.onChange === "function") {
				this.form.observe((function (nv, ov, f) {
					this.cfg.onChange.call(this.cfg.onChange, nv, ov, f);
				}).bind(this));
			}
	
			var subform = this.subforms.find(".form-row");
			subform.find("input")[0].focus();
			this.addInputEvents(subform);
	
			return this.reset();
		}
	
		_prototypeProperties(Form, null, {
			reset: {
				value: function reset() {
					this.form.reset();
					var rep = this.el.find(".repeat-in");
					if (rep) rep[0].value = 1;
					return this;
				},
				writable: true,
				configurable: true
			},
			set: {
				value: function set(data) {
					this.reset();
					this.form.set(data);
					return this;
				},
				writable: true,
				configurable: true
			},
			setDate: {
				value: function setDate(date) {
					var dates = this.subforms.find("input[name$=\"date\"]");
					$.each(dates, function (f) {
						f.value = date;
					});
				},
				writable: true,
				configurable: true
			},
			getData: {
				value: function getData() {
					var clean = arguments[0] === undefined ? false : arguments[0];
	
					var date = Calendar.get(true),
					    format = function (n) {
						return n.toLocaleString("en-GB", { minimumFractionDigits: 2 });
					},
					    item = this.form.get(true),
					    repeat = item.repeat,
					    errors = [];
	
					delete item.repeat;
					if (!item.date) item.date = date;
					if (!item.amount) errors.push("Please enter amount!");else {
						item.amount = this.parseAmount(item.amount);
						if (!clean) item.amount_str = format(item.amount);
					}
					if (errors.length && clean) {
						return Toaster.error(errors[0]);
					}if (!errors.length) {
						return { items: repeatItems([item], repeat) };
					}return {};
				},
				writable: true,
				configurable: true
			},
			parseAmount: {
				value: function parseAmount(amount) {
					amount = ("" + amount).replace(/\s/g, "");
					if (!/^[\+\-\\*\/\(\)\d\.]+$/i.test(amount)) {
						return 0;
					}if (/[\+\-\\*\/\.]+/i.test(amount)) {
						try {
							amount = eval(amount);
						} catch (e) {
							amount = 0;
						}
					}
					return parseFloat(amount);
				},
				writable: true,
				configurable: true
			},
			validate: {
				value: function validate(data) {
					if (!data || !data.length) {
						return false;
					}var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var d = _step.value;
	
							if (d.amount <= 0) return Toaster.error("Amount cannot be negative");
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
	
					return true;
				},
				writable: true,
				configurable: true
			},
			addInputEvents: {
				value: function addInputEvents(subform) {
					var inputs = subform.find(".amount");
					inputs.on("keydown", this.onKeyDown.bind(this));
				},
				writable: true,
				configurable: true
			},
			onKeyDown: {
				value: function onKeyDown(e) {
					if ($.isAllowed(e)) {
						return true;
					}e.preventDefault();
				},
				writable: true,
				configurable: true
			},
			onSubmit: {
				value: function onSubmit(e) {
					var _this = this;
	
					e.preventDefault();
					var data = this.getData(true);
					if (!this.validate(data.items)) {
						return;
					}if (data.items) Data.save(data.items).then(function (resp) {
						if (resp.result === "success") _this.reset();return resp;
					}).then(this.cfg.onAdd);
				},
				writable: true,
				configurable: true
			}
		});
	
		return Form;
	})();
	
	module.exports = Form;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var _url = "entries";
	
	module.exports = {
		get: function (params) {
			var id = typeof params === "number" ? params : null;
			return $.get(_url + (id ? "/" + id : ""), params || {});
		},
	
		save: function (params) {
			if (params.length === 1 && params[0].id) params = params[0];
			return $.post(_url + (params.id ? "/" + params.id : ""), params);
		},
	
		del: function (id) {
			return $.del(_url + "/" + id);
		}
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var _url = "categories";
	
	module.exports = {
		get: function () {
			return $.get(_url);
		},
		getTree: function () {
			return $.get("categorytree");
		},
		save: function (params) {
			if (!params.id) delete params.id;
			return $.post(_url + (params.id ? "/" + params.id : ""), params);
		},
		del: function (params) {
			return $.del(_url + "/" + params.id);
		}
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	module.exports = {
		spendingByCategory: function (params) {
			return $.get("spendingByCategory", params || {});
		},
	
		incomeVsExpenses: function (params) {
			return $.get("incomeVsExpenses", params || {});
		},
	
		spendingByDay: function (params) {
			return $.get("spendingByDay", params || {});
		}
	
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(3));
	
	var _url = "incomes";
	
	module.exports = {
		get: function (params) {
			var id = typeof params === "number" ? params : null;
			return $.get(_url + (id ? "/" + id : ""), params || {});
		},
	
		save: function (params) {
			if (params.length === 1 && params[0].id) params = params[0];
			return $.post(_url + (params.id ? "/" + params.id : ""), params);
		},
	
		del: function (id) {
			return $.del(_url + "/" + id);
		}
	};

/***/ },
/* 26 */
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
	/******/ 	__webpack_require__.p = "";
	
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
	
		if (!Object.assign) Object.defineProperty(Object, "assign", {
			enumerable: false,
			configurable: true,
			writable: true,
			value: function value(target) {
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
		});
	
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
	
		function fuzzy(haystack, s) {
			var hay = ("" + haystack).toLowerCase(),
			    i = 0,
			    n = -1,
			    l;
			s = ("" + s).toLowerCase();
			for (; l = s[i++];) if (! ~(n = hay.indexOf(l, n + 1))) {
				return false;
			}return true;
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
						if (fuzzy(item[f], this.filter)) {
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
				if (target.dataset) action = target.dataset.action;
				if (action === "search") this.toggleSearchBox();
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
					self.populate.call(self);
					self.toggleSearchBox.call(self);
				}
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
						col.name = "<a href=\"#\" class=\"row-action\" data-action=\"search\" " + "title=\"Search\"><i class=\"fa fa-search\"></i></a>" + "<div class=\"filter-box\"><input class=\"filter-input\" type=\"text\"></div>";
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
					this.el.filterBox = this.el.head.querySelector(".filter-box");
					this.el.filterInput = this.el.head.querySelector(".filter-input");
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
			}this.el.filterBox.classList.toggle("visible");
			if (this.el.filterBox.classList.contains("visible")) {
				this.el.filterInput.focus();
			}
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
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"grid ");t.b(t.v(t.f("theme",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<table class=\"grid-table grid-header-table\">\r");t.b("\n" + i);t.b("		<thead><tr class=\"grid-header\"></tr></thead>\r");t.b("\n" + i);t.b("	</table>\r");t.b("\n" + i);t.b("	<div class=\"grid-scroller\">\r");t.b("\n" + i);t.b("		<table class=\"grid-table grid-body-table\">\r");t.b("\n" + i);t.b("			<tbody class=\"grid-body\"></tbody>\r");t.b("\n" + i);t.b("		</table>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("	<table class=\"grid-table grid-footer-table\">\r");t.b("\n" + i);t.b("		<tfoot><tr class=\"grid-footer\"></tr></tfoot>\r");t.b("\n" + i);t.b("	</table>\r");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"grid {{theme}}\">\r\n\t<table class=\"grid-table grid-header-table\">\r\n\t\t<thead><tr class=\"grid-header\"></tr></thead>\r\n\t</table>\r\n\t<div class=\"grid-scroller\">\r\n\t\t<table class=\"grid-table grid-body-table\">\r\n\t\t\t<tbody class=\"grid-body\"></tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<table class=\"grid-table grid-footer-table\">\r\n\t\t<tfoot><tr class=\"grid-footer\"></tr></tfoot>\r\n\t</table>\r\n</div>", H);return T.render.apply(T, arguments); };
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"grid-row\">\r");t.b("\n" + i);if(t.s(t.f("cells",c,p,1),c,p,0,51,140,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		<td class=\"grid-cell ");t.b(t.v(t.f("cls",c,p,0)));t.b("\"><span class=\"grid-cell-inner\">");t.b(t.t(t.f("text",c,p,0)));t.b("</span></td>\r");t.b("\n" + i);});c.pop();}t.b("</tr>");return t.fl(); },partials: {}, subs: {  }}, "<tr data-id=\"{{id}}\" class=\"grid-row\">\r\n\t{{#cells}}\r\n\t\t<td class=\"grid-cell {{cls}}\"><span class=\"grid-cell-inner\">{{{text}}}</span></td>\r\n\t{{/cells}}\r\n</tr>", H);return T.render.apply(T, arguments); };
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<td class=\"");t.b(t.v(t.f("headerCls",c,p,0)));t.b("\" data-sortby=\"");t.b(t.v(t.f("field",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	");if(t.s(t.f("sortable",c,p,1),c,p,0,66,92,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<i class=\"fa fa-sort\"></i>");});c.pop();}t.b("\r");t.b("\n" + i);t.b("	<span class=\"grid-header-cell-inner\">");t.b(t.t(t.f("name",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("</td>");return t.fl(); },partials: {}, subs: {  }}, "<td class=\"{{headerCls}}\" data-sortby=\"{{field}}\">\r\n\t{{#sortable}}<i class=\"fa fa-sort\"></i>{{/sortable}}\r\n\t<span class=\"grid-header-cell-inner\">{{{name}}}</span>\r\n</td>", H);return T.render.apply(T, arguments); };
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		var H = __webpack_require__(10);
		module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<td class=\"");t.b(t.v(t.f("footerCls",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<span class=\"grid-footer-cell-inner\">");t.b(t.v(t.f("footerText",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("</td>");return t.fl(); },partials: {}, subs: {  }}, "<td class=\"{{footerCls}}\">\r\n\t<span class=\"grid-footer-cell-inner\">{{footerText}}</span>\r\n</td>", H);return T.render.apply(T, arguments); };
	
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
	;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(30);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-row\">\r");t.b("\n" + i);t.b("	<input type=\"hidden\" name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]id\">\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("	<input type=\"hidden\" name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]date\">\r");t.b("\n" + i);t.b("	<select name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]category_id\" class=\"category\">\r");t.b("\n" + i);if(t.s(t.f("categories",c,p,1),c,p,0,202,317,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		<optgroup label=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("			");if(t.s(t.f("items",c,p,1),c,p,0,248,288,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<option value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</option>");});c.pop();}t.b("\r");t.b("\n" + i);t.b("		</optgroup>\r");t.b("\n" + i);});c.pop();}t.b("	</select>\r");t.b("\n" + i);t.b("	<input name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]amount\" class=\"amount\" placeholder=\"0.00\">\r");t.b("\n" + i);t.b("	<input name=\"items[");t.b(t.v(t.f("idx",c,p,0)));t.b("]description\" class=\"description\" placeholder=\"description\">\r");t.b("\n" + i);t.b("	");if(t.s(t.f("first",c,p,1),c,p,0,518,590,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a href=\"#\" title=\"Split\" class=\"btn-split fa fa-angle-double-down\"></a>");});c.pop();}t.b("\r");t.b("\n" + i);t.b("	");if(!t.s(t.f("first",c,p,1),c,p,1,0,0,"")){t.b("<a href=\"#\" title=\"Remove\" class=\"btn-del fa fa-trash-o\"></a>");};t.b("\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"form-row\">\r\n\t<input type=\"hidden\" name=\"items[{{idx}}]id\">\r\n\r\n\t<input type=\"hidden\" name=\"items[{{idx}}]date\">\r\n\t<select name=\"items[{{idx}}]category_id\" class=\"category\">\r\n\t\t{{#categories}}\r\n\t\t<optgroup label=\"{{name}}\">\r\n\t\t\t{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}\r\n\t\t</optgroup>\r\n\t\t{{/categories}}\r\n\t</select>\r\n\t<input name=\"items[{{idx}}]amount\" class=\"amount\" placeholder=\"0.00\">\r\n\t<input name=\"items[{{idx}}]description\" class=\"description\" placeholder=\"description\">\r\n\t{{#first}}<a href=\"#\" title=\"Split\" class=\"btn-split fa fa-angle-double-down\"></a>{{/first}}\r\n\t{{^first}}<a href=\"#\" title=\"Remove\" class=\"btn-del fa fa-trash-o\"></a>{{/first}}\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	module.exports = Toaster;

/***/ },
/* 30 */
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
	
	var Hogan = __webpack_require__(31);
	Hogan.Template = __webpack_require__(32).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 31 */
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
/* 32 */
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
/******/ ]);
//# sourceMappingURL=app.js.map