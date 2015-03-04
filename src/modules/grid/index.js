import util from './util';

export default class Grid {

	constructor (cfg) {
		let _defaults = {
			target: document.body,
			sort: { by: 'id', order: 'asc' },
			dataSource: null,
			// items: { label: 'items', root: '', itemId: 'id' },
			columns: []
		};
		this.tpl = {
			frame: require('./frame.html'),
			row: require('./row.html')
		};
		this.isRendered = false;
		this.cfg = Object.assign({}, _defaults, cfg);
		this.cfg.target.classList.add('grid');
		this.cfg.target.innerHTML = this.tpl.frame();
		this.el = {
			target: this.cfg.target,
			scroller: this.cfg.target.querySelector('.grid-scroller'),
			head: this.cfg.target.querySelector('.grid-header'),
			body: this.cfg.target.querySelector('.grid-body'),
			foot: this.cfg.target.querySelector('.grid-footer'),
			headTable: this.cfg.target.querySelector('.grid-header-table'),
			bodyTable: this.cfg.target.querySelector('.grid-body-table')
		};
		this.processColumns();
		this.el.target.addEventListener('click', this.onClick.bind(this));
		this.el.scroller.addEventListener('scroll', this.onScroll.bind(this));
	}

	load () {
		this.data = {};
		this.items = [];
		if (!this.cfg.dataSource) throw 'No data source';
		var src = this.cfg.dataSource();
		if (src instanceof Promise) src.then(this.setData.bind(this));
		else this.setData(src);
		return this;
	}

	setData (data) {
		if (!data) throw 'No data!';
		this.data = data;
		// if (this.cfg.items.root) this.items = data[this.cfg.items.root];
		this.items = data;
		this.sortItems();
		return this;
	}

	sortItems (sortBy, order) {
		if (sortBy) this.cfg.sort.by = sortBy;
		if (order) this.cfg.sort.order = order;

		if (this.items && this.items.length) {
			this.items.sort(util.sortFn({ by: 'id', order: 'desc'}, this.items));
			if (sortBy) this.items.sort(util.sortFn(this.cfg.sort, this.items));
		}
		this.populate();

		var col, all = this.el.head.querySelectorAll('.sort');
		for (col of all) col.classList.remove('sort-asc', 'sort-desc');
		this.el.head.querySelector('.sort.' + this.cfg.sort.by)
			.classList.add('sort-' + this.cfg.sort.order);
	}

	processColumns () {
		var actions = {}, colWidths = [];
		for (let col of this.cfg.columns) {
			if (col.icons) {														// column icons
				for (let icon in col.icons) actions[icon] = col.icons[icon].action;
			}
			if (typeof col.width === 'string' && col.width.indexOf('%') === -1) {	// column widths
				col.width = parseInt(col.width, 10);
			}
			colWidths.push(col.width || 'auto');
		}
		this.columnWidths = colWidths;
		this.iconHandlers = actions;
	}

	updateColumnWidths () {
		var autos = 0, sumW = 0, remainingW, autoPercent = 100, autoW,
			headCols = this.el.head.querySelectorAll('.grid-cell'),
			bodyCols = this.el.body.querySelectorAll('.grid-row:first-child .grid-cell'),
			footCols = this.el.foot.querySelectorAll('.grid-cell');

		// calculate columns widths
		for (let col of this.columnWidths) {
			if (typeof col === 'number') sumW += col;
			else if (col === 'auto') autos++;
			else if (col.indexOf('%') > -1) {
				autoPercent -= parseInt(col, 10);
				autos++;
			}
		}
		remainingW = this.el.head.offsetWidth - sumW;
		autoPercent = autoPercent / autos;
		autoW = remainingW * autoPercent / 100;

		for (let [i, col] of this.columnWidths.entries()) {
			if (col === 'auto') col = autoPercent + '%';
			else if (typeof col === 'number') col = col + 'px';

			if (headCols[i]) headCols[i].style.width = col;
			if (bodyCols[i]) bodyCols[i].style.width = col;
			if (footCols[i]) footCols[i].style.width = col;
		}
		this.el.bodyTable.style.width = this.el.headTable.offsetWidth + 'px';
	}


	onClick (e) {
		var target = e.target;

		if (util.closest(target, 'td.sort')) {
			target = util.closest(target, 'td.sort');
			let isAsc = target.classList.contains('sort-asc');
			this.sortItems(target.dataset.sortby, isAsc ? 'desc' : 'asc');
		}

		else if (util.closest(target, '.row-action')) {
			target = util.closest(target, '.row-action');
			e.preventDefault();
			let row = util.closest(target, '.grid-row'),
				action = target.dataset.action,
				id = +row.dataset.id,
				item = this.getItemById(id);
			this.iconHandlers[action].call(this, item, row);
		}
	}
	onScroll () {
		var scrld = this.el.scroller.scrollTop > 0;
		this.el.headTable.classList.toggle('grid-header-scroll-over', scrld);
	}


	getItemById (id) { return this.items.filter(item => item.id === id)[0]; }



	/*** HTML *************************************************************************************/
	getItemRow (item) {
		return this.cfg.columns.map(col => {
			let text = item[col.field];
			let cls = (col.cls ? ' ' + col.cls : '');
			if (typeof col.renderer === 'function') text = col.renderer.call(this, text, item);
			else if (col.icons) {
				text = Object.keys(col.icons).map(i => {
					let icon = col.icons[i];
					let cls = 'row-action';
					return '<a href="#" class="' + cls + '" data-action="' + i +
						'"><i class="fa fa-' + icon.cls + '"></i></a>';
				}).join('');
			}
			return { cls, text };
		}, this);
	}

	getHeader () {
		var cells = this.cfg.columns.map(col => {
			let text = col.name || '';
			let cls = 'grid-cell grid-header-cell' + (col.cls ? ' ' + col.cls : '');
			if (col.sortable) cls += ' sort';
			return '<td class="' + cls + '" data-sortby="' + col.field + '">' +
				'<em></em><span class="grid-header-cell-inner">' + text + '</span></td>';
		}, this);
		return cells.join('');
	}

	getFooter () {
		var cells = this.cfg.columns.map(col => {
			let text = '';
			let cls = 'grid-cell grid-footer-cell' + (col.cls ? ' ' + col.cls : '');
			if (typeof col.footer === 'function') text = col.footer.call(this, this.data);
			else if (typeof col.footer === 'string') text = col.footer;
			return `<td class="${cls}"><span class="grid-footer-cell-inner">${text}</span></td>`;
		}, this);
		return cells.join('');
	}

	getBody () {
		return this.items
			.map(item => this.tpl.row({ id: item.id, cells: this.getItemRow(item) }), this)
			.join('');
	}

	populate () {
		if (!this.isRendered) {
			this.el.head.innerHTML = this.getHeader();
			this.el.foot.innerHTML = this.getFooter();
			this.isRendered = true;
		}
		this.el.body.innerHTML = this.getBody();
		this.updateColumnWidths();
	}
	/*** HTML *************************************************************************************/



	selectRow (row, unselectOther) {
		if (unselectOther) this.unselectRows();
		row.classList.add('selected');
	}

	unselectRows () {
		var row, rows = this.el.body.querySelectorAll('.grid-row.selected');
		for (row of rows) row.classList.remove('selected');
	}

}