<?php
session_start();

//https://console.developers.google.com/project/herhor-zakupnik/apiui/credential
//http://hybridauth.sourceforge.net/apidoc.html
header('content-type: text/plain');
require('hybridauth/Hybrid/Auth.php');
$auth = new Hybrid_Auth('__auth_config.php');

// $auth::logoutAllProviders();

// if (!isset($_SESSION['google'])) $auth::logoutAllProviders();

if (isset($_SESSION['user'])) {
	echo "ok\n";
	print_r($_SESSION['user']);
}
else {
	$google = $auth->authenticate('Google');
	$_SESSION['user'] = $google->getUserProfile()->email;
	// $auth::logoutAllProviders();
	$google->logout();

	echo "logging in\n";
	print_r($_SESSION['user']);
}


// $auth::isConnectedWith('Google');




