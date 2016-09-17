<?php
class DB {

	public $output = '';
	public $db;

	private $db_cfg = [
		// required
		// 'database_type' => 'mysql',
		// 'database_name' => 'zakupnik',
		// 'server' => 'localhost',
		// 'username' => 'root',
		// 'password' => 'root',
		// 'charset' => 'utf8',

		'database_type' => 'sqlite',
		'database_file' => '../assets/database.db'

		// optional
		// 'port' => 3306,
		// driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
		// 'option' => [ PDO::ATTR_CASE => PDO::CASE_NATURAL ]
	];


	public function __construct($options = null) {
		try {
			$this->db = new medoo($this->db_cfg);
		}
		catch (Exception $e) {
			echo '{ "error": "DB ERROR" }';
			$this->db = null;
		}
	}

	public function __toString () { return print_r($this->output, true); }

	public function to_json ($pretty = true) {
		// $flags = JSON_NUMERIC_CHECK;
		$flags = 0;
		if ($pretty) $flags = $flags | JSON_PRETTY_PRINT;
		if (!$this->output) $this->output = [];
		return json_encode($this->output, $flags);
	}



	public function get_all ($table) {
		if (!$this->db) return $this;
		$this->output = $this->db->select($table, '*');
		$this->integerise();
		return $this;
	}

	public function get_by_id ($table, $id) {
		if (!$this->db) return $this;
		$this->output = [];
		$out = $this->db->select($table, '*', [ "id" => $id ]);
		if (!empty($out)) $this->output = $out[0];
		$this->integerise();
		return $this;
	}

	public function insert ($table, $data) {
		if (!$this->db) return $this;
		$res = $this->db->insert($table, $data);

		var_dump($this->db->error());

		use medoo->query(create........);
		$database->query()
		$database->query("CREATE TABLE table (
			c1 INT STORAGE DISK,
			c2 INT STORAGE MEMORY
		) ENGINE NDB;");

		if (!is_array($res)) $res = [$res];
		if (array_sum($res) === 0) $this->output = ['result' => 'error'];
		else $this->output = ['result' => 'success'];
		return $this;
	}

	public function update ($table, $data) {
		if (!$this->db) return $this;
		$id = $data['id'];
		unset($data['id']);
		$res = $this->db->update($table, $data, [ 'id' => intval($id) ]);
		// if ($res == 0) $this->output = ['result' => 'error'];
		// else $this->output = ['result' => 'success'];
		$this->output = ['result' => 'success'];
		return $this;
	}

	public function delete ($table, $id) {
		if (!$this->db) return $this;
		$res = $this->db->delete($table, [ 'id' => intval($id) ]);
		if ($res == 0) $this->output = ['result' => 'error'];
		else $this->output = ['result' => 'success'];
		return $this;
	}




	public function integerise ($fields = 'id,parent_id') {
		$fields = explode(',', $fields);
		// table
		if (isset($this->output[0])) {
			foreach ($this->output as &$row) {
				foreach ($fields as $f) {
					if (isset($row[$f])) {
						$row[$f] = floatval($row[$f]);
					}
				}
			}
		}
		// single object
		else {
			foreach ($fields as $f) {
				if (isset($this->output[$f])) {
					$this->output[$f] = floatval($this->output[$f]);
				}
			}
		}
		return $this;
	}

}
