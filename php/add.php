<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

include 'DbConnect.php';

$objDb = new DbConnect;
$connection = $objDb->connect();

$product = json_decode (file_get_contents('php://input'));
print_r(json_decode (file_get_contents('php://input')));

$sql = "INSERT INTO users (id, SKU, name, price, dvd, book, furn) VALUES (NULL, :SKU, :name, :price, :dvd, :book, :furn)";

$stmt = $connection->prepare($sql);

$stmt->bindParam(':SKU', $product->SKU,PDO::PARAM_STR);
$stmt->bindParam(':name', $product->name, PDO::PARAM_STR );
$stmt->bindParam(':price', $product->price, PDO::PARAM_INT );
$stmt->bindParam(':dvd', $product->dvd, PDO::PARAM_INT);
$stmt->bindParam(':book', $product->book,PDO::PARAM_INT );
$stmt->bindParam(':furn', $product->furn,  PDO::PARAM_STR );

if($stmt->execute()) {
    $response = ['status' => 1, 'message' => 'Record added successfully.'];
    } else {
    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
}
echo $response;
?>