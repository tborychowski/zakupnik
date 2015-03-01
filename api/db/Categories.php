<?php
class Categories extends DB {


	public function get ($id = null) {
		if (!empty($id)) $this->get_by_id('categories', $id);
		else $this->get_all('categories');
		return $this;
	}

	public function tree () {
		$this->output = $this->get_tree($this->output);
		return $this;
	}




	/**
	 * Convert categories to a tree (recurr.)
	 * @return [array]       nested array
	 */
	private function get_tree ($data, $item = array('id' => 0, 'name' => 'Zakupnik')) {
		$items = array_filter($data, function ($i) use($item) {
			return $i['parent_id'] == $item['id'];
		});

		if (!empty($items)) {
			foreach ($items as &$sub) {
				$sub = $this->get_tree($data, $sub);
			}
			$item['items'] = array_values($items);
		}
		return $item;
	}



}
