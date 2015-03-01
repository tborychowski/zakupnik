<?php
require('lib/_lib.php');

header('content-type: text/plain; charset=utf8');	// XXX: for debug only


Router::get('/categories/{id}', function ($params) {
	$db = new Categories();
	echo $db->get($params['id'])->to_json();
});

Router::get('/categorytree', function ($params) {
	$db = new Categories();
	echo $db->get()->tree()->to_json();
});


Router::get('/entries/{id}', function ($params) {
	$db = new Entries();
	echo $db->get($params['id'])->to_json();
});

Router::post('/entries/{id}', function ($params) {
	$db = new Entries();
	if (!empty($params['id'])) {
		echo $db->save($params)->to_json();
	}
	else echo $db->add($params['data'])->to_json();
});

Router::del('/entries/{id}', function ($params) {
	$db = new Entries();
	if (!empty($params['id'])) {
		echo $db->del($params['id'])->to_json();
	}
});



// Router::get('/', function () {
// 	echo 'api root';
// });



// Router::get('/list/{id}/{name}', function ($params) {
// 	print_r($params);
// 	// echo 'id: ' . $params['id'] . ', name: ' . $params['name'];
// });


// Router::get('/api(\/?)', function () {
// 	echo 'api';
// });


Router::otherwise(function () {
	echo "404";
	// print_r($params);
});
