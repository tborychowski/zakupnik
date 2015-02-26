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
		$flags = JSON_NUMERIC_CHECK;
		if ($pretty) $flags = $flags | JSON_PRETTY_PRINT;
		return json_encode($this->output, $flags);
	}

	public function get_all ($table) {
		$this->output = $this->db->select($table, '*');
		return $this;
	}

	public function get_by_id ($table, $id) {
		$this->output = [];
		$out = $this->db->select($table, '*', [ "id" => $id ]);
		if (!empty($out)) $this->output = $out[0];
		return $this;
	}



	public function get_categories ($id) {
		if (!empty($id)) $this->get_by_id('categories', $id);
		else {
			$this->get_all('categories');
			$this->output = $this->get_categories_tree($this->output);
		}
		return $this;
	}

	public function get_entries ($id) {
		if (!empty($id)) $this->get_by_id('entries', $id);
		else $this->get_all('entries');
		return $this;
	}



	/**
	 * Convert categories to a tree (recurr.)
	 * @return [array]       nested array
	 */
	private function get_categories_tree ($data, $item = array('id' => 0, 'name' => 'Zakupnik')) {
		$items = array_filter($data, function ($i) use($item) {
			return $i['parent_id'] == $item['id'];
		});

		if (!empty($items)) {
			foreach ($items as &$sub) {
				$sub = $this->get_categories_tree($data, $sub);
			}
			$item['items'] = array_values($items);
		}
		return $item;
	}




}
