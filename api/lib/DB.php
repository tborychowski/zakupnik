<?php
class DB {

	private $output = '';
	private $db;
	private $db_cfg = [
		// required
		'database_type' => 'mysql',
		'database_name' => 'zakupnik',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8',

		// optional
		// 'port' => 3306,
		// driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
		// 'option' => [ PDO::ATTR_CASE => PDO::CASE_NATURAL ]
	];


	public function __construct($options = null) {
		$this->db = new medoo($this->db_cfg);
	}

	public function __toString () { return print_r($this->output, true); }

	public function to_json ($pretty = true) {
		// $flags = JSON_NUMERIC_CHECK;
		$flags = 0;
		if ($pretty) $flags = $flags | JSON_PRETTY_PRINT;
		return json_encode($this->output, $flags);
	}

	public function get_all ($table) {
		$this->output = $this->db->select($table, '*');
		$this->integerise();
		return $this;
	}

	public function get_by_id ($table, $id) {
		$this->output = [];
		$out = $this->db->select($table, '*', [ "id" => $id ]);
		if (!empty($out)) $this->output = $out[0];
		$this->integerise();
		return $this;
	}




	public function get_categories ($id = null) {
		if (!empty($id)) $this->get_by_id('categories', $id);
		else {
			$this->get_all('categories');
			$this->integerise('parent_id');
		}
		return $this;
	}
	public function category_tree () {
		$this->output = $this->get_category_tree($this->output);
		return $this;
	}

	public function get_entries ($id) {
		if (!empty($id)) $this->get_by_id('entries', $id);
		else {
			// select entries.*, categories.name as category from entries
			// join categories on entries.category_id = categories.id
			$this->output = $this->db->select('entries', [
					'[>]categories' => ['category_id' => 'id']
				], [
					'entries.id',
					'entries.date',
					'categories.name(category)',
					'entries.description',
					'entries.amount'
				], [
					'ORDER' => 'entries.date DESC',
					'LIMIT' => 25
				]);

			foreach ($this->output as &$e) {
				$e['amount'] = intval($e['amount']);
				$e['amount_str'] = number_format($e['amount'], 2, '.', ',');
			}

		}
		return $this;
	}



	/**
	 * Convert categories to a tree (recurr.)
	 * @return [array]       nested array
	 */
	private function get_category_tree ($data, $item = array('id' => 0, 'name' => 'Zakupnik')) {
		$items = array_filter($data, function ($i) use($item) {
			return $i['parent_id'] == $item['id'];
		});

		if (!empty($items)) {
			foreach ($items as &$sub) {
				$sub = $this->get_category_tree($data, $sub);
			}
			$item['items'] = array_values($items);
		}
		return $item;
	}





	private function integerise ($fields = 'id') {
		$fields = explode(',', $fields);
		foreach ($this->output as &$row) {
			foreach ($fields as $f) $row[$f] = intval($row[$f]);
		}
		return $this;
	}

}
