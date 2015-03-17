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


	private function getIncomeForMonth($m) {
		return $this->db->sum('incomes', 'amount', [ 'date[~]' => $m . '%' ]);
	}

	private function getExpensesSumForMonth($m) {
		return $this->db->sum($this->table, 'amount', [ 'date[~]' => $m . '%' ]);
	}

	public function incomeVsExpenses ($p) {
		$y = isset($p['year']) ? $p['year'] : date('Y');
		$this->output = [ 'income' => [], 'expenses' => [] ];
		for ($m = 1; $m <= 12; $m++) {
			$month = $y . '-' . substr('0' . $m, -2);
			array_push($this->output['income'], $this->getIncomeForMonth($month));
			array_push($this->output['expenses'], $this->getExpensesSumForMonth($month));
		}

		return $this;
	}





}
