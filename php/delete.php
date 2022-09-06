<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

include 'DbConnect.php';

$objDb = new DbConnect;
$connection = $objDb->connect();

$sql = "DELETE FROM users WHERE SKU = :SKU";

$url_components = parse_url($_SERVER['REQUEST_URI']);
parse_str($url_components['query'], $params);
$SKU = $params['SKU'];

$stmt = $connection->prepare($sql);
$stmt->bindParam(':SKU', $SKU);
if ($stmt->execute()) {
    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
}
echo json_encode($response);

?>