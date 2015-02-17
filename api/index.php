<?php
require('lib/_lib.php');

header('content-type: text/plain; charset=utf8');	// XXX: for debug only
$db = new DB();


Router::get('/categories/{id}', function ($params) use ($db){
	echo $db->get_categories($params['id'])->to_json();
});


Router::get('/entries/{id}', function ($params) use ($db){
	echo $db->get_entries($params['id'])->to_json();
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
