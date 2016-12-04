<?php
//setting header to json
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//database
define('DB_HOST', '104.196.139.77');
define('DB_USERNAME', 'jmonitor');
define('DB_PASSWORD', 'BestPassword2016');
define('DB_NAME', 'monitor');

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT * from computers");

//execute query
$result = $mysqli->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

//close connection
$mysqli->close();

//now print the data
print json_encode($data);
