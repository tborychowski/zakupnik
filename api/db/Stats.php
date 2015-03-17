<?php
class Stats extends DB {

	private $table = 'entries';


	public function spendingByCategory ($p) {
		$where = '';
		if (!empty($p['date'])) $where = 'WHERE entries.date LIKE \'' . $p['date'] . '%\' ';

		$q = 'SELECT categories.name as category, SUM(amount) as amount FROM entries ' .
			'LEFT JOIN categories ON categories.id = entries.category_id ' . $where .
			'GROUP BY entries.category_id ORDER BY amount DESC';

		$query = $this->db->query($q);
		if ($query) {
			$this->output = $query->fetchAll(PDO::FETCH_FUNC, function ($cat, $amount) {
				return ['label' => $cat, 'value' => round($amount) ];
			});
		}
		return $this;
	}





}
