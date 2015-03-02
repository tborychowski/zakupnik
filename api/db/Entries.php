<?php
class Entries extends DB {

	public function get ($id) {
		if (!empty($id)) {
			$this->get_by_id('entries', $id);
			$this->integerise('category_id,amount');
		}
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

	public function add ($data) {
		$this->insert('entries', $data);
		return $this;
	}

	public function save ($data) {
		$this->update('entries', $data);
		return $this;
	}

	public function del ($id) {
		$this->delete('entries', $id);
		return $this;
	}


}
