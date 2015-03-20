<?php
class Stats extends DB {

	private $table = 'entries';


	public function spendingByCategory ($p) {
		$data = [];
		$where = '';
		if (!empty($p['date'])) $where = 'WHERE entries.date LIKE \'' . $p['date'] . '%\' ';

		$q = 'SELECT categories.name as category, SUM(amount) as amount FROM entries ' .
			'LEFT JOIN categories ON categories.id = entries.category_id ' . $where .
			'GROUP BY entries.category_id ORDER BY amount DESC';

		$query = $this->db->query($q);
		if ($query) {
			$data = $query->fetchAll(PDO::FETCH_FUNC, function ($cat, $amount) {
				return [$cat, round($amount) ];
			});
		}
		$this->output = [ 'data' => $data ];
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
		$income = [];
		$expenses = [];
		for ($m = 1; $m <= 12; $m++) {
			$month = $y . '-' . substr('0' . $m, -2);
			array_push($income, $this->getIncomeForMonth($month));
			array_push($expenses, $this->getExpensesSumForMonth($month));
		}
		$this->output = [
			[ 'name' => 'income', 'data' => $income ],
			[ 'name' => 'expenses', 'data' => $expenses ]
		];

		return $this;
	}




	public function spendingByDay ($p) {
		$data = [];
		$where = '';
		// if (!empty($p['date'])) $where = 'WHERE entries.date LIKE \'' . $p['date'] . '%\' ';

		$q = 'SELECT UNIX_TIMESTAMP(STR_TO_DATE(date, \'%Y-%m-%d\')) as date, ' .
			'SUM(amount) as amount FROM entries ' . $where .
			'GROUP BY date ORDER BY date ASC';

		$query = $this->db->query($q);
		if ($query) {
			$data = $query->fetchAll(PDO::FETCH_FUNC, function ($ut, $amount) {
				return [$ut * 1000, floatval($amount) ];
			});
		}
		$this->output = [ 'name' => 'Expenses', 'data' => $data ];
		return $this;
	}



}
