<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

include 'DbConnect.php';

$objDb = new DbConnect;
$connection = $objDb->connect();

$sql = "SELECT * FROM users";
$stmt = $connection->prepare($sql);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($products);

?>