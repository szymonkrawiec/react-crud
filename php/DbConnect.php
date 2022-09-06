<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

class DbConnect
{
    private $server = 'localhost';
    private $dbname = 'kmwrybdq_reactcrud';
    private $user = 'kmwrybdq_admin';
    private $pass = 'admin';

    // private $server = 'localhost';
    // private $dbname = 'react-crud';
    // private $user = 'root';
    // private $pass = '';


    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}

?>